import React, { useState, useEffect } from 'react';

function Jobs({ username, onBack }) {
  const [jobs, setJobs] = useState([]);
  const [searched, setSearched] = useState(false);
  const [appliedIds, setAppliedIds] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [modalJob, setModalJob] = useState(null); // job being applied to
  const [form, setForm] = useState({ fullName: '', phone: '', education: '', experience: '', coverLetter: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/applications/applied-ids/${username}`)
      .then(r => r.json())
      .then(ids => setAppliedIds(ids))
      .catch(() => {});
  }, [username]);

  const showToast = (msg, success) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, success }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  const findJobs = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/jobs/match/${username}`);
      setJobs(await res.json());
      setSearched(true);
    } catch {
      showToast('❌ Error fetching jobs!', false);
    }
  };

  const openModal = (job) => {
    setForm({ fullName: '', phone: '', education: '', experience: '', coverLetter: '' });
    setModalJob(job);
  };

  const closeModal = () => setModalJob(null);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submitApplication = async () => {
    if (!form.fullName.trim() || !form.phone.trim() || !form.education.trim() || !form.experience.trim()) {
      showToast('⚠️ Please fill in all required fields!', false);
      return;
    }
    setSubmitting(true);
    try {
      const params = new URLSearchParams({
        username,
        jobId: modalJob.id,
        fullName: form.fullName,
        phone: form.phone,
        education: form.education,
        experience: form.experience,
        coverLetter: form.coverLetter,
      });
      const res = await fetch(`http://localhost:8080/api/applications/apply?${params}`, { method: 'POST' });
      const msg = await res.text();
      if (msg === 'Already applied!') {
        showToast('⚠️ You already applied to this job!', false);
      } else {
        setAppliedIds(prev => [...prev, modalJob.id]);
        showToast(`✅ Applied to ${modalJob.title} successfully!`, true);
        closeModal();
      }
    } catch {
      showToast('❌ Error submitting application!', false);
    }
    setSubmitting(false);
  };

  return (
    <div style={styles.container}>

      {/* Toasts */}
      <div style={styles.toastContainer}>
        {toasts.map(t => (
          <div key={t.id} style={{ ...styles.toast, backgroundColor: t.success ? '#4CAF50' : '#e74c3c' }}>
            {t.msg}
          </div>
        ))}
      </div>

      {/* Application Modal */}
      {modalJob && (
        <div style={styles.overlay} onClick={closeModal}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div>
                <h2 style={styles.modalTitle}>Apply for {modalJob.title}</h2>
                <p style={styles.modalCompany}>🏢 {modalJob.company} &nbsp;|&nbsp; 📍 {modalJob.location}</p>
              </div>
              <button style={styles.closeBtn} onClick={closeModal}>✕</button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Full Name <span style={styles.req}>*</span></label>
                  <input style={styles.input} name="fullName" placeholder="e.g. Rahul Sharma"
                    value={form.fullName} onChange={handleChange} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Phone Number <span style={styles.req}>*</span></label>
                  <input style={styles.input} name="phone" placeholder="e.g. +91 98765 43210"
                    value={form.phone} onChange={handleChange} />
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Highest Education <span style={styles.req}>*</span></label>
                  <select style={styles.input} name="education" value={form.education} onChange={handleChange}>
                    <option value="">Select education...</option>
                    <option>High School</option>
                    <option>Diploma</option>
                    <option>Bachelor's Degree</option>
                    <option>Master's Degree</option>
                    <option>PhD</option>
                  </select>
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Years of Experience <span style={styles.req}>*</span></label>
                  <select style={styles.input} name="experience" value={form.experience} onChange={handleChange}>
                    <option value="">Select experience...</option>
                    <option>Fresher (0 years)</option>
                    <option>1 year</option>
                    <option>2 years</option>
                    <option>3-5 years</option>
                    <option>5-10 years</option>
                    <option>10+ years</option>
                  </select>
                </div>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Cover Letter <span style={styles.optional}>(optional)</span></label>
                <textarea style={styles.textarea} name="coverLetter"
                  placeholder="Tell the employer why you're a great fit for this role..."
                  value={form.coverLetter} onChange={handleChange} rows={4} />
              </div>

              <p style={styles.reqNote}><span style={styles.req}>*</span> Required fields</p>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.cancelBtn} onClick={closeModal}>Cancel</button>
              <button style={{ ...styles.submitBtn, opacity: submitting ? 0.7 : 1 }}
                onClick={submitApplication} disabled={submitting}>
                {submitting ? 'Submitting...' : '🚀 Submit Application'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>🚀 JobSeeker AI</h2>
        <button style={styles.backBtn} onClick={onBack}>← Back</button>
      </div>

      <div style={styles.content}>
        <h2 style={styles.title}>🤖 AI Job Matcher</h2>
        <p style={styles.subtitle}>Click below to find jobs that match your skills!</p>
        <button style={styles.findBtn} onClick={findJobs}>🔍 Find Matching Jobs</button>

        {searched && jobs.length === 0 && (
          <p style={styles.noJobs}>No matching jobs found! Update your profile with more skills.</p>
        )}

        <div style={styles.jobsGrid}>
          {jobs.map(job => {
            const applied = appliedIds.includes(job.id);
            return (
              <div key={job.id} style={styles.jobCard}>
                <h3 style={styles.jobTitle}>{job.title}</h3>
                <p style={styles.company}>🏢 {job.company}</p>
                <p style={styles.education}>🎓 {job.requiredEducation}</p>
                <p style={styles.location}>📍 {job.location}</p>
                <p style={styles.description}>{job.description}</p>
                <button
                  style={{ ...styles.applyBtn, backgroundColor: applied ? '#aaa' : '#4CAF50', cursor: applied ? 'default' : 'pointer' }}
                  onClick={() => !applied && openModal(job)}
                  disabled={applied}>
                  {applied ? '✓ Applied' : 'Apply Now'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'Arial, sans-serif' },
  toastContainer: { position: 'fixed', top: '20px', right: '20px', zIndex: 2000, display: 'flex', flexDirection: 'column', gap: '10px' },
  toast: { padding: '14px 24px', borderRadius: '8px', color: 'white', fontWeight: 'bold', fontSize: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' },

  // Modal
  overlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  modal: { backgroundColor: 'white', borderRadius: '16px', width: '100%', maxWidth: '620px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' },
  modalHeader: { padding: '25px 30px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  modalTitle: { margin: '0 0 6px 0', color: '#1a1a2e', fontSize: '22px' },
  modalCompany: { margin: 0, color: '#666', fontSize: '14px' },
  closeBtn: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#999', padding: '0 0 0 15px', lineHeight: 1 },
  modalBody: { padding: '25px 30px' },
  modalFooter: { padding: '20px 30px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end', gap: '12px' },
  row: { display: 'flex', gap: '16px', marginBottom: '18px' },
  field: { flex: 1, display: 'flex', flexDirection: 'column' },
  label: { fontSize: '13px', fontWeight: 'bold', color: '#444', marginBottom: '6px' },
  req: { color: '#e74c3c' },
  optional: { color: '#aaa', fontWeight: 'normal' },
  input: { padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', outline: 'none', backgroundColor: '#fafafa' },
  textarea: { padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'Arial, sans-serif', backgroundColor: '#fafafa' },
  reqNote: { color: '#aaa', fontSize: '12px', margin: '10px 0 0 0' },
  cancelBtn: { padding: '11px 25px', backgroundColor: '#f0f0f0', color: '#555', border: 'none', borderRadius: '8px', fontSize: '15px', cursor: 'pointer' },
  submitBtn: { padding: '11px 30px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', cursor: 'pointer', fontWeight: 'bold' },

  // Page
  navbar: { backgroundColor: '#1a1a2e', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { color: 'white', margin: 0 },
  backBtn: { padding: '8px 20px', backgroundColor: '#4285F4', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  content: { maxWidth: '1000px', margin: '50px auto', padding: '40px' },
  title: { color: '#1a1a2e', fontSize: '32px', marginBottom: '10px' },
  subtitle: { color: '#666', marginBottom: '30px', fontSize: '16px' },
  findBtn: { padding: '15px 40px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', cursor: 'pointer', marginBottom: '40px' },
  noJobs: { color: '#e74c3c', fontSize: '16px', marginBottom: '20px' },
  jobsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' },
  jobCard: { backgroundColor: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' },
  jobTitle: { color: '#1a1a2e', fontSize: '20px', marginBottom: '10px' },
  company: { color: '#4285F4', fontWeight: 'bold', marginBottom: '5px' },
  education: { color: '#666', marginBottom: '5px' },
  location: { color: '#888', fontSize: '13px', marginBottom: '10px' },
  description: { color: '#888', fontSize: '14px', marginBottom: '20px', lineHeight: '1.6' },
  applyBtn: { padding: '10px 25px', color: 'white', border: 'none', borderRadius: '6px', width: '100%', fontSize: '15px' },
};

export default Jobs;