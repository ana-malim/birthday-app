import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {

  // TODO it deletes but it has to refresh the page to see the change needs a message and reload so user know it was deleted
  async function deleteBirthdayRecord (id) {
    
   const response = await fetch('/api/birthday', {method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                       _id: id
                    })});
  
                    return response;
        }

  const handleDelete = async (id) => {
    
    try {
            deleteBirthdayRecord(id);
    } catch (err) { 
      // better error handling
      throw err;  
    }
}

  return (
    <>
      <li className='cards__item'>
          <figure className='cards__item__pic-wrap'>
            <img
              className='cards__item__img'
              alt='Profile picture'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__title'>{props.label}</h5>
            <h5 className='cards__item__text'>{props.birthday}</h5>
            <h5 className='cards__item__text'>{props.text}</h5>            
          </div>
          <div className='cards__item__link'>
            <Link to="/edit-birthday" state={{_id: props._id, firstName: props.firstName, midInitial: props.midInitial,
              lastName: props.lastName, details: props.details, birthdayDay: props.birthdayDay, birthdayMonth: props.birthdayMonth,
              birthdayYear: props.birthdayYear}}>
              <button>Edit</button>
              </Link>
              <button onClick={() => {
                    const confirmBox = window.confirm(
                      "Do you really want to delete this birthday record?"
                    )
                    if (confirmBox === true) {
                      handleDelete(props._id)
                    }}}>Delete</button>
          </div>
      </li>
    </>
  );
}

export default CardItem;