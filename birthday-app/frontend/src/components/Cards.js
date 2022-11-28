import React, {useState, useEffect} from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { Link, useLocation } from 'react-router-dom';
import img from '../assets/images/Blank-Profile-Picture-1.jpg'
import { Button } from './Button';
import axios from "axios";

// import data here
// const mockData = [];
// const data = [];
const mockData = [ {id: 1, firstName: "Ana", midInitial: "P", lastName: "Malimpensa", birthdayDay: 13, birthdayMonth: 9, birthdayYear: 1990, details: "We met in highschool in 2008"},
 {id: 2, firstName: "Paul", midInitial: "J", lastName: "Spadaro", birthdayDay: 8, birthdayMonth: 5, birthdayYear: 1985, details: "Agressive Husband"}];

// const data = new Array(18).fill().map((value, index) => ({ id: mockData.id, firstName: mockData.firstName, midInitial: mockData.midInitial, 
//                                                               lastName: mockData.lastName, birthdayDay: mockData.birthdayDay, birthdayMonth: mockData.birthdayMonth,
//birthdayYear: mockData.birthdayYear, details: mockData.details}));

                          
// TODO  calculate the age with whole birthday
function calculateAge(birthYear) { 
  const yearNow = new Date().getFullYear();
  const age = yearNow - parseInt(birthYear);
  //console.log(`Age is: ${age}`);

  return age;
}

// function requestTodayBirthdays() {
//   var name = document.getElementById("name").value;
//   var email = document.getElementById("email").value;
//   var result = document.getElementById("result");
  
//   fetch("/jsondata", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name: name, email: email }),
//   })
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       result.innerHTML = data.msg;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

// function getBirthdays() {

//   //e.preventDefault();

//   axios.get("http://localhost:4000/api/birthday/all",  { crossdomain: true }).then(response => {
//    return response.data
//     // setText(response.data.text);
//     // setAuthor(response.data.author);
//    // response.end([data]);
//   });
// }

// mockData = getBirthdays();

// TODO maybe make it the birthday cards
// TODO Reload cards or leave the page when a record is added or deleted
// text= {`Age: ${calculateAge("1990") ? calculateAge(item.birthdayYear) : "not provided"}`}
function Cards(props) { //{getBirthdays}

const [data, setData] = useState([]);
const [endpoint, setEndpoint] = useState('');
const location = useLocation();

console.log(location)
// it's woprking now but not getting the data from correct place
 
// res => {
//   function(response) {
//   console.log(`Is response ok: ${res.ok}`);
//   if(res.ok) {
//     console.log(`Response from server: ${res.body
//     }`);
//     return res.body; }
//     //
//     //return res

function getEndpoint(path) { 

  if (path === '/api/brithday/all') {
    setEndpoint('all')
  }
  else if (path === '/api/brithday/today') {
    setEndpoint('today')
  }
  else {
    return
  }

}


useEffect(() => {       

    //getEndpoint(location.pathname);
    fetch(`${location.pathname}`).then(
      function(response) {
      
        return response.json();
        //
        //return res
        // then response => setData(jsonResponse.data.data))
     
      // response => setData(response)
    }).then(function(data) { setData(data.data); console.log(data.data)})
  }, [])

  //console.log(`Data inside client cards ${data}`);

// function getBirthdays() {
//   console.log('inside getBirthdays function on section')

//   // it's not setting the state or the data
  
//   axios.get("http://localhost:4000/api/birthday/all",  { crossdomain: true }).then(response => {
//    return response.data;
//   });
// }

  //console.log(`Inside cards compoennts ${getBirthdays}`)

  return (
    <div className='cards'>
      <h1>Whose birthday?</h1>
      <div className='cards__btns'>
      <Link to='/register-birthday'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--medium'
        >
          ADD NEW <i className='fab fa-magnifying-glass'/>
        </Button>
        </Link>
        </div>
      <div className='cards__container'>
        <div className='cards__wrapper'>       
          <ul className='cards__items'>
          {data.map(((item) => (
            
            <CardItem
              src= {img}
              _id = {item._id}
              firstName = {item.firstName}
              midInitial = {item.midInitial}
              lastName = {item.lastName}
              details = {item.details}
              birthdayDay = {item.birthdayDay}
              birthdayMonth = {item.birthdayMonth}
              birthdayYear = {item.birthdayYear}
              age = {calculateAge(item.birthdayYear) ? calculateAge(item.birthdayYear) : "not provided"}
              // TODO use the props on card items to display each property in the card
              text= {`Age: ${calculateAge("1990") ? calculateAge(item.birthdayYear) : "not provided" }
               details: ${item.details}`}
               birthday = {`Birthday: ${item.birthdayMonth}/${item.birthdayDay}`}
              label={`${item.firstName} ${item.midInitial ? item.midInitial : ""} ${item.lastName}`}
            />  )))}
          </ul> 
        </div>
      </div>
    </div>
  );
}

export default Cards;