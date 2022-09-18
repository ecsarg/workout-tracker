import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
    const logout = event => {
      event.preventDefault();
      Auth.logout();
    };
  
    return (
      <header className="navbar navbar-expand-lg bg-light fixed-top">
        <div className="container-fluid ">
          <Link className='nav-link' to="/">
            <h1 >WALK THIS WEIGH</h1>
          </Link>
  
          <nav className="text-center">
          <ul className="nav justify-content-end">  
              {Auth.loggedIn() ? (
              <li className="nav-item">
                <Link to="/profile">Me</Link>
                <a  href="/" onClick={logout}>
                  Logout
                </a>
              </li>
              ) : (
                <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                </li>
                </>
                 )}
               </ul> 
          </nav>
        </div>
      </header>
    );
  };
  
  export default Header;