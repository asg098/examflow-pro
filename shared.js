// Shared utility functions for all pages
// Import this in each page via <script src="js/shared.js"></script>

// ─── Toast Notification System ───
window.showToast = (msg, type = 'info', duration = 3500) => {
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${icons[type]}</span><span style="flex:1;font-size:0.875rem">${msg}</span><span onclick="this.parentElement.remove()" style="cursor:pointer;opacity:0.5;color:inherit">✕</span>`;
  container.appendChild(t);
  setTimeout(() => t.style.animation = 'fadeOut 0.3s ease forwards', duration - 300);
  setTimeout(() => t.remove(), duration);
};

// ─── Format Helpers ───
window.formatDate = (ts) => {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

window.formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

window.formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes} min`;
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};

window.getGrade = (pct) => {
  if (pct >= 90) return { grade: 'A+', color: '#10b981' };
  if (pct >= 80) return { grade: 'A', color: '#34d399' };
  if (pct >= 70) return { grade: 'B+', color: '#60a5fa' };
  if (pct >= 60) return { grade: 'B', color: '#93c5fd' };
  if (pct >= 50) return { grade: 'C', color: '#fbbf24' };
  return { grade: 'F', color: '#f87171' };
};

window.generateId = () => Math.random().toString(36).substr(2, 9).toUpperCase();

// ─── Sidebar Nav Activation ───
window.activateNav = (id) => {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
};

// ─── Section Switcher ───
window.showSection = (sectionId, navId) => {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  const sec = document.getElementById(sectionId);
  if (sec) { sec.classList.remove('hidden'); sec.classList.add('fade-in'); }
  if (navId) activateNav(navId);
};

// ─── Modal Helpers ───
window.openModal = (id) => {
  const m = document.getElementById(id);
  if (m) { m.classList.add('show'); document.body.style.overflow = 'hidden'; }
};
window.closeModal = (id) => {
  const m = document.getElementById(id);
  if (m) { m.classList.remove('show'); document.body.style.overflow = ''; }
};

// ─── Confirm Dialog ───
window.confirmAction = (msg, onConfirm) => {
  if (confirm(msg)) onConfirm();
};

// ─── Number formatting ───
window.fmtNum = (n) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n;
};

// ─── Question Type Label ───
window.qTypeLabel = (type) => {
  const map = { mcq: 'MCQ', multi: 'Multi-Select', 'true-false': 'True/False', numerical: 'Numerical', short: 'Short Answer', descriptive: 'Descriptive' };
  return map[type] || type;
};

// ─── Sidebar Toggle (Mobile) ───
window.toggleSidebar = () => {
  document.querySelector('.sidebar')?.classList.toggle('open');
};
