import React from 'react';
import './App.css';
import MethodOne from './components/MethodOne';
import MethodTwo from './components/MethodTwo';
import MethodThree from './components/MethodThree';
import Footer from './components/FooterComponent'
import Header from './components/HeaderComponent'

// Main App 
function App() {

  return (
    <div className="App">

      <header className="App-header">

        {/** Header Title */}
        <Header />

        {/** First Method */}
        <MethodOne />

        {/** Second Method */}
        <MethodTwo />

        {/** Third Method */}
        <MethodThree />

      </header>

      {/** Footer */}
      <Footer/>
    </div>
  );
}

export default App;