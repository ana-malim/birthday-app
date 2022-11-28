import React, {useState, useEffect} from 'react';
import '../App.css';
import { Button } from './Button';
import './Section.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import Cards from './Cards';



function Section() {  

  // const [state, setState] = useState('start')
  // const [data, setData] = useState('');
  // useEffect(() => {
  //   setState('start');
  // }, [])
  //  console.log(state);
  //const data = [];

  // const toBirthdayList = () => {
  //   setData(data);
  // }

  
  // function getBirthdays() {
  //   console.log('inside getBirthdays function on section')

  //   // it's not setting the state or the data
  //   try {
  //   axios.get("http://localhost:4000/api/birthday/all",  { crossdomain: true }).then(response => {
  //    setData(response.data);
  //    setState('get-birthday');
  //    setState((state) => {
  //     console.log(state); // "React is awesome!"
      
  //     //return state;
  //   });

  //   setData((data) => {
  //     console.log(data);
  //   });


   // console.log(data);
     //console.log(state)
      // setText(response.data.text);
      // setAuthor(response.data.author);
      //TODO NO ERROR IN THE CONSOLE EACH TIME SEND A REQUEST 
     // response.end([data]);     
  //   });
  //   //setData(data);

  //   return
  // } catch {

  // }
 
  // }

  // useEffect(() => {
  //   getBirthdays();
  //  }, []);

  // function getTodayBirthdays(e) {

  //   e.preventDefault();

  //   try {
  //   axios.get("http://localhost:4000/api/birthday",  { crossdomain: true }).then(response => {
  //    data= response.data
  //     // setText(response.data.text);
  //     // setAuthor(response.data.author);
  //     response.end([data]);
  //   });
  //   setData(data);
  // } catch {

  // }
  // }

  return (
    // <>
    // {state === 'get-birthday' ? (      
    //   <Cards getBirthdays={data}/>,
    //   console.log(data)
    // ): (

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
          //onClick= {() => getTodayBirthdays()}
          setState='get-birthday'
        >
          FIND NOW <i className='fab fa-magnifying-glass'/>
        </Button>
        </Link>
        {/* to='/api/birthday/all' */}
        {/* onClick={() => { 
            setState(
              'get-birthday'
            );
            getBirthdays();
          }} */}
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
    </div> //)}
    //</>
  );
}
// {() => {getBirthdays()} }

export default Section;