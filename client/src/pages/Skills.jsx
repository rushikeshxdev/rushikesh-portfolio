import React, { useEffect, useState } from 'react';
import { Code } from 'lucide-react';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('https://rushikesh-portfolio-api.onrender.com/api/skills'); // Fetch from your backend
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSkills(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) return <div className="text-center py-20 text-accent-primary">{'// LOADING_SKILLS...'}</div>;
  if (error) return <div className="text-center py-20 text-error-red">{'// ERROR_FETCHING_SKILLS: '}{error}</div>;
  if (skills.length === 0) return <div className="text-center py-20 text-dark-text-dark dark:text-dark-text-dark light:text-light-text-dark">{'// NO_SKILLS_FOUND.'}</div>;


  return (
    <section id="skills" className="py-20 px-4 bg-dark-bg-primary dark:bg-dark-bg-primary light:bg-light-bg-primary border-t border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center text-accent-primary mb-12">{'<SKILLS />'}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {skills.map((skill) => (
            <div key={skill._id} className="flex flex-col items-center p-6 bg-dark-bg-secondary dark:bg-dark-bg-secondary light:bg-light-bg-secondary rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary card-shadow">
              <Code size={48} className="text-accent-secondary mb-4" /> {/* You might want to map icons based on skill.name */}
              <span className="text-xl font-semibold text-dark-text-light dark:text-dark-text-light light:text-light-text-light">{skill.name}</span>
              {skill.category && <span className="text-sm text-dark-text-dark dark:text-dark-text-dark light:text-light-text-dark">({skill.category})</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
