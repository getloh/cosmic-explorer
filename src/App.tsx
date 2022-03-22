import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Launchlist from './features/launchlist/LaunchList';
import Launchdetails from './features/launchdetails/Launchdetails';
import Navbar from './features/nav/Nav';
import Home from './pages/Home';
import Info from './pages/Info';

function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
        <Routes>
          <Route path='/' element={<Home />}/>
          
          <Route path='/' element={<Navbar />} >
            <Route path='launches' element={<Launchlist />} />
            <Route path='launch/:id' element={<Launchdetails />} />
            <Route path='info' element={<Info />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
