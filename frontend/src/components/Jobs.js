import React, { useState } from 'react';

function Jobs({ username, onBack }) {
  const [jobs, setJobs] = useState([]);
  const [searched, setSearched] = useState(false);

  const findJobs = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/jobs/match/${username}`
      );
      const data = await response.json();
      setJobs(data);
      setSearched(true);
    } catch (error) {
      console.error('Error fetching jobs!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.logo}>🚀 JobSeeker AI</h2>
        <button style={styles.backBtn} onClick={onBack}>← Back</button>
      </div>

      <div style={styles.content}>
        <h2 style={styles.title}>🤖 AI Job Matcher</h2>
        <p style={styles.subtitle}>
          Click below to find jobs that match your skills!
        </p>

        <button style={styles.findBtn} onClick={findJobs}>
          🔍 Find Matching Jobs
        </button>

        {searched && jobs.length === 0 && (
          <p style={styles.noJobs}>
            No matching jobs found! Update your profile with more skills.
          </p>
        )}

        <div style={styles.jobsGrid}>
          {jobs.map(job => (
            <div key={job.id} style={styles.jobCard}>
              <h3 style={styles.jobTitle}>{job.title}</h3>
              <p style={styles.company}>🏢 {job.company}</p>
              <p style={styles.education}>🎓 {job.requiredEducation}</p>
              <p style={styles.description}>{job.description}</p>
              <button style={styles.applyBtn}>Apply Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
  },
  navbar: {
    backgroundColor: '#1a1a2e',
    padding: '15px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: 'white',
    margin: 0,
  },
  backBtn: {
    padding: '8px 20px',
    backgroundColor: '#4285F4',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  content: {
    maxWidth: '1000px',
    margin: '50px auto',
    padding: '40px',
  },
  title: {
    color: '#1a1a2e',
    fontSize: '32px',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#666',
    marginBottom: '30px',
    fontSize: '16px',
  },
  findBtn: {
    padding: '15px 40px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    cursor: 'pointer',
    marginBottom: '40px',
  },
  noJobs: {
    color: '#e74c3c',
    fontSize: '16px',
    marginBottom: '20px',
  },
  jobsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '25px',
  },
  jobCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  jobTitle: {
    color: '#1a1a2e',
    fontSize: '20px',
    marginBottom: '10px',
  },
  company: {
    color: '#4285F4',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  education: {
    color: '#666',
    marginBottom: '10px',
  },
  description: {
    color: '#888',
    fontSize: '14px',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  applyBtn: {
    padding: '10px 25px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '15px',
  },
};

export default Jobs;