import React, { useEffect, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Achievements from './pages/Achievements';
// import Certifications from './pages/Certifications'; // REMOVED IMPORT
import Contact from './pages/Contact';

// Main App Component
const App = () => {
  // State to manage the current theme (dark or light), defaults to 'dark'
  const [theme, setTheme] = useState('dark');

  // Function to toggle between dark and light themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // Effect to apply the theme class to the document body (html element)
  useEffect(() => {
    document.documentElement.className = theme; // Apply 'dark' or 'light' class to <html>
  }, [theme]);


  const [activeSection, setActiveSection] = useState('home');
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Define available sections for scroll observer (Certifications removed)
  const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'contact'];

  // Function to handle smooth scrolling to sections
  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsNavOpen(false); // Close nav on mobile after clicking a link
    }
  }, []);

  // Effect to update active section based on scroll position
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [sections]); // Depend on sections list

  return (
    <div className={`min-h-screen bg-dark-bg-primary dark:bg-dark-bg-primary light:bg-light-bg-primary text-dark-text-light dark:text-dark-text-light light:text-light-text-light font-sans`}>
      <Navbar
        activeSection={activeSection} // Pass activeSection for highlighting
        scrollToSection={scrollToSection} // Pass scrollToSection for navigation
        isNavOpen={isNavOpen}
        setIsNavOpen={setIsNavOpen}
        theme={theme} // Pass theme state
        toggleTheme={toggleTheme} // Pass toggle function
      />

      {/* Main Content */}
      <main className="pt-20"> {/* Padding to account for fixed navbar */}
        <Home scrollToSection={scrollToSection} />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        {/* <Certifications /> // REMOVED COMPONENT */}
        <Contact />
      </main>

      <Footer />

      {/* Tailwind CSS CDN (for development) */}
      {/* Note: In a real Vite project, Tailwind is built via postcss. This CDN is for quick preview in environments like this. */}
      {/* The inline style block should ideally be moved to index.css or a dedicated CSS file */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Google Fonts - Inter for sans-serif, Roboto Mono for mono */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Roboto+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>
        {`
          body {
            font-family: 'Inter', sans-serif; /* Default font */
          }
          /* Custom styles for animations and shadows */
          .animate-fade-in-up {
            animation: fadeInUp 1s ease-out forwards;
            opacity: 0;
          }
          .animation-delay-200 {
            animation-delay: 0.2s;
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          /* Custom styles for the new theme's shadows and buttons */
          .home-card-shadow {
            box-shadow: 0 0 15px rgba(0, 255, 0, 0.6), 0 0 30px rgba(138, 43, 226, 0.4);
          }
          .card-shadow {
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.4);
          }
          .neon-button { /* Kept for other buttons that might use it */
            transition: all 0.3s ease;
            box-shadow: 0 0 5px var(--accent-primary), 0 0 10px var(--accent-primary), 0 0 15px var(--accent-primary);
          }
          .neon-button:hover {
            box-shadow: 0 0 10px var(--accent-primary), 0 0 20px var(--accent-primary), 0 0 30px var(--accent-primary);
          }
          .button-no-glow { /* New style for contact button */
            transition: all 0.3s ease;
            box-shadow: none;
          }
          .button-no-glow:hover {
            box-shadow: 0 0 5px var(--accent-primary);
          }

          /* Custom scrollbar for general scrollbars */
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: var(--dark-bg-primary); /* Use CSS variable for theme awareness */
            border-radius: 10px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: var(--dark-border-primary); /* Use CSS variable for theme awareness */
            border-radius: 10px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: var(--accent-secondary); /* Use CSS variable for theme awareness */
          }

          /* Define CSS variables for theme colors for use in <style> block */
          /* These variables are picked up by Tailwind's dark: and light: prefixes */
          /* and also by custom CSS in this style block */
          html.dark {
            --dark-bg-primary: #0A0A0A;
            --dark-bg-secondary: #1A1A1A;
            --dark-border-primary: #0F0;
            --dark-border-secondary: #8A2BE2;
            --dark-text-light: #F0F0F0;
            --dark-text-medium: #B0B0B0;
            --dark-text-dark: #707070;
            --accent-primary: #9333ea;
            --accent-secondary: #32CD32;
            --error-red: #EF4444;
          }

          html.light {
            --light-bg-primary: #F8F8F8;
            --light-bg-secondary: #FFFFFF;
            --light-border-primary: #32CD32;
            --light-border-secondary: #6A5ACD;
            --light-text-light: #212121;
            --light-text-medium: #424242;
            --light-text-dark: #757575;
            --accent-primary: #9333ea; /* You might want a different light mode primary accent */
            --secondary-accent: #32CD32; /* You might want a different light mode secondary accent */
            --error-red: #DC2626;
          }
        `}
      </style>
    </div>
  );
};

export default App;
