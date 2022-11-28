// rfce with es7 extension
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import { Button } from './Button';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    // for mobile screen
    const showButton = () => { if(window.innerWidth <= 960) { setButton(true)} else { setButton(false)}}

    useEffect(() => {showButton();}, []);

    window.addEventListener('resize', showButton)

    return (
        <>
         <nav className="navbar">
             <div className="navbar-container">
                 <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                     HOOZ BIRTHDAY
                     </Link> 
                     <div className='menu-icon' onClick={handleClick}>
                         <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                     </div>
                     <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                         <li className='nav-item'>
                             <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                 Home
                             </Link>
                        </li>
                        <li className='nav-item'>
                             <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                                 Sign in
                             </Link>
                        </li>
                        <li className='nav-item'>
                             <Link to='/signup' className='nav-links' onClick={closeMobileMenu}>
                                 Sign up
                             </Link>
                        </li>                        
                     </ul>
                     {/* TODO verify what to do with this button */}
                     {/* {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
                     {button && <Button buttonStyle='btn--outline'>SIGN IN</Button>} */}
             </div>
         </nav>
        </>
    )
}

export default Navbar;
