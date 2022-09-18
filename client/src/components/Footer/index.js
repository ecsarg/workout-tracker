import React from 'react';

const Footer = () => {
  return (
    <footer className="navbar navbar-expand-lg bg-light fixed-bottom">
      <div className="container">
        &copy;{new Date().getFullYear()} by Ellie Sargent, Patrick Kinsley, Jerilyn Wise 
      </div>
    </footer>
  );
};

export default Footer;

