import React from 'react';
import ThreeJsBackground from '../components/ThreeJsBackground'; // Import the Three.js background component

const Home = ({ scrollToSection }) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center p-4 bg-gradient-to-br from-dark-bg-primary to-dark-bg-secondary dark:from-dark-bg-primary dark:to-dark-bg-secondary light:from-light-bg-primary light:to-light-bg-secondary overflow-hidden">
      <ThreeJsBackground />
      <div className="relative z-10 p-6 bg-dark-bg-secondary dark:bg-dark-bg-secondary light:bg-light-bg-secondary bg-opacity-80 rounded-xl shadow-2xl max-w-2xl mx-auto border border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary home-card-shadow">
        <h1 className="text-5xl md:text-7xl font-extrabold text-dark-text-light dark:text-dark-text-light light:text-light-text-light mb-4 animate-fade-in-up">
          <span className="text-accent-secondary">{'Hello, I am'}</span> Rushiii
        </h1>
        <p className="text-xl md:text-2xl text-dark-text-medium dark:text-dark-text-medium light:text-light-text-medium mb-8 animate-fade-in-up animation-delay-200">
          A passionate Final Year B.Tech student in Computer Science & Business Systems.
        </p>
        <button
          onClick={() => scrollToSection('projects')}
          className="bg-accent-primary hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent-primary focus:ring-opacity-50 neon-button"
        >
          View My Work <span className="text-accent-secondary">{'>>'}</span>
        </button>
      </div>
    </section>
  );
};

export default Home;
