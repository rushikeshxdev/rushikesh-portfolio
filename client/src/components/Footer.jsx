import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark-bg-secondary dark:bg-dark-bg-secondary light:bg-light-bg-secondary py-6 text-center text-dark-text-dark dark:text-dark-text-dark light:text-light-text-dark text-sm border-t border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary">
      <p>&copy; {new Date().getFullYear()} Rushikesh Randive. All rights reserved. </p>
    </footer>
  );
};

export default Footer;
