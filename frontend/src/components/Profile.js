import React, { useState, useEffect } from 'react';

function Profile({ username, onBack }) {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/skills')
      .then(res => res.json())
      .then(data => setSkills(data));
  }, []);

  const toggleSkill = (skillId) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter(id => id !== skillId));
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  const saveProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/profile/save?username=${username}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selectedSkills)
        }
      );
      const data = await response.text();
      setMessage(data);
    } catch (error) {
      setMessage('Error saving profile!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.logo}>🚀 JobSeeker AI</h2>
        <button style={styles.backBtn} onClick={onBack}>← Back</button>
      </div>

      <div style={styles.content}>
        <h2 style={styles.title}>👤 My Profile</h2>
        <p style={styles.subtitle}>Select your skills to get better job matches!</p>

        <div style={styles.skillsContainer}>
          {skills.map(skill => (
            <div
              key={skill.id}
              style={{
                ...styles.skillChip,
                backgroundColor: selectedSkills.includes(skill.id) ? '#4CAF50' : '#f0f2f5',
                color: selectedSkills.includes(skill.id) ? 'white' : '#333',
              }}
              onClick={() => toggleSkill(skill.id)}
            >
              {skill.skillName}
            </div>
          ))}
        </div>

        <button style={styles.saveBtn} onClick={saveProfile}>
          Save Profile
        </button>

        {message && <p style={styles.message}>{message}</p>}
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
    maxWidth: '800px',
    margin: '50px auto',
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '40px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  title: {
    color: '#1a1a2e',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#666',
    marginBottom: '30px',
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '30px',
  },
  skillChip: {
    padding: '10px 20px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'all 0.2s',
  },
  saveBtn: {
    padding: '12px 40px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '20px',
    color: '#4CAF50',
    fontWeight: 'bold',
  },
};

export default Profile;