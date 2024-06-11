import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/style.css';
import "bootstrap/dist/css/bootstrap.css";
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Header />
    <Home />
    <Footer />
  </React.StrictMode>
);

