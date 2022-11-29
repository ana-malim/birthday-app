import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css';

import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Footer from './components/Footer';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import RegisterBirthday from './components/pages/RegisterBirthday';
import EditBirthday from './components/pages/EditBirthday';
import BirthdayList from './components/pages/BirthdayList';
import UnderDevelopment from './components/pages/UnderDevelopment';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
      {/* when / is passed it will open the Home compnent */ }
        <Route path='/' element={<Home />}/>
        <Route path='/api/birthday/all' element={<BirthdayList />} />
        <Route path='/api/birthday/today' element={<BirthdayList />} />
        <Route path='/register-birthday' element={<RegisterBirthday  />} />
        <Route path='/edit-birthday' element={<EditBirthday  />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<UnderDevelopment />} />
        <Route path='/contact' element={<UnderDevelopment />} />
        <Route path='/information' element={<UnderDevelopment />} />
      </Routes>
      <Footer />
      </Router>
    </>
  );
}

export default App;
