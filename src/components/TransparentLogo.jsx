import React, { useState, useEffect } from 'react';

// -------------------------------------------------------------
// TransparentLogo: strips background from nexora.webp via canvas.
// Processing is deferred with requestIdleCallback so it never
// blocks the critical rendering path.
// -------------------------------------------------------------
export default function TransparentLogo({
  src,
  alt,
  className,
  invert = false,
  width = 180,
  height = 40,
}) {
  const [processedSrc, setProcessedSrc] = useState(src);

  useEffect(() => {
    let isMounted = true;

    const process = (imgEl) => {
      try {
        const natW = imgEl.naturalWidth || imgEl.width;
        const natH = imgEl.naturalHeight || imgEl.height;
        if (!natW || !natH) return;

        const scale = Math.min(1, 360 / natW);
        const w = Math.round(natW * scale);
        const h = Math.round(natH * scale);

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(imgEl, 0, 0, w, h);
        const imgData = ctx.getImageData(0, 0, w, h);
        const d = imgData.data;

        const bgR = (d[0] + d[(w - 1) * 4]) / 2;
        const bgG = (d[1] + d[(w - 1) * 4 + 1]) / 2;
        const bgB = (d[2] + d[(w - 1) * 4 + 2]) / 2;

        let minX = w,
          minY = h,
          maxX = 0,
          maxY = 0;

        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = (y * w + x) * 4;
            const r = d[idx],
              g = d[idx + 1],
              b = d[idx + 2];
            const dist = Math.hypot(r - bgR, g - bgG, b - bgB);
            const isVeryLight = r > 210 && g > 210 && b > 210;
            const isLightNeutral =
              r > 175 &&
              g > 175 &&
              b > 175 &&
              Math.abs(r - g) < 18 &&
              Math.abs(r - b) < 18;

            if (dist < 40 || isVeryLight || isLightNeutral) {
              d[idx + 3] = 0;
            } else {
              if (dist < 60)
                d[idx + 3] = Math.round(((d[idx + 3] * (dist - 40)) / 20));
              if (invert) {
                if (r < 100 && g < 120 && b < 110) {
                  d[idx] = 245;
                  d[idx + 1] = 247;
                  d[idx + 2] = 245;
                } else {
                  d[idx] = Math.min(255, r + 50);
                  d[idx + 1] = Math.min(255, g + 80);
                  d[idx + 2] = Math.min(255, b + 60);
                }
              }
              if (d[idx + 3] > 25) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
              }
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);

        if (maxX > minX && maxY > minY) {
          const pad = 6;
          const cropX = Math.max(0, minX - pad);
          const cropY = Math.max(0, minY - pad);
          const cropW = Math.min(w - cropX, maxX - minX + pad * 2);
          const cropH = Math.min(h - cropY, maxY - minY + pad * 2);
          const cc = document.createElement('canvas');
          cc.width = cropW;
          cc.height = cropH;
          const cctx = cc.getContext('2d');
          if (cctx) {
            cctx.drawImage(
              canvas,
              cropX,
              cropY,
              cropW,
              cropH,
              0,
              0,
              cropW,
              cropH
            );
            if (isMounted) setProcessedSrc(cc.toDataURL('image/png'));
            return;
          }
        }
        if (isMounted) setProcessedSrc(canvas.toDataURL('image/png'));
      } catch (_) {
        if (isMounted) setProcessedSrc(src);
      }
    };

    const run = () => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => process(img);
      img.src = src;
      if (img.complete) process(img);
    };

    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(run, { timeout: 2000 });
      return () => {
        isMounted = false;
        cancelIdleCallback(id);
      };
    } else {
      const t = setTimeout(run, 100);
      return () => {
        isMounted = false;
        clearTimeout(t);
      };
    }
  }, [src, invert]);

  return (
    <img
      src={processedSrc}
      alt={alt}
      width={width}
      height={height}
      loading="eager"
      decoding="async"
      className={className}
    />
  );
}
