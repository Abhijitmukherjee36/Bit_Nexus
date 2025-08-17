import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CryptoContext from './CryptoContext';
import 'react-alice-carousel/lib/alice-carousel.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CryptoContext>
      <App />
       <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&display=swap" rel="stylesheet"></link>
    </CryptoContext>

  </React.StrictMode>
);


