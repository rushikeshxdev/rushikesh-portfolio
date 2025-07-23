import React, { useEffect, useState } from 'react';
import { Award } from 'lucide-react';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/achievements'); // Fetch from your backend
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAchievements(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) return <div className="text-center py-20 text-accent-primary">{'// LOADING_ACHIEVEMENTS...'}</div>;
  if (error) return <div className="text-center py-20 text-error-red">{'// ERROR_FETCHING_ACHIEVEMENTS: '}{error}</div>;
  if (achievements.length === 0) return <div className="text-center py-20 text-dark-text-dark dark:text-dark-text-dark light:text-light-text-dark">{'// NO_ACHIEVEMENTS_FOUND.'}</div>;

  return (
    <section id="achievements" className="py-20 px-4 bg-dark-bg-primary dark:bg-dark-bg-primary light:bg-light-bg-primary border-t border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center text-accent-primary mb-12">{'<ACHIEVEMENTS />'}</h2>
        <div className="space-y-8">
          {achievements.map((achievement) => (
            <div key={achievement._id} className="bg-dark-bg-secondary dark:bg-dark-bg-secondary light:bg-light-bg-secondary p-8 rounded-lg shadow-xl border border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary card-shadow flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Award size={64} className="text-accent-secondary flex-shrink-0 mx-auto md:mx-0" />
              <div>
                <h3 className="text-2xl font-bold text-accent-primary mb-2">
                  <span className="text-accent-secondary">{'>'}</span> {achievement.title}
                </h3>
                <p className="text-dark-text-medium dark:text-dark-text-medium light:text-light-text-medium text-lg mb-2">
                  {achievement.description}
                </p>
                {achievement.prize && (
                  <p className="text-accent-secondary text-xl font-semibold">
                    Prize: {achievement.prize} <span className="text-dark-text-dark dark:text-dark-text-dark light:text-light-text-dark">{'// RECOGNIZED_SKILL'}</span>
                  </p>
                )}
                {achievement.date && (
                  <p className="text-dark-text-dark dark:text-dark-text-dark light:text-light-text-dark text-sm">
                    Date: {new Date(achievement.date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;

