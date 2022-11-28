import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home';
import Footer from './components/Footer';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import RegisterBirthday from './components/pages/RegisterBirthday';
import EditBirthday from './components/pages/EditBirthday';
import BirthdayList from './components/pages/BirthdayList';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
      {/* when / is passed it will open the Home compnent */ }
        <Route path='/' element={<Home />}/>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/api/birthday/all' element={<BirthdayList />} />
        <Route path='/api/birthday/today' element={<BirthdayList />} />
        <Route path='/register-birthday' element={<RegisterBirthday  />} />
        <Route path='/edit-birthday' element={<EditBirthday  />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
      </Routes>
      <Footer />
      </Router>
    </>
  );
}

export default App;
