import React, { useState, useEffect } from 'react';
import NexoraScreen from './screens/NexoraScreen.jsx';
import './styles.css';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('nexora');

  // Scroll to top when changing screens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeScreen]);

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans" id="app-root">
      <main className="w-full">
        <NexoraScreen onSelectScreen={(screenId) => setActiveScreen(screenId)} />
      </main>
    </div>
  );
}
