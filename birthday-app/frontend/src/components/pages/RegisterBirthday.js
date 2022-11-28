import React from 'react';
import '../../App.css';
import { useState, useRef, useEffect } from 'react';

const NAME_ENTRY_REGEX = /^[A-z][A-z0-9]{2,19}$/;
const LNAME_ENTRY_REGEX = /^[A-z][A-z0-9]{3,29}$/;
const MIDINIT_ENTRY_REGEX = /^[A-z][A-z0-9]$/;
const YEAR_ENTRY_REGEX = /^(19[0-9]{2}|20[0-2]{2})$/;

// TODO handle the validation of day of the month such as Feb and months that have 30 days
// set pair key value to the object {key: january, value: 1} to send the correct value to the database
// better error handling qhen it doesn't have the correct input
const months = ['1', '2', '3', '4', '5', '6',
                '7', '8', '9', '10', '11', '12']

const days = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
                '12', '13', '14', '15', '16', '17', '18', '19',
            '20', '21', '22', '23', '24', '25', '26', '27', '28', 
            '29', '30', '31']

export default function RegisterNewBirthday() {
    const userRef = useRef();
    const errRef = useRef();

    // set the default initial state
    const [selectedMonth, setSelectedMonth] = useState(months[0]);
    const [selectedDay, setSelectedDay] = useState(days[0]);


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [midInitial, setMidInitial] = useState('');
    const [validMidInitial, setValidMidInitial] = useState(false);

    const [birthdayDay, setBirthdayDay] = useState(selectedDay);
    const [birthdayMonth, setBirthdayMonth] = useState(selectedMonth);
    
    const [birthdayYear, setBirthdayYear] = useState('');
    const [validYear, setValidYear] = useState(false);

    const [details, setDetails] = useState('');
    
    const [monthMenuOpen, setMonthMenuOpen] = useState(false);
    const [dayMenuOpen, setDayMenuOpen] = useState(false);

    
    const [userFocus, setUserFocus] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    async function saveBirthdayRecord () {
        // the request reaches the correct api in the backend but it does't send a body
       const response = await fetch('/api/birthday', {method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            firstName: firstName,
                            midInitial: midInitial,
                            lastName: lastName,
                            birthdayDay: birthdayDay,
                            birthdayMonth: birthdayMonth,
                            birthdayYear: birthdayYear,
                            details: details
                        })});

                        return response;
                        
                        
                        // .then( function(response) { return response.json();})
                        // // assign message either error or empty fields or alredy exists it's working it's just not returning the message
                        // .then(function(data) { console.log(JSON.stringify(data))}) // if (!data.body.success) {setErrMsg(data.json())}; 
            }

    const handleMonthMenuOpen = () => {
        setMonthMenuOpen(!monthMenuOpen);
    };

    const handleDayMenuOpen = () => {
        setDayMenuOpen(!dayMenuOpen);
    };

    const handleSelectMonth = (value) => {
        setBirthdayMonth(value);
        setSelectedMonth(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`First name: ${firstName} Last Name: ${lastName} Mid: ${midInitial} Year: ${birthdayYear} Day: ${birthdayDay} Month: ${birthdayMonth} details: ${details}`)
        const v1 = NAME_ENTRY_REGEX.test(firstName);
        const v2 = LNAME_ENTRY_REGEX.test(lastName);
        const v3 = MIDINIT_ENTRY_REGEX.test(midInitial);

        // TODO set valid mid initials
        // TODO better regex to do not return invalid when it's valid
        // if (birthdayYear) {
        //     const v4 = YEAR_ENTRY_REGEX.test(birthdayYear);
        //     if (!v1 || !v2 || !v3 || !v4) {
        //         setErrMsg("Invalid Entry");
        //         return;
        //     }
        // } else {
            // if (!v1 || !v2 || !v3 ) {
            //     setErrMsg("Invalid Entry");
            //     return;
            // }
        //}

        try {
                saveBirthdayRecord();
                setSuccess(true);
            //clear state and controlled inputs
              setFirstName('');
              setLastName('');
              setMidInitial('');
              setBirthdayYear('');
              setDetails('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                // validate if the record already exists so set the response
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

  return (
      <>
          {success ? (
              <section>
                  <h1>Birthday was registered successfully!</h1>
              </section>
          ) : (
              <section>
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
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setFirstName(e.target.value)}
                          value={firstName}
                          required
                          onFocus={() => setUserFocus(true)}
                          onBlur={() => setUserFocus(false)}
                      />
                      </div>
                      <div>
                      <label htmlFor="midInitial">
                          Middle initials:
                      </label>
                      <input
                          type="text"
                          id="midInitial"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setMidInitial(e.target.value)}
                          value={midInitial}
                          aria-invalid={validMidInitial ? "false" : "true"}
                          onFocus={() => setUserFocus(true)}
                          onBlur={() => setUserFocus(false)}
                      />
                      </div>
                      <div>
                      <label htmlFor="lastName">
                          Last name:
                      </label>
                      <input
                          type="text"
                          id="lastName"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setLastName(e.target.value)}
                          value={lastName}
                          required
                          onFocus={() => setUserFocus(true)}
                          onBlur={() => setUserFocus(false)}
                      />
                      </div>
                      <div>
                      <label htmlFor="details">
                          Any other information?
                      </label>
                      <input
                          type="text"
                          id="details"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setDetails(e.target.value)}
                          value={details}
                          onFocus={() => setUserFocus(true)}
                          onBlur={() => setUserFocus(false)}
                      />
                      </div>
                      </div>
                      <div className="dropdown">
                        <label htmlFor="monthSelection">
                            Select Month:
                        </label>
                        {/* <button onClick={handleMonthMenuOpen}>{selectedMonth}</button> */}
                        <select name="selectMonthList" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                        {monthMenuOpen ? (
                            <ul id="month-dd" className="menu">
                            <option selected value={selectedMonth}>{selectedMonth}</option>
                            {months.map((menuItem, index) => (                                
                              <option id="menu-item-{menuItem}" key={index} className="menu-item" >{menuItem}</option>
                            ))}
                          </ul>
                        ) : null}
                        </select>
                        <label htmlFor="daySelection">
                            Select Day:
                        </label>
                        <button onClick={handleDayMenuOpen}>{selectedDay}</button>
                        {dayMenuOpen ? (
                            <ul id="day-dd" className="menu">
                            {days.map((menuItem, index) => (
                              <li id="menu-item-{menuItem}" key={index} className="menu-item" >
                                  <option onChange={(e) => handleSelectMonth(e.target.value)}>{menuItem}</option></li>
                            ))}
                          </ul>
                        ) : null}
                        <div>
                      <label htmlFor="birthdayYear">
                          Year:
                      </label>
                      <input
                          type="text"
                          id="birthdayYear"
                          ref={userRef}
                          autoComplete="off"                          
                          aria-invalid={validYear ? "false" : "true"}
                          onChange={(e) => setBirthdayYear(e.target.value)}
                          value={birthdayYear}
                      />
                      </div>
                        </div>
                        <input type="submit" value="Submit" isabled={!firstName || !lastName || !birthdayDay || !birthdayMonth ? true : false} />                    
                  </form>
              </section>
          )}
      </>
  )
}