import lectureContent from './lecture-content.js';
import storage from './storage.js';
import search from './search.js';
import quiz from './quiz.js';
import visualizer from './visualizer.js';

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  document.getElementById('total-lectures').textContent = `${lectureContent.length} Topics`;
  
  const isRevision = storage.getRevisionMode();
  if (isRevision) {
    document.body.classList.add('revision-mode');
    const toggle = document.getElementById('revision-mode-toggle');
    if (toggle) toggle.textContent = 'Standard Mode';
  }

  renderLectures(lectureContent);
  updateDashboard();
  setupEventListeners();
  
  // Initialize Visualizers
  visualizer.renderPacketPath('packet-path-viz');
  visualizer.renderVlanTag('vlan-tag-viz');
  visualizer.renderMacLearning('mac-learning-viz');
  visualizer.renderRipHop('rip-hop-viz');
  visualizer.renderOspfProcess('ospf-process-viz');
  
  initQuiz();
  setupCommandTabs();
  renderTopQuestions();
}

function renderTopQuestions() {
  const container = document.getElementById('top-questions-container');
  if (!container) return;
  
  const allQuestions = lectureContent.flatMap(l => l.examQuestions || []);
  const top20 = allQuestions.slice(0, 20);
  
  container.innerHTML = '';
  top20.forEach((q, idx) => {
    const card = document.createElement('div');
    card.className = 'final-question-card';
    card.innerHTML = `
      <h4>Q${idx + 1}: ${q.question}</h4>
      <p class="answer-text hidden">${q.answer}</p>
      <button class="btn-text toggle-answer">Reveal Answer</button>
    `;
    
    card.querySelector('.toggle-answer').addEventListener('click', (e) => {
      const p = card.querySelector('.answer-text');
      const isHidden = p.classList.contains('hidden');
      p.classList.toggle('hidden');
      e.target.textContent = isHidden ? 'Hide Answer' : 'Reveal Answer';
    });
    
    container.appendChild(card);
  });
}

function getCompactCommands(lectureId) {
  const commandMap = {
    2: 'show ip route',
    3: 'show ip route static',
    4: 'router rip, version 2, network',
    5: 'router ospf, show ip ospf neighbor',
    8: 'show mac address-table',
    'vlan': 'vlan [id], switchport mode trunk'
  };
  return commandMap[lectureId] || 'show ip route';
}

