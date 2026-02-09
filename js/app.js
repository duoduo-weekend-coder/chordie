// Main app logic for Chordie 初弦

const PROGRESS_KEY = 'chordie_completed';

function getCompleted() {
  const stored = localStorage.getItem(PROGRESS_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveCompleted(arr) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(arr));
}

function markComplete(index) {
  const completed = getCompleted();
  if (!completed.includes(index)) {
    completed.push(index);
    saveCompleted(completed);
  }
}

function isUnlocked(index) {
  if (index === 0) return true;
  return getCompleted().includes(index - 1);
}

function isCompleted(index) {
  return getCompleted().includes(index);
}

function getCompletedCount() {
  return getCompleted().length;
}

function showHome() {
  renderChordList((index) => {
    showDetail(index);
  });
}

function showDetail(index) {
  const chord = CHORDS[index];
  renderChordDetail(chord, () => showHome(), () => {
    markComplete(index);
  });
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
  showHome();

  // Splash → app transition
  const splash = document.getElementById('splash');
  const app = document.getElementById('app');
  setTimeout(() => {
    splash.classList.add('fade-out');
    splash.addEventListener('animationend', () => {
      splash.remove();
      app.classList.add('ready');
    });
  }, 2200);

  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
});
