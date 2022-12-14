import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';import { Button } from '../Button';

import '../../App.css';
import '../Form.css';

import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_]{2,14}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function SignUp() {

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [userEmail, setUserEmail] = useState('');
  const [validUserEmail, setValidUserEmail] = useState(false);
  const [userEmailFocus, setUserEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {
      setValidName(USER_REGEX.test(user));
  }, [user])

  useEffect(() => {
    setValidUserEmail(EMAIL_REGEX.test(userEmail));
}, [userEmail])


  useEffect(() => {
      setValidPwd(PWD_REGEX.test(pwd));
      setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  useEffect(() => {
      setErrMsg('');
  }, [user, pwd, matchPwd])

  async function registerUser () {

   const response = await fetch('/signup', {method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    //withCredentials: true,
                    body: JSON.stringify({
                        userEmail: userEmail,
                        username: user,
                        password: pwd
                    })});

                    return response;
        }

  const handleSubmit = async (e) => {

      e.preventDefault();
      // if button enabled with JS hack
      const v1 = USER_REGEX.test(user);
      const v2 = PWD_REGEX.test(pwd);
      if (!v1 || !v2) {
          setErrMsg("Invalid Entry");
          return;
      }
      try {

          if ((await registerUser()).ok) {
                setSuccess(true);
        } else {
            // TODO get the correct message from response body
                setErrMsg('An error occourred saving this record.');
        }         
          // TODO: remove console.logs before deployment
          //clear state and controlled inputs
          setUser('');
          setPwd('');
          setMatchPwd('');
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
                  <h1>User registered successfully!</h1>
                  <p>
                      <a href="/login">Sign In</a>
                  </p>
              </section>
          ) : (
              <section className="form">
                  <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                  <h1>Register User</h1>
                  <form onSubmit={handleSubmit}>
                  <div>
                      <label htmlFor="userEmail">
                          Email:
                          <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                      </label>
                      <input
                          type="email"
                          id="userEmail"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setUserEmail(e.target.value)}
                          value={userEmail}
                          required
                          aria-invalid={validUserEmail? "false" : "true"}
                          aria-describedby="uidnote"
                          onFocus={() => setUserEmailFocus(true)}
                          onBlur={() => setUserEmailFocus(false)}
                      />
                      <p id="uidnote" className={userEmailFocus && userEmail && !validUserEmail ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          Please enter your email address in the format someone@example.com.<br />
                      </p>
                      </div>
                    <div>
                      <label htmlFor="username">
                          Username:
                          <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                      </label>
                      <input
                          type="text"
                          id="username"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setUser(e.target.value)}
                          value={user}
                          required
                          aria-invalid={validName ? "false" : "true"}
                          aria-describedby="uidnote"
                          onFocus={() => setUserFocus(true)}
                          onBlur={() => setUserFocus(false)}
                      />
                      <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          3 to 15 characters.<br />
                          Must begin with a letter.<br />
                          Letters, numbers, underscores, hyphens allowed.
                      </p>
                      </div>
                      <div>

                      <label htmlFor="password">
                          Password:
                          <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                      </label>
                      <input
                          type="password"
                          id="password"
                          onChange={(e) => setPwd(e.target.value)}
                          value={pwd}
                          required
                          aria-invalid={validPwd ? "false" : "true"}
                          aria-describedby="pwdnote"
                          onFocus={() => setPwdFocus(true)}
                          onBlur={() => setPwdFocus(false)}
                      />
                      <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          8 to 24 characters.<br />
                          Must include uppercase and lowercase letters, a number and a special character.<br />
                          Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                      </p>
                      </div>
                      <div>
                      <label htmlFor="confirm_pwd">
                          Confirm Password:
                          <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                      </label>
                      <input
                          type="password"
                          id="confirm_pwd"
                          onChange={(e) => setMatchPwd(e.target.value)}
                          value={matchPwd}
                          required
                          aria-invalid={validMatch ? "false" : "true"}
                          aria-describedby="confirmnote"
                          onFocus={() => setMatchFocus(true)}
                          onBlur={() => setMatchFocus(false)}
                      />
                      <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          Must match the first password input field.
                      </p>
                      </div>
                      <button className="btn" disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                  </form>
                  <p>
                      Already registered?<br />
                      <span className="line">
                          {/*put router link here*/}
                          <a href="/login">Sign In</a>
                      </span>
                  </p>
              </section>
          )}
      </>
  )
}