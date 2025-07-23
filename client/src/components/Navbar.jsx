import React from 'react';
import { Home, User, Code, Folder, Award, BookOpen, Mail, Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = ({ activeSection, scrollToSection, isNavOpen, setIsNavOpen, theme, toggleTheme }) => {
  return (
    <nav className="fixed w-full bg-dark-bg-secondary dark:bg-dark-bg-secondary light:bg-light-bg-secondary bg-opacity-95 z-50 shadow-lg p-4 md:px-8 flex justify-between items-center rounded-b-lg border-b border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary">
      {/* Name/Logo on the left */}
      <div className="text-2xl font-bold text-accent-secondary font-mono flex-shrink-0">Rushikesh Randive</div>
      
      {/* Mobile Menu Toggle */}
      <div className="md:hidden ml-auto"> {/* ml-auto pushes it right on mobile */}
        <button onClick={() => setIsNavOpen(!isNavOpen)} className="p-2 text-accent-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary rounded-md">
          {isNavOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Desktop Navigation and Theme Toggle */}
      <ul className={`md:flex md:items-center md:space-x-6 lg:space-x-10 ${isNavOpen ? 'block absolute top-full left-0 w-full bg-dark-bg-secondary dark:bg-dark-bg-secondary light:bg-light-bg-secondary bg-opacity-95 shadow-md py-4 border-t border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary' : 'hidden'} md:static md:w-auto md:bg-transparent md:shadow-none md:border-none md:py-0`}>
        {/* Navigation buttons pushed to the right */}
        <div className="md:flex md:ml-auto md:space-x-6 lg:space-x-10"> {/* This div groups nav items and pushes them right */}
          {['home', 'about', 'skills', 'projects', 'achievements', 'contact'].map((section) => ( // Certifications removed
            <li key={section} className="px-4 py-2 md:py-0">
              <button
                onClick={() => scrollToSection(section)}
                className={`flex items-center space-x-2 text-lg font-medium transition-colors duration-300 rounded-md p-2 w-full text-left
                  ${activeSection === section ? 'text-dark-text-light dark:text-dark-text-light light:text-light-text-light bg-accent-primary' : 'text-dark-text-medium dark:text-dark-text-medium light:text-light-text-medium hover:text-accent-primary hover:bg-dark-border-secondary dark:hover:bg-dark-border-secondary light:hover:bg-light-border-secondary'}`}
              >
                {section === 'home' && <Home size={20} />}
                {section === 'about' && <User size={20} />}
                {section === 'skills' && <Code size={20} />}
                {section === 'projects' && <Folder size={20} />}
                {section === 'achievements' && <Award size={20} />}
                {/* {section === 'certifications' && <BookOpen size={20} />} Removed Certifications */}
                {section === 'contact' && <Mail size={20} />}
                <span className="capitalize">{section}</span>
              </button>
            </li>
          ))}
        </div>
        {/* Theme Toggle Button */}
   
      </ul>
    </nav>
  );
};

export default Navbar;
