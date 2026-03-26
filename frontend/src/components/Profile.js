import React, { useState, useEffect } from 'react';

function Profile({ username, onBack }) {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load all skills, user's saved skills, AND user's saved location — all at once
    Promise.all([
      fetch('http://localhost:8080/api/skills').then(r => r.json()),
      fetch(`http://localhost:8080/api/profile/skills/${username}`).then(r => r.json()),
      fetch(`http://localhost:8080/api/profile/location/${username}`).then(r => r.text()),
    ]).then(([allSkills, savedSkillIds, savedLocation]) => {
      setSkills(allSkills);
      setSelectedSkills(savedSkillIds);
      setLocation(savedLocation || '');
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [username]);

  const toggleSkill = (skillId) => {
    setSelectedSkills(prev =>
      prev.includes(skillId)
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const saveProfile = async () => {
    try {
      // Save skills
      const skillsRes = await fetch(
        `http://localhost:8080/api/profile/save?username=${username}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selectedSkills),
        }
      );

      // Save location
      await fetch(
        `http://localhost:8080/api/profile/location?username=${username}&location=${encodeURIComponent(location.trim())}`,
        { method: 'POST' }
      );

      const msg = await skillsRes.text();
      setMessage('✅ ' + msg);
    } catch (error) {
      setMessage('❌ Error saving profile!');
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
        <p style={styles.subtitle}>Set your location and skills to get better job matches!</p>

        {/* Location Section */}
        <h3 style={styles.sectionTitle}>📍 Your Location</h3>
        <input
          style={styles.locationInput}
          type="text"
          placeholder="e.g. Bangalore, Mumbai, Delhi..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* Skills Section */}
        <h3 style={styles.sectionTitle}>🛠️ Your Skills</h3>
        <p style={styles.skillsHint}>Click to select / deselect</p>

        {loading ? (
          <p style={styles.loadingText}>Loading your profile...</p>
        ) : (
          <div style={styles.skillsContainer}>
            {skills.map(skill => (
              <div
                key={skill.id}
                style={{
                  ...styles.skillChip,
                  backgroundColor: selectedSkills.includes(skill.id) ? '#4CAF50' : '#f0f2f5',
                  color: selectedSkills.includes(skill.id) ? 'white' : '#333',
                  boxShadow: selectedSkills.includes(skill.id)
                    ? '0 2px 8px rgba(76,175,80,0.4)'
                    : 'none',
                }}
                onClick={() => toggleSkill(skill.id)}
              >
                {selectedSkills.includes(skill.id) ? '✓ ' : ''}{skill.skillName}
              </div>
            ))}
          </div>
        )}

        <div style={styles.footer}>
          <p style={styles.selectedCount}>
            {selectedSkills.length} skill{selectedSkills.length !== 1 ? 's' : ''} selected
          </p>
          <button style={styles.saveBtn} onClick={saveProfile}>
            💾 Save Profile
          </button>
        </div>

        {message && (
          <p style={{
            ...styles.message,
            color: message.startsWith('✅') ? '#4CAF50' : '#e74c3c',
          }}>
            {message}
          </p>
        )}
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
  sectionTitle: {
    color: '#1a1a2e',
    marginBottom: '12px',
    fontSize: '18px',
  },
  locationInput: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '15px',
    marginBottom: '35px',
    boxSizing: 'border-box',
    outline: 'none',
  },
  skillsHint: {
    color: '#999',
    fontSize: '13px',
    marginBottom: '15px',
    marginTop: '-8px',
  },
  loadingText: {
    color: '#999',
    fontStyle: 'italic',
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '30px',
  },
  skillChip: {
    padding: '10px 20px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'all 0.2s',
    userSelect: 'none',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
  },
  selectedCount: {
    color: '#888',
    fontSize: '14px',
    margin: 0,
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
    fontWeight: 'bold',
    fontSize: '15px',
  },
};

export default Profile;