function renderLectures(content) {
  const lectureList = document.getElementById('lecture-list');
  lectureList.innerHTML = '';
  
  const progress = storage.getProgress();
  const isRevisionMode = document.body.classList.contains('revision-mode');
  
  if (content.length === 0) {
    lectureList.innerHTML = '<div class="lecture-card lecture-empty"><h3>No lectures found matching your search.</h3></div>';
    return;
  }

  content.forEach(lecture => {
    const isCompleted = progress[lecture.id] === 'completed';
    const card = document.createElement('div');
    card.className = `lecture-card fade-in ${isRevisionMode ? 'revision-card' : ''}`;
    
    if (isRevisionMode) {
      card.innerHTML = `
        <div class="revision-header">
          <h3>L${lecture.id}: ${lecture.title}</h3>
          <span class="priority ${lecture.priority}">${lecture.priority}</span>
        </div>
        <div class="revision-content">
          <div class="revision-item"><strong>Formula:</strong> ${lecture.formulas || 'N/A'}</div>
          <div class="revision-item"><strong>Trap:</strong> ${lecture.examTrap}</div>
          <div class="revision-item"><strong>Commands:</strong> ${getCompactCommands(lecture.id)}</div>
          <div class="revision-item"><strong>Key Q:</strong> ${lecture.examQuestions ? lecture.examQuestions[0].question : 'N/A'}</div>
        </div>
      `;
    } else {
      card.innerHTML = `
        <span class="priority ${lecture.priority}">${lecture.priority} Priority</span>
        <h3>Lecture ${lecture.id}: ${lecture.title}</h3>
        <p class="lecture-summary">${lecture.englishExplanation.substring(0, 100)}...</p>
        
        <div class="lecture-details hidden">
          <p>${lecture.englishExplanation}</p>
          <div class="exam-trap-box">
            <div class="exam-trap-line"><strong class="exam-trap-label">Final Exam Trap:</strong> ${lecture.examTrap}</div>
            <div><strong class="how-to-answer-label">How to Answer:</strong> ${lecture.howToAnswer}</div>
          </div>

          <div class="arabic-text">${lecture.arabicExplanation}</div>
          
          <div class="key-terms-container">
            <strong>Key Terms:</strong>
            <p class="key-terms-list">
              ${lecture.terms.map(t => `<span title="${t.desc}">${t.en} (${t.ar})</span>`).join(', ')}
            </p>
          </div>
        </div>

        <div class="lecture-actions">
          <button class="btn btn-secondary expand-btn">Show Details</button>
          <button class="btn ${isCompleted ? 'completed mark-studied-btn' : 'btn-secondary mark-studied-btn'}" data-id="${lecture.id}">
            ${isCompleted ? '✓ Studied' : 'Mark as studied'}
          </button>
        </div>
      `;
      
      const expandBtn = card.querySelector('.expand-btn');
      const details = card.querySelector('.lecture-details');
      expandBtn.addEventListener('click', () => {
        const isHidden = details.classList.contains('hidden');
        details.classList.toggle('hidden');
        expandBtn.textContent = isHidden ? 'Hide Details' : 'Show Details';
      });
    }
    
    const studyBtn = card.querySelector('.mark-studied-btn');
    if (studyBtn) {
      studyBtn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        const isCurrentlyCompleted = e.target.classList.contains('completed');
        const status = isCurrentlyCompleted ? 'pending' : 'completed';
        
        storage.saveProgress(id, status);
        
        if (status === 'completed') {
          e.target.classList.remove('btn-secondary');
          e.target.classList.add('completed');
          e.target.textContent = '✓ Studied';
        } else {
          e.target.classList.remove('completed');
          e.target.classList.add('btn-secondary');
          e.target.textContent = 'Mark as studied';
        }
        
        updateDashboard();
      });
    }

    lectureList.appendChild(card);
  });
}

function updateDashboard() {
  const progress = storage.getProgress();
  const completed = Object.values(progress).filter(s => s === 'completed').length;
  const total = lectureContent.length;
  const percentage = Math.round((completed / total) * 100);
  document.getElementById('progress-val').textContent = `${percentage}%`;
  
  const scores = storage.getQuizScores();
  if (scores.length > 0) {
    const max = Math.max(...scores.map(s => s.score));
    document.getElementById('high-score').textContent = `${max} / ${quiz.bank.length}`;
  } else {
    document.getElementById('high-score').textContent = `--`;
  }
}

function setupEventListeners() {
  const searchInput = document.getElementById('search-input');
  
  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    
    if (e.key === '/') {
      e.preventDefault();
      searchInput.focus();
    } else if (e.key === 'q') {
      window.location.hash = 'quiz';
    } else if (e.key === 'c') {
      window.location.hash = 'cheat-sheet';
    } else if (e.key === 'r') {
      revisionToggle.click();
    } else if (e.key === 'v') {
      window.location.hash = 'visualizer';
    }
  });

  searchInput.addEventListener('input', debounce((e) => {
    const queryText = e.target.value;
    const results = search.query(queryText);
    
    // Update lecture list
    renderLectures(results.lectures);
    
    // Update search status / count
    const searchStatus = document.getElementById('search-results-count');
    if (queryText.trim() === '') {
      searchStatus.innerHTML = '';
    } else {
      const totalResults = results.lectures.length + results.others.length;
      if (totalResults === 0) {
        searchStatus.innerHTML = '<span class="search-no-results">No results found across the site.</span>';
      } else {
        searchStatus.innerHTML = `Found ${results.lectures.length} lectures and ${results.others.length} other items.`;
      }
    }

    renderOtherResults(results.others);
  }, 300));

  const revisionToggle = document.getElementById('revision-mode-toggle');
  if (revisionToggle) {
    revisionToggle.addEventListener('click', () => {
      document.body.classList.toggle('revision-mode');
      const isRevision = document.body.classList.contains('revision-mode');
      revisionToggle.textContent = isRevision ? 'Standard Mode' : 'Final Night Mode';
      storage.saveRevisionMode(isRevision);
      renderLectures(search.query(searchInput.value).lectures);
    });
  }

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

  document.getElementById('reset-progress').addEventListener('click', () => {
    if (confirm('Reset all your study progress and quiz scores?')) {
      storage.resetProgress();
      location.reload();
    }
  });

  document.getElementById('quiz-next').addEventListener('click', () => {
    if (quiz.next()) {
      showQuestion();
    } else {
      finishQuiz();
    }
  });
}

