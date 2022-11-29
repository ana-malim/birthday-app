import React, {useState, useEffect} from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { Link, useLocation } from 'react-router-dom';
import img from '../assets/images/Blank-Profile-Picture-1.jpg'
import { Button } from './Button';
                       
// TODO  calculate the age with whole birthday (month+day)
function calculateAge(birthYear) { 
  const yearNow = new Date().getFullYear();
  const age = yearNow - parseInt(birthYear);

  return age;
}

// TODO Reload cards or leave the page when a record is added or deleted
// text= {`Age: ${calculateAge("1990") ? calculateAge(item.birthdayYear) : "not provided"}`}
function Cards() { 

const [data, setData] = useState([]);
const location = useLocation();

//console.log(location)

useEffect(() => {       

    fetch(`${location.pathname}`).then(
      function(response) {
        // have a code pattern on returning responses
        return response.json();

    }).then(function(data) { setData(data.data); console.log(data.data)})
  }, [])

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