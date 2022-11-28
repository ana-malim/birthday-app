import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>     
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/sign-up'>How it works</Link>            
          </div>
          <div className='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>            
          </div>
        </div>
        <div className='footer-link-wrapper'>          
          <div className='footer-link-items'>
            <h2>Social Media</h2>
            <a href='https://www.instagram.com/namalimpensa/?hl=en'>Instagram <i class='fab fa-instagram'/></a>
            <a href='https://www.linkedin.com/in/ana-malimpensa'>LinkedIn <i class='fab fa-linkedin' /></a>
            <a href='https://github.com/ana-malim'>Github <i class="fab fa-github"/></a>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              HOOZ BIRTHDAY
            </Link>
          </div>
          <small className='website-rights'>HOOZ BIRTHDAY © 2022</small>         
        </div>
      </section>
    </div>
  );
}

export default Footer;