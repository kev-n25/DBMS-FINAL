import React from 'react';

function Dashboard({ username, onLogout, onProfile, onFindJobs, onApplications }) {
  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.logo}>🚀 JobSeeker AI</h2>
        <div style={styles.navRight}>
          <span style={styles.welcomeText}>👋 Welcome, {username}!</span>
          <button style={styles.logoutBtn} onClick={onLogout}>Logout</button>
        </div>
      </div>

      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Find Your Dream Job</h1>
        <p style={styles.heroSubtitle}>Let AI match you with the perfect job based on your skills!</p>
      </div>

      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <div style={styles.cardIcon}>👤</div>
          <h3 style={styles.cardTitle}>My Profile</h3>
          <p style={styles.cardDesc}>Add your location and skills to get better job matches!</p>
          <button style={{ ...styles.cardBtn, backgroundColor: '#4285F4' }} onClick={onProfile}>
            View Profile
          </button>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcon}>🤖</div>
          <h3 style={styles.cardTitle}>Find Jobs</h3>
          <p style={styles.cardDesc}>Let our AI find the best jobs that match your skills and location!</p>
          <button style={{ ...styles.cardBtn, backgroundColor: '#4CAF50' }} onClick={onFindJobs}>
            Find Jobs
          </button>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcon}>📋</div>
          <h3 style={styles.cardTitle}>My Applications</h3>
          <p style={styles.cardDesc}>Track all your job applications and their current status!</p>
          <button style={{ ...styles.cardBtn, backgroundColor: '#FF9800' }} onClick={onApplications}>
            View Applications
          </button>
        </div>
      </div>

      <div style={styles.statsContainer}>
        <div style={styles.statBox}>
          <h2 style={styles.statNumber}>500+</h2>
          <p style={styles.statLabel}>Jobs Available</p>
        </div>
        <div style={styles.statBox}>
          <h2 style={styles.statNumber}>50+</h2>
          <p style={styles.statLabel}>Companies</p>
        </div>
        <div style={styles.statBox}>
          <h2 style={styles.statNumber}>AI</h2>
          <p style={styles.statLabel}>Powered Matching</p>
        </div>
        <div style={styles.statBox}>
          <h2 style={styles.statNumber}>100%</h2>
          <p style={styles.statLabel}>Free to Use</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'Arial, sans-serif' },
  navbar: { backgroundColor: '#1a1a2e', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { color: 'white', margin: 0, fontSize: '22px' },
  navRight: { display: 'flex', alignItems: 'center', gap: '20px' },
  welcomeText: { color: 'white', fontSize: '16px' },
  logoutBtn: { padding: '8px 20px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' },
  hero: { background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)', padding: '80px 40px', textAlign: 'center' },
  heroTitle: { color: 'white', fontSize: '48px', margin: '0 0 15px 0' },
  heroSubtitle: { color: '#a0aec0', fontSize: '20px', margin: 0 },
  cardsContainer: { display: 'flex', justifyContent: 'center', gap: '30px', padding: '60px 40px', flexWrap: 'wrap' },
  card: { backgroundColor: 'white', borderRadius: '15px', padding: '40px 30px', width: '280px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' },
  cardIcon: { fontSize: '50px', marginBottom: '15px' },
  cardTitle: { fontSize: '20px', color: '#1a1a2e', marginBottom: '10px' },
  cardDesc: { fontSize: '14px', color: '#666', marginBottom: '25px', lineHeight: '1.6' },
  cardBtn: { padding: '12px 30px', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', cursor: 'pointer', width: '100%' },
  statsContainer: { display: 'flex', justifyContent: 'center', gap: '40px', padding: '40px', backgroundColor: '#1a1a2e', flexWrap: 'wrap' },
  statBox: { textAlign: 'center' },
  statNumber: { color: '#4CAF50', fontSize: '36px', margin: '0 0 5px 0' },
  statLabel: { color: '#a0aec0', fontSize: '14px', margin: 0 },
};

export default Dashboard;