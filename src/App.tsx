import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Launchlist from './features/launchlist/LaunchList';
import Launchdetails from './features/launchdetails/Launchdetails';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Launchlist />} />
          <Route path='/launch/:id' element={<Launchdetails />} />
        </Routes>
    </div>
  );
}

export default App;
