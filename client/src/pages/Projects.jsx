import React, { useEffect, useState } from 'react';
import { Github } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://rushikesh-portfolio-api.onrender.com/api/projects'); // Fetch from your backend
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="text-center py-20 text-accent-primary">{'// LOADING_PROJECTS...'}</div>;
  if (error) return <div className="text-center py-20 text-error-red">{'// ERROR_FETCHING_PROJECTS: '}{error}</div>;
  if (projects.length === 0) return <div className="text-center py-20 text-dark-text-dark dark:text-dark-text-dark light:text-light-text-dark">{'// NO_PROJECTS_FOUND.'}</div>;

  return (
    <section id="projects" className="py-20 px-4 bg-dark-bg-secondary dark:bg-dark-bg-secondary light:bg-light-bg-secondary border-t border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl font-bold text-center text-accent-primary mb-12">{'<PROJECTS />'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project._id} className="bg-dark-bg-secondary dark:bg-dark-bg-secondary light:bg-light-bg-secondary rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary card-shadow flex flex-col"> {/* Added flex flex-col to make content stretch */}
              <img
                src={project.imageUrl || `https://placehold.co/400x250/1A1A1A/0F0?text=${project.title.replace(/\s/g, '_').toUpperCase()}_SCREEN`}
                alt={project.title}
                className="w-full h-48  border-b border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x250/1A1A1A/0F0?text=PLACEHOLDER`; }}
              />
              <div className="p-6 flex flex-col flex-grow justify-between"> {/* Added flex-grow and justify-between */}
                <div> {/* Group content above buttons */}
                  <h3 className="text-2xl font-bold text-accent-primary mb-2">{project.title} <span className="text-accent-secondary">{'//'}</span></h3>
                  <p className="text-dark-text-medium dark:text-dark-text-medium light:text-light-text-medium mb-4 text-sm">
                    <span className="text-accent-secondary">{'>'}</span> {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologiesUsed && project.technologiesUsed.map((tech, idx) => (
                      <span key={idx} className="bg-dark-border-primary dark:bg-dark-border-primary light:bg-light-border-primary text-dark-text-light dark:text-dark-text-light light:text-light-text-light text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-auto"> {/* mt-auto pushes this div to the bottom */}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-primary hover:text-accent-secondary flex items-center space-x-1 transition-colors duration-200"
                    >
                      <Github size={20} />
                      <span>{'<CODE />'}</span>
                    </a>
                  )}
                  {project.liveDemoLink && (
                    <a
                      href={project.liveDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent-primary hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent-primary focus:ring-opacity-50 button-no-glow"
                    >
                      {'<LIVE_DEMO />'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
