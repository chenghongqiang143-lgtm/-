
import React from 'react';
import WeatherView from './components/WeatherView';

const App: React.FC = () => {
  return (
    <div className="relative w-full h-screen max-w-md mx-auto bg-white shadow-2xl overflow-hidden flex flex-col">
      <WeatherView />
    </div>
  );
};

export default App;
