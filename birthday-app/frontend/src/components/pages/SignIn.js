import AuthContext from "../../context/AuthProvider";
import {
  React,
  useState,
  useRef,
  useEffect,
  useContext
} from 'react';
import { Button } from '../Button';
import '../../App.css';
//import axios from '../../api/axios';
const LOGIN_URL = '/auth';

export default function SignIn() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (event) => {
    // Prevent page reload
    event.preventDefault();

    try {
      //await axios.post(LOGIN_URL,
      const response = await fetch.post(LOGIN_URL,
          JSON.stringify({ user, pwd }),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      setAuth({ user, pwd, accessToken });
      setUser('');
      setPwd('');
      setSuccess(true);
  } catch (err) {
      if (!err?.response) {
          setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
      } else {
          setErrMsg('Login Failed');
      }
      errRef.current.focus();
  }
  };
  
  return (
    <>
    {success ? (
        <section>
            <h1>You are logged in!</h1>
            <br />
            <p>
                <a href="#">Go to Home</a>
            </p>
        </section>
    ) : (
    <section className="sign-in">
      <p ref={errRef} className= {errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} >
      <div className="form">
        <label htmlFor="username">Username:</label>
        <input 
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            />
            </div>
            <div>
        <label htmlFor="password">Password:</label>
        <input 
            type="password"
            id="password"
            ref={userRef}
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            />
            </div>
             <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        > Sign In </Button>
      </form>
      <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign Up</a>
                        </span>
                    </p>
    </section>
  )
}
</>
  )
}