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

window.generateSchoolId = (uid) => {
  if (!uid) return 'SCH_' + window.generateId();
  return 'SCH_' + String(uid).substring(0, 10).toUpperCase();
};

// ─── Data normalization helpers ───
window.normalizeEmail = (value) => String(value || '').trim().toLowerCase();
window.normalizeRole = (value) => String(value || '').trim().toLowerCase();
window.normalizeClassName = (value) => String(value || '').trim();
window.normalizeDivision = (value) => String(value || '').trim().toUpperCase();
window.safeText = (value, fallback = '') => {
  const text = String(value == null ? '' : value).trim();
  return text || fallback;
};

window.safeChart = (canvasId, config) => {
  if (!window.Chart || !canvasId || !config) return null;
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;

  if (!window.__chartRegistry) window.__chartRegistry = {};
  if (window.__chartRegistry[canvasId]) {
    window.__chartRegistry[canvasId].destroy();
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  window.__chartRegistry[canvasId] = new window.Chart(ctx, config);
  return window.__chartRegistry[canvasId];
};

// Theme helpers
window.applyTheme = (theme) => {
  const resolved = theme === 'light' || theme === 'dark'
    ? theme
    : (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', resolved);
  localStorage.setItem('examflow-theme', resolved);
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.textContent = resolved === 'dark' ? 'Light' : 'Dark';
    btn.setAttribute('aria-label', resolved === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    btn.title = resolved === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  });
};

window.toggleTheme = () => {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
};

window.initTheme = () => {
  const saved = localStorage.getItem('examflow-theme');
  applyTheme(saved || 'dark');
};

window.initTheme();

// ─── Sidebar Nav Activation ───
window.activateNav = (id) => {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
};

window.toggleSidebar = () => {
  const sb = document.querySelector('.sidebar');
  if (sb) sb.classList.toggle('open');
};

window.closeSidebar = () => {
  const sb = document.querySelector('.sidebar');
  if (sb) sb.classList.remove('open');
};

// ─── Section Switcher ───
window.showSection = (sectionId, navId) => {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  const sec = document.getElementById(sectionId);
  if (sec) { sec.classList.remove('hidden'); sec.classList.add('fade-in'); }
  if (navId) activateNav(navId);
  window.closeSidebar(); // Close on mobile navigation
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
