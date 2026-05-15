const storage = {
  saveProgress: (lectureId, status) => {
    const progress = JSON.parse(localStorage.getItem('network_study_progress') || '{}');
    progress[lectureId] = status;
    localStorage.setItem('network_study_progress', JSON.stringify(progress));
  },
  getProgress: () => {
    return JSON.parse(localStorage.getItem('network_study_progress') || '{}');
  },
  resetProgress: () => {
    localStorage.removeItem('network_study_progress');
    localStorage.removeItem('network_quiz_scores');
  },
  saveQuizScore: (score) => {
    const scores = JSON.parse(localStorage.getItem('network_quiz_scores') || '[]');
    scores.push({ score, date: new Date().toISOString() });
    localStorage.setItem('network_quiz_scores', JSON.stringify(scores));
  },
  getQuizScores: () => {
    return JSON.parse(localStorage.getItem('network_quiz_scores') || '[]');
  },
  saveRevisionMode: (isActive) => {
    localStorage.setItem('network_revision_mode', isActive);
  },
  getRevisionMode: () => {
    return localStorage.getItem('network_revision_mode') === 'true';
  }
};

export default storage;
