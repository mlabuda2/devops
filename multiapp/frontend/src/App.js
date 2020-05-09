import React from 'react';
import './App.css';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="App">
      <header>
        <p>
          Kalkultaor wynagrodzeń
        </p>
      </header>
      <div>
        <Calculator></Calculator>
      </div>
    </div>
  );
}

export default App;
