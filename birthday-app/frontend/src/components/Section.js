import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import '../App.css';
import './Section.css';

// TODO create logic that will take you to the llogin button if you are not logged in

function Section() {  

  return (
    <div className='section-container'>  
      
      <h1>WHOSE BIRTHDAY IS TODAY?</h1>
      {/* TODO come up with some writting here */}
      <p>What are you waiting for?</p>
      <div className='section-btns'>
      <Link to='/api/birthday/today'>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          FIND NOW <i className='fab fa-magnifying-glass'/>
        </Button>
        </Link>
        <Link to='/api/birthday/all'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--medium'
          >
          SEARCH ALL BIRTHDAYS <i className='fab fa-magnifying-glass-plus'/>
        </Button>
        </Link>
      </div>
    </div> 
  );
}
export default Section;