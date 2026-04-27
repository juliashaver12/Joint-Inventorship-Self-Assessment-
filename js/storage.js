// ============================================================
// STORAGE.JS — Session persistence via localStorage
// Saves and restores interview state so users can resume
// after closing the browser.
// ============================================================

const STORAGE_KEY = 'inventorship_session';

const Storage = {

  save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // localStorage unavailable (private browsing quota exceeded, etc.)
      // Silently fail — the app works without persistence
    }
  },

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  },

  // Returns true if there is a resumable session (i.e. interview started,
  // not just the opening page unacknowledged)
  hasResumableSession() {
    const s = this.load();
    if (!s) return false;
    // A session is resumable if the interview has been started
    // (current screen is not null and differs from the initial state,
    // OR a conclusion has been reached)
    return s.started === true;
  },

};
