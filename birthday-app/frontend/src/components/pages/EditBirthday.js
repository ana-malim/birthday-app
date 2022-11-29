import React from 'react';
import '../Form.css';
import { useState, useRef, useEffect } from 'react';
// hooks
import { Link, useLocation } from 'react-router-dom';

const NAME_ENTRY_REGEX = /^[A-z]{2,19}$/;
const LNAME_ENTRY_REGEX = /^[A-z]{3,29}$/;
const MIDINIT_ENTRY_REGEX = /^[A-z]{0,5}$/;
// Year up to 2022
const YEAR_ENTRY_REGEX = /^(19[0-9]{2}|20[0-2]{2}){0,0}$/;

const months = ['1', '2', '3', '4', '5', '6',
                '7', '8', '9', '10', '11', '12']

const days = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
                '12', '13', '14', '15', '16', '17', '18', '19',
            '20', '21', '22', '23', '24', '25', '26', '27', '28', 
            '29', '30', '31']

export default function EditBirthday() {

    const errRef = useRef();

    // solution to get the state of birthday card being editted
    const location = useLocation();
    // console.log(location);

    // TODO location state when coming from anywhere in case you access the url (in this case is just edit so it won't gp anywhere?)
    const [locationState, setLocationState] = useState({_id: location.state._id, firstName: location.state.firstName, midInitial: location.state.midInitial,
        lastName: location.state.lastName, details: location.state.details, birthdayDay: location.state.birthdayDay, birthdayMonth: location.state.birthdayMonth,
        birthdayYear: location.state.birthdayYear})
    //console.log(locationState);

    // set the default initial state
    const [selectedMonth, setSelectedMonth] = useState(locationState.birthdayMonth);
    const [selectedDay, setSelectedDay] = useState(locationState.birthdayDay);

    const [firstName, setFirstName] = useState(locationState.firstName);
    const [midInitial, setMidInitial] = useState(locationState.midInitial);
    const [lastName, setLastName] = useState(locationState.lastName);
    
    const [validFirstName, setValidFirstName] = useState(true);
    const [validMidInitial, setValidMidInitial] = useState(true);
    const [validLastName, setValidLastName] = useState(true);
    
    const [birthdayDay, setBirthdayDay] = useState(selectedDay);
    const [birthdayMonth, setBirthdayMonth] = useState(selectedMonth);
    
    const [birthdayYear, setBirthdayYear] = useState(locationState.birthdayYear);
    const [validYear, setValidYear] = useState(false);

    const [details, setDetails] = useState(locationState.details);
    
    // TODO create util file to keep util functions
    function handleSelectedMonth(value) {
        setBirthdayMonth(value);
        setSelectedMonth(value);
    };

    function handleSelectedDay(value) {
        setBirthdayDay(value);
        setSelectedDay(value);
    };

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidFirstName(NAME_ENTRY_REGEX.test(firstName));
    }, [firstName])

    useEffect(() => {
        setValidLastName(LNAME_ENTRY_REGEX.test(lastName));
    }, [lastName])

    useEffect(() => {
        setValidMidInitial(MIDINIT_ENTRY_REGEX.test(midInitial));
    }, [midInitial])

    useEffect(() => {
        setValidYear(YEAR_ENTRY_REGEX.test(birthdayYear))
    }, [birthdayYear])

    async function saveEditBirthdayRecord () {
        
       const response = await fetch('/api/birthday', {method: 'PATCH',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            _id: locationState._id,
                            firstName: firstName,
                            midInitial: midInitial,
                            lastName: lastName,
                            birthdayDay: birthdayDay,
                            birthdayMonth: birthdayMonth,
                            birthdayYear: birthdayYear,
                            details: details
                        })});

                        return response;
                    }

    const handleSubmit = async (e) => {

        e.preventDefault();   
        
        try {
            if ((await saveEditBirthdayRecord()).ok) {
                 setSuccess(true);
            } else {
                // TODO get the correct message from response body
                 setErrMsg('An error occourred saving this record.');
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }        
    }

  return (
      <>
          {success ? (
              <section className="form">
                  <h1>Birthday was edited successfully!</h1>
              </section>
          ) : (
            <section className="form">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register new birthday record</h1>
            <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label htmlFor="firstName">
                    First name:
                </label>
                <input
                    type="text"
                    id="firstName"
                    autoComplete="off"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    aria-invalid={validFirstName ? "false" : "true"}
                    required
                />
                </div>
                <div>
                <label htmlFor="midInitial">
                    Middle initials:
                </label>
                <input
                    type="text"
                    id="midInitial"
                    autoComplete="off"
                    onChange={(e) => setMidInitial(e.target.value)}
                    value={midInitial}
                    aria-invalid={validMidInitial ? "false" : "true"}
                />
                </div>
                <div>
                <label htmlFor="lastName">
                    Last name:
                </label>
                <input
                    type="text"
                    id="lastName"
                    autoComplete="off"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                    aria-invalid={validLastName ? "false" : "true"}
                />
                </div>
                <div>
                <label htmlFor="details">
                    Any other information?
                </label>
                <input
                    type="text"
                    id="details"
                    autoComplete="off"
                    onChange={(e) => setDetails(e.target.value)}
                    value={details}
                />
                </div>
                </div>
                <div className="dropdown">
                  <label htmlFor="monthSelection">
                      Select Month:
                  </label>
                      <select name="selectMonthList" value={selectedMonth} onChange={(e) => handleSelectedMonth(e.target.value)}>
                      {months.map((month) => (                                
                        <option id="menu-item-{menuItem}" key={month} className="menu-item" >{month}</option>
                      ))}
                    </select>
                  <label htmlFor="daySelection">
                      Select Day:
                  </label>
                  <select name="selectDayList" value={selectedDay} onChange={(e) => handleSelectedDay(e.target.value)}>
                      {days.map((day) => (                                
                        <option id="menu-item-{menuItem}" key={day} className="menu-item" >{day}</option>
                      ))}
                    </select> 
                  <div>
                <label htmlFor="birthdayYear">
                    Year of birth:
                </label>
                <input
                    type="text"
                    id="birthdayYear"
                    autoComplete="off"  
                    value={birthdayYear}                        
                    aria-invalid={validYear ? "false" : "true"}
                    onChange={(e) => setBirthdayYear(e.target.value)}                    
                />
                </div>
                  </div>
                  <input type="submit" value="Submit" disabled={!validFirstName || !validLastName || !birthdayDay || !birthdayMonth || !validMidInitial ? true : false} />
                        <Link to="/">
                            <button className="btn">Cancel</button>
                        </Link>                    
                  </form>
              </section>
          )}
      </>
  )
}