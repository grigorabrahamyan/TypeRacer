import React from 'react';
import './App.css';
import Footer from './componnets/footer';
import Header from './componnets/header';
import Main from './componnets/main';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
