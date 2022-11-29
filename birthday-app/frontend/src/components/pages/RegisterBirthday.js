import React from 'react';
import '../Form.css';
import { useState, useRef, useEffect } from 'react';

const NAME_ENTRY_REGEX = /^[A-z]{2,19}$/;
const LNAME_ENTRY_REGEX = /^[A-z]{3,29}$/;
const MIDINIT_ENTRY_REGEX = /^[A-z]{0,5}$/;
// Year up to 2022
const YEAR_ENTRY_REGEX = /^(19[0-9]{2}|20[0-2]{2}){0,0}$/;

// TODO handle the validation of day of the month such as Feb and months that have 30 days
// set pair key value to the object {key: january, value: 1} to send the correct value to the database
// better error handling when it doesn't have the correct input
const months = ['1', '2', '3', '4', '5', '6',
                '7', '8', '9', '10', '11', '12']

const days = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
                '12', '13', '14', '15', '16', '17', '18', '19',
                '20', '21', '22', '23', '24', '25', '26', '27', '28', 
                '29', '30', '31']

export default function RegisterNewBirthday() {

    const errRef = useRef();

    // set the default initial state
    const [selectedMonth, setSelectedMonth] = useState(months[0]);
    const [selectedDay, setSelectedDay] = useState(days[0]);


    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);

    const [midInitial, setMidInitial] = useState('');
    const [validMidInitial, setValidMidInitial] = useState(true);

    const [birthdayDay, setBirthdayDay] = useState(selectedDay);
    const [birthdayMonth, setBirthdayMonth] = useState(selectedMonth);
    
    const [birthdayYear, setBirthdayYear] = useState('');
    const [validYear, setValidYear] = useState(true);

    const [details, setDetails] = useState('');
    
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

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    function handleSelectedMonth(value) {
        setBirthdayMonth(value);
        setSelectedMonth(value);
    };

    function handleSelectedDay(value) {
        setBirthdayDay(value);
        setSelectedDay(value);
    };

    async function saveBirthdayRecord () {    

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
            }
   
    const handleSubmit = async (e) => {

        e.preventDefault();
        
        // TODO make sure all input is validated        
        try {
               if ((await saveBirthdayRecord()).ok) {
                    setSuccess(true);
               } else {
                   // TODO get the correct message from response body
                    setErrMsg('An error occourred saving this record.');
               }
                //clear state and controlled inputs
                setFirstName('');
                setLastName('');
                setMidInitial('');
                setBirthdayYear('');
                setDetails('');
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
                  <h1>Birthday was registered successfully!</h1>
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
                  </form>
              </section>
          )}
      </>
  )
}