function renderOtherResults(others) {
  let otherResultsDiv = document.getElementById('other-search-results');
  if (!otherResultsDiv) {
    otherResultsDiv = document.createElement('div');
    otherResultsDiv.id = 'other-search-results';
    otherResultsDiv.className = 'lecture-grid other-results-container';
    document.querySelector('.search-box').after(otherResultsDiv);
  }

  if (!others || others.length === 0) {
    otherResultsDiv.innerHTML = '';
    return;
  }

  otherResultsDiv.innerHTML = '<h3>Other Results</h3>';
  others.forEach(item => {
    const card = document.createElement('a');
    card.href = item.link;
    card.className = 'lecture-card fade-in other-result-card';
    card.innerHTML = `
      <small class="other-result-type">${item.type}</small>
      <h4 class="other-result-title">${item.title}</h4>
      <p class="other-result-desc">${item.desc}</p>
    `;
    otherResultsDiv.appendChild(card);
  });
}

function setupCommandTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const panes = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const target = tab.getAttribute('data-tab');
      document.getElementById(target).classList.add('active');
    });
  });
}

function initQuiz() {
  quiz.init();
  showQuestion();
}

function showQuestion() {
  const q = quiz.bank[quiz.currentIndex];
  document.getElementById('quiz-question').innerHTML = `<h3>Question ${quiz.currentIndex + 1}: ${q.question}</h3>`;
  const optionsDiv = document.getElementById('quiz-options');
  optionsDiv.innerHTML = '';
  
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.onclick = () => handleQuizAnswer(idx);
    optionsDiv.appendChild(btn);
  });
  
  document.getElementById('quiz-feedback').style.display = 'none';
  document.getElementById('quiz-next').style.display = 'none';
}

function handleQuizAnswer(choice) {
  const { isCorrect, explanation, explanationAr } = quiz.checkAnswer(choice);
  const feedback = document.getElementById('quiz-feedback');
  feedback.style.display = 'block';
  feedback.innerHTML = `
    <p class="${isCorrect ? 'quiz-feedback-correct' : 'quiz-feedback-wrong'}">
      ${isCorrect ? 'Correct!' : 'Wrong Answer.'}
    </p>
    <p>${explanation}</p>
    <div class="arabic-text quiz-feedback-arabic">${explanationAr}</div>
  `;
  
  const options = document.querySelectorAll('.quiz-option');
  options.forEach((opt, idx) => {
    opt.disabled = true;
    if (idx === quiz.bank[quiz.currentIndex].answer) {
      opt.classList.add('quiz-option-correct');
    } else if (idx === choice && !isCorrect) {
      opt.classList.add('quiz-option-wrong');
    }
  });
  
  document.getElementById('quiz-next').style.display = 'block';
}

function finishQuiz() {
  const score = quiz.finish();
  const container = document.getElementById('quiz-container');
  container.innerHTML = `
    <div class="quiz-finish-container">
      <h3>Quiz Finished!</h3>
      <p class="quiz-finish-score">Your Score: ${score} / ${quiz.bank.length}</p>
      <button class="btn btn-primary" onclick="location.reload()">Restart Study</button>
    </div>
  `;
  updateDashboard();
}
