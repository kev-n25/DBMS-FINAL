import React, { useState, useEffect } from 'react';

const STATUS_COLORS = {
  'Applied':       { bg: '#E3F2FD', color: '#1565C0' },
  'Under Review':  { bg: '#FFF8E1', color: '#F57F17' },
  'Accepted':      { bg: '#E8F5E9', color: '#2E7D32' },
  'Rejected':      { bg: '#FFEBEE', color: '#C62828' },
};

function Applications({ username, onBack }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/applications/${username}`)
      .then(r => r.json())
      .then(data => { setApplications(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [username]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.logo}>🚀 JobSeeker AI</h2>
        <button style={styles.backBtn} onClick={onBack}>← Back</button>
      </div>

      <div style={styles.content}>
        <h2 style={styles.title}>📋 My Applications</h2>
        <p style={styles.subtitle}>Track all your job applications and their status.</p>

        {loading ? (
          <p style={styles.loading}>Loading your applications...</p>
        ) : applications.length === 0 ? (
          <div style={styles.emptyBox}>
            <div style={styles.emptyIcon}>📭</div>
            <h3 style={styles.emptyTitle}>No applications yet!</h3>
            <p style={styles.emptyDesc}>Go to Find Jobs and hit Apply Now to get started.</p>
          </div>
        ) : (
          <>
            <p style={styles.count}>{applications.length} application{applications.length !== 1 ? 's' : ''}</p>
            <div style={styles.list}>
              {applications.map(app => {
                const sc = STATUS_COLORS[app.status] || STATUS_COLORS['Applied'];
                return (
                  <div key={app.applicationId} style={styles.card}>
                    <div style={styles.cardLeft}>
                      <h3 style={styles.jobTitle}>{app.title}</h3>
                      <p style={styles.company}>🏢 {app.company}</p>
                      <p style={styles.meta}>📍 {app.location} &nbsp;|&nbsp; 🎓 {app.requiredEducation}</p>
                      <p style={styles.desc}>{app.description}</p>
                      <p style={styles.date}>Applied on {formatDate(app.appliedAt)}</p>
                    </div>
                    <div style={styles.cardRight}>
                      <span style={{ ...styles.statusBadge, backgroundColor: sc.bg, color: sc.color }}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'Arial, sans-serif' },
  navbar: { backgroundColor: '#1a1a2e', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { color: 'white', margin: 0 },
  backBtn: { padding: '8px 20px', backgroundColor: '#4285F4', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  content: { maxWidth: '900px', margin: '50px auto', padding: '0 20px' },
  title: { color: '#1a1a2e', fontSize: '32px', marginBottom: '10px' },
  subtitle: { color: '#666', marginBottom: '10px', fontSize: '16px' },
  count: { color: '#888', fontSize: '14px', marginBottom: '25px' },
  loading: { color: '#999', fontStyle: 'italic' },
  emptyBox: { textAlign: 'center', padding: '80px 20px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' },
  emptyIcon: { fontSize: '60px', marginBottom: '15px' },
  emptyTitle: { color: '#1a1a2e', fontSize: '22px', marginBottom: '10px' },
  emptyDesc: { color: '#888', fontSize: '15px' },
  list: { display: 'flex', flexDirection: 'column', gap: '18px' },
  card: { backgroundColor: 'white', borderRadius: '12px', padding: '25px 30px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' },
  cardLeft: { flex: 1 },
  cardRight: { flexShrink: 0 },
  jobTitle: { color: '#1a1a2e', fontSize: '20px', margin: '0 0 8px 0' },
  company: { color: '#4285F4', fontWeight: 'bold', margin: '0 0 5px 0' },
  meta: { color: '#666', fontSize: '13px', margin: '0 0 10px 0' },
  desc: { color: '#888', fontSize: '14px', lineHeight: '1.6', margin: '0 0 12px 0' },
  date: { color: '#aaa', fontSize: '13px', margin: 0 },
  statusBadge: { padding: '8px 18px', borderRadius: '20px', fontWeight: 'bold', fontSize: '13px', whiteSpace: 'nowrap' },
};

export default Applications;