import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await fetch('https://rushikesh-portfolio-izh8.onrender.com/api/certifications/'); // Fetch from your backend
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCertifications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  if (loading) return <div className="text-center py-20 text-accent-primary">{'// LOADING_CERTIFICATIONS...'}</div>;
  if (error) return <div className="text-center py-20 text-error-red">{'// ERROR_FETCHING_CERTIFICATIONS: '}{error}</div>;
  if (certifications.length === 0) return <div className="text-center py-20 text-dark-text-dark dark:text-dark-text-dark light:text-light-text-dark">{'// NO_CERTIFICATIONS_FOUND.'}</div>;

  return (
    <section id="certifications" className="py-20 px-4 bg-dark-bg-secondary dark:bg-dark-bg-secondary light:bg-light-bg-secondary border-t border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center text-accent-primary mb-12">{'<CERTIFICATIONS />'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Adjusted grid for thumbnails */}
          {certifications.map((cert) => (
            <div key={cert._id} className="bg-dark-bg-secondary dark:bg-dark-bg-secondary light:bg-light-bg-secondary rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary card-shadow">
              {cert.imageUrl ? (
                <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="w-full h-48 object-cover border-b border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x250/1a1a1a/0F0?text=CERT_THUMBNAIL'; }}
                  />
                </a>
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-dark-border-primary dark:bg-dark-border-primary light:bg-light-border-primary border-b border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary">
                  <BookOpen size={64} className="text-accent-secondary" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-accent-primary mb-2">
                  <span className="text-accent-secondary">{'>'}</span> {cert.title}
                </h3>
                <p className="text-dark-text-medium dark:text-dark-text-medium light:text-light-text-medium mb-2 text-sm">
                  Issued by: <span className="text-accent-secondary">{cert.issuingBody}</span>
                </p>
                <p className="text-dark-text-dark dark:text-dark-text-dark light:text-light-text-dark text-xs mb-4">
                  Date: <span className="text-dark-text-medium dark:text-dark-text-medium light:text-light-text-medium">{new Date(cert.dateIssued).toLocaleDateString()}</span>
                </p>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent-primary hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors duration-300 border border-accent-primary neon-button inline-flex items-center space-x-2 text-sm"
                  >
                    View Credential <span className="text-dark-text-light dark:text-dark-text-light light:text-light-text-light">{'>>'}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
