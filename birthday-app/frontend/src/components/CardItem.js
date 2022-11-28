import React from 'react';
import { Link } from 'react-router-dom';

function delteRecord() {
  console.log("deleting record")
}

function CardItem(props) {

  //const handleConfirmation = () => delteRecord();
  //const onOk = () => delteRecord();
  //const onCancel = () => {notifier.info('You pressed Cancel')};

  // TODO it deletes but it has to refresh the page to see the change needs a message and reload so user know it was deleted
  async function deleteBirthdayRecord (id) {
    // the request reaches the correct api in the backend but it does't send a body
   const response = await fetch('/api/birthday', {method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                       _id: id
                    })});
  
                    return response;
                    
                    
                    // .then( function(response) { return response.json();})
                    // // assign message either error or empty fields or alredy exists it's working it's just not returning the message
                    // .then(function(data) { console.log(JSON.stringify(data))}) // if (!data.body.success) {setErrMsg(data.json())}; 
        }

  const handleDelete = async (id) => {
    //e.preventDefault();
    
    try {
            deleteBirthdayRecord(id);
            //setSuccess(true);
    } catch (err) {
        // if (!err?.response) {
        //     setErrMsg('No Server Response');
        // } else if (err.response?.status === 409) {
        //     // validate if the record already exists so set the response
        //     setErrMsg('Username Taken');
        // } else {
        //     setErrMsg('Registration Failed')
        // }
        // errRef.current.focus();
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
              {/* to='delete-record' */}
              <button onClick={() => {
                    const confirmBox = window.confirm(
                      "Do you really want to delete this birthday record?"
                    )
                    if (confirmBox === true) {
                      handleDelete(props._id)
                    }}}>Delete</button>
    {/* // if (window.confirm('Are you sure you wish to delete this item?')) this.onCancel() } } */}
              {/* {() => this.props.onDelete(this.props.id)} */}
          </div>
      </li>
    </>
  );
}

export default CardItem;