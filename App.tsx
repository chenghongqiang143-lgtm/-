import React from 'react';
import WeatherView from './components/WeatherView';

const App: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-black shadow-2xl overflow-hidden font-sans">
      <WeatherView />
    </div>
  );
};

export default App;