import React, { useState } from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // PREVENT DEFAULT FORM SUBMISSION (CRITICAL!)
    setStatusMessage('Sending message...');
    setIsSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/api/contact', { // Ensure this URL matches your backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) { // Check if status code is 2xx
        setStatusMessage(data.msg || 'Message sent successfully!');
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        setStatusMessage(data.msg || 'Failed to send message.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatusMessage('Network error or server unavailable. Please try again later.');
      setIsSuccess(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-dark-bg-primary dark:bg-dark-bg-primary light:bg-light-bg-primary border-t border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary">
      <div className="container mx-auto max-w-xl">
        <h2 className="text-4xl font-bold text-center text-accent-primary mb-12">{'<CONTACT />'}</h2>
        <form onSubmit={handleSubmit} className="bg-dark-bg-secondary dark:bg-dark-bg-secondary light:bg-light-bg-secondary p-8 rounded-lg shadow-xl border border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary card-shadow">
          <div className="mb-6">
            <label htmlFor="name" className="block text-dark-text-light dark:text-dark-text-light light:text-light-text-light text-lg font-medium mb-2">{'// NAME'}</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 rounded-md bg-dark-border-primary dark:bg-dark-border-primary light:bg-light-border-primary text-dark-text-light dark:text-dark-text-light light:text-light-text-light border border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary focus:outline-none focus:ring-2 focus:ring-accent-primary placeholder-dark-text-light dark:placeholder-dark-text-light light:placeholder-light-text-dark" // Changed placeholder color
              placeholder="> Your Name"
              value={formData.name} // Controlled component
              onChange={handleChange} // Handle input changes
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-dark-text-light dark:text-dark-text-light light:text-light-text-light text-lg font-medium mb-2">{'// EMAIL'}</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 rounded-md bg-dark-border-primary dark:bg-dark-border-primary light:bg-light-border-primary text-dark-text-light dark:text-dark-text-light light:text-light-text-light border border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary focus:outline-none focus:ring-2 focus:ring-accent-primary placeholder-dark-text-light dark:placeholder-dark-text-light light:placeholder-light-text-dark" // Changed placeholder color
              placeholder="> your.email@example.com"
              value={formData.email} // Controlled component
              onChange={handleChange} // Handle input changes
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-dark-text-light dark:text-dark-text-light light:text-light-text-light text-lg font-medium mb-2">{'// MESSAGE'}</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              className="w-full p-3 rounded-md bg-dark-border-primary dark:bg-dark-border-primary light:bg-light-border-primary text-dark-text-light dark:text-dark-text-light light:text-light-text-light border border-dark-border-primary dark:border-dark-border-primary light:border-light-border-primary focus:outline-none focus:ring-2 focus:ring-accent-primary placeholder-dark-text-light dark:placeholder-dark-text-light light:placeholder-light-text-dark" // Changed placeholder color
              placeholder="> Your message..."
              value={formData.message} // Controlled component
              onChange={handleChange} // Handle input changes
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-accent-primary hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent-primary focus:ring-opacity-50 button-no-glow"
          >
            {'<SEND_MESSAGE />'}
          </button>
          {statusMessage && (
            <p className={`mt-4 text-center text-lg ${isSuccess ? 'text-accent-secondary' : 'text-error-red'}`}>
              {statusMessage}
            </p>
          )}
        </form>
        <div className="mt-12 text-center text-dark-text-dark dark:text-dark-text-dark light:text-light-text-dark">
          <p className="mb-4 text-accent-primary">{'// CONNECT_WITH_ME'}</p>
          <div className="flex justify-center space-x-6">
            {/* All social icons now use the same primary/secondary accent colors */}
            <a href="https://github.com/rushikeshxdev" target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:text-accent-secondary transform hover:scale-125 transition-transform duration-300">
              <Github size={36} />
            </a>
            <a href="https://www.linkedin.com/in/rushikeshrandive12/" target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:text-accent-secondary transform hover:scale-125 transition-transform duration-300">
              <Linkedin size={36} />
            </a>
            <a href="https://x.com/rushikeshxdev" target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:text-accent-secondary transform hover:scale-125 transition-transform duration-300">
              <Twitter size={36} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
