import React from 'react';
import { User } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-dark-bg-primary dark:bg-dark-bg-primary light:bg-light-bg-primary border-t border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center text-accent-primary mb-12">{'< ABOUT ME />'}</h2>
        <div className="flex flex-col md:flex-row items-center md:space-x-8 bg-dark-bg-secondary dark:bg-dark-bg-secondary light:bg-light-bg-secondary p-8 rounded-lg shadow-xl border border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary card-shadow">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <img
              src="/avatar.jpg" // Corrected image source for your avatar (assuming it's in public/)
              alt="Rushikesh Randive"
              className="rounded-full w-64 h-64 object-cover mx-auto shadow-xl border-4 border-accent-secondary" // Removed glitch-effect and grayscale
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x300/1a202c/68d391?text=YOUR_AVATAR"; }}
            />
          </div>
          <div className="md:w-2/3 text-lg text-dark-text-medium dark:text-dark-text-medium light:text-light-text-medium leading-relaxed">
            <p className="mb-4">
              <span className="text-accent-secondary">{'>'}</span> Hello! I'm <span className="text-accent-primary">Rushikesh Randive</span>, a passionate Final Year B.Tech student in Computer Science & Business Systems. My academic journey has equipped me with a strong foundation in both theoretical concepts and practical application.
            </p>
            <p className="mb-4">
              <span className="text-accent-secondary">{'>'}</span> I thrive on solving complex problems and am constantly driven to learn new technologies. My goal is to translate innovative ideas into robust and efficient software solutions, turning dreams into reality through code.
            </p>
            <p>
              <span className="text-accent-secondary">{'>'}</span> Outside of coding, I enjoy <span className="text-accent-primary">playing football</span> and <span className="text-accent-primary">doing gym</span>. These activities help me maintain a balanced lifestyle and foster discipline. I believe in clean code, good design, and user-centric experiences. Let's build something amazing together!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
