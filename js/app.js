import lectureContent from './lecture-content.js';
import storage from './storage.js';
import search from './search.js';
import quiz from './quiz.js';
import visualizer from './visualizer.js';

document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
  const isExamMode = storage.getRevisionMode();
  if (isExamMode) {
    document.body.classList.add('revision-mode');
  }

  updateModeButton();
  document.getElementById('total-lectures').textContent = `${lectureContent.length} Topics`;

  renderLectures(lectureContent);
  renderCommonMistakes();
  renderCheatSheet();
  renderCommands();
  renderTopQuestions();
  updateDashboard();
  setupEventListeners();

  visualizer.renderPacketPath('packet-path-viz');
  visualizer.renderLongestPrefixMatch('lpm-viz');
  visualizer.renderRoutingTable('routing-table-viz');
  visualizer.renderVlanTag('vlan-tag-viz');
  visualizer.renderMacLearning('mac-learning-viz');
  visualizer.renderRipHop('rip-hop-viz');
  visualizer.renderOspfProcess('ospf-process-viz');

  initQuiz();
}

function updateModeButton() {
  const toggle = document.getElementById('revision-mode-toggle');
  if (!toggle) return;
  toggle.textContent = document.body.classList.contains('revision-mode') ? 'Study Mode' : 'Exam Mode';
}

function renderLectures(content) {
  const lectureList = document.getElementById('lecture-list');
  lectureList.innerHTML = '';

  if (!content.length) {
    lectureList.innerHTML = '<div class="topic-card empty-state"><h3>No topics matched the search.</h3><p>Try a protocol name, formula, Arabic term, or CLI command.</p></div>';
    return;
  }

  const progress = storage.getProgress();
  const isExamMode = document.body.classList.contains('revision-mode');

  content.forEach((topic) => {
    const studied = progress[topic.id] === 'completed';
    const card = document.createElement('article');
    card.className = `topic-card fade-in ${isExamMode ? 'topic-card-exam' : ''}`;
    card.id = topic.id;

    card.innerHTML = isExamMode ? renderExamCard(topic, studied) : renderStudyCard(topic, studied);

    bindTopicActions(card, topic.id);
    lectureList.appendChild(card);
  });
}

function renderStudyCard(topic, studied) {
  return `
    <div class="topic-header">
      <div>
        <p class="topic-kicker">Topic ${topic.lectureNo}</p>
        <h3>${topic.title}</h3>
      </div>
      <span class="priority priority-${topic.priority.toLowerCase()}">${topic.priority}</span>
    </div>
    <p class="topic-overview">${topic.overviewEn}</p>
    <p class="arabic-text topic-overview-ar">${topic.overviewAr}</p>

    <div class="topic-grid">
      ${renderInfoPanel('Concept', topic.concept.en, topic.concept.ar)}
      ${renderInfoPanel('Why It Matters', topic.whyItMatters.en, topic.whyItMatters.ar)}
      ${renderInfoPanel('How It Works', topic.howItWorks.en, topic.howItWorks.ar)}
    </div>

    <div class="key-idea-list">
      ${topic.keyIdeas
        .map(
          (idea) => `
            <div class="key-idea-card">
              <p>${idea.en}</p>
              <p class="arabic-text">${idea.ar}</p>
            </div>
          `
        )
        .join('')}
    </div>

    ${renderMemorizeBlock(topic)}
    ${renderQuestionStyleBlock(topic)}

    <div class="detail-section">
      <div class="section-title-row">
        <h4>Step-by-Step Example</h4>
        <span>${topic.example.title}</span>
      </div>
      <div class="example-steps">
        ${topic.example.steps
          .map(
            (step, index) => `
              <div class="example-step">
                <div class="example-index">${index + 1}</div>
                <div>
                  <p>${step.en}</p>
                  <p class="arabic-text">${step.ar}</p>
                </div>
              </div>
            `
          )
          .join('')}
      </div>
    </div>

    <div class="detail-section">
      <h4>CLI Commands</h4>
      <div class="command-list">
        ${topic.commands
          .map((command) => renderCommandBlock(command))
          .join('')}
      </div>
    </div>

    <div class="detail-section">
      <h4>Common Mistakes</h4>
      <div class="mistakes-inline">
        ${topic.mistakes
          .map(
            (mistake) => `
              <article class="mistake-item">
                <h5>${mistake.title}</h5>
                <p>${mistake.detail}</p>
                <p class="arabic-text">${mistake.ar}</p>
              </article>
            `
          )
          .join('')}
      </div>
    </div>

    <div class="detail-section">
      <h4>Exam Questions</h4>
      <div class="question-list">
        ${topic.examQuestions
          .map(
            (question, index) => `
              <details class="qa-item">
                <summary>Q${index + 1}. ${question.question}</summary>
                <p>${question.answer}</p>
              </details>
            `
          )
          .join('')}
      </div>
    </div>

    <div class="topic-actions">
      <button class="btn ${studied ? 'completed' : 'btn-secondary'} mark-studied-btn" data-id="${topic.id}">
        ${studied ? '✓ Studied' : 'Mark as studied'}
      </button>
      <a class="btn btn-ghost" href="#cheat-sheet">Exam Table</a>
    </div>
  `;
}

function renderExamCard(topic, studied) {
  return `
    <div class="topic-header">
      <div>
        <p class="topic-kicker">Topic ${topic.lectureNo}</p>
        <h3>${topic.title}</h3>
      </div>
      <span class="priority priority-${topic.priority.toLowerCase()}">${topic.priority}</span>
    </div>
    <div class="exam-mode-grid">
      ${renderInfoPanel('Definition', topic.concept.en, topic.concept.ar)}
      ${renderInfoPanel('Fast Recall', topic.keyIdeas[0].en, topic.keyIdeas[0].ar)}
      <div class="info-panel">
        <h4>Compare / Formula</h4>
        <div class="mini-table">
          ${topic.compare.rows
            .slice(0, 3)
            .map(
              (row) => `
                <div class="mini-table-row">
                  <span>${row[0]}</span>
                  <strong>${row.slice(1).join(' / ')}</strong>
                </div>
              `
            )
            .join('')}
        </div>
      </div>
      <div class="info-panel">
        <h4>Memorize</h4>
        <div class="mini-command-list">
          ${(topic.memorize || topic.keyIdeas.map((idea) => idea.en))
            .slice(0, 3)
            .map((item) => `<code>${item}</code>`)
            .join('')}
        </div>
      </div>
    </div>
    <div class="exam-mode-footer">
      <p><strong>Common mistake:</strong> ${topic.mistakes[0].detail}</p>
      <p><strong>Final question:</strong> ${topic.examQuestions[0].question}</p>
    </div>
    <div class="topic-actions">
      <button class="btn ${studied ? 'completed' : 'btn-secondary'} mark-studied-btn" data-id="${topic.id}">
        ${studied ? '✓ Reviewed' : 'Mark as reviewed'}
      </button>
    </div>
  `;
}

function renderMemorizeBlock(topic) {
  if (!topic.memorize?.length) return '';

  return `
    <div class="detail-section exam-memory-block">
      <h4>What to Memorize for Exam</h4>
      <ul>
        ${topic.memorize.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `;
}

function renderQuestionStyleBlock(topic) {
  if (!topic.questionStyles?.length) return '';

  return `
    <div class="detail-section question-style-block">
      <h4>Common Final Question Style</h4>
      <div class="question-style-grid">
        ${topic.questionStyles
          .map(
            (item) => `
              <article class="question-style-card">
                <span>${item.type}</span>
                <p>${item.prompt}</p>
              </article>
            `
          )
          .join('')}
      </div>
    </div>
  `;
}

function renderInfoPanel(title, en, ar) {
  return `
    <section class="info-panel">
      <h4>${title}</h4>
      <p>${en}</p>
      <p class="arabic-text">${ar}</p>
    </section>
  `;
}

function renderCommandBlock(command) {
  return `
    <div class="command-block">
      <div class="cmd-line">${command.cmd}</div>
      <div class="cmd-desc">${command.desc}</div>
      ${command.solves ? `<p><strong>Problem:</strong> ${command.solves}</p>` : ''}
      ${command.output ? `<p><strong>Expected output:</strong> ${command.output}</p>` : ''}
      ${command.exam ? `<p><strong>Exam-important:</strong> ${command.exam}</p>` : ''}
      ${command.optional ? '<span class="optional-lab-badge">Optional lab / practical</span>' : ''}
    </div>
  `;
}

function bindTopicActions(card, topicId) {
  const studyBtn = card.querySelector('.mark-studied-btn');
  if (!studyBtn) return;

  studyBtn.addEventListener('click', () => {
    const isCompleted = studyBtn.classList.contains('completed');
    storage.saveProgress(topicId, isCompleted ? 'pending' : 'completed');
    renderLectures(search.query(document.getElementById('search-input').value).lectures);
    updateDashboard();
  });
}

function renderCommonMistakes() {
  const container = document.getElementById('common-mistakes-grid');
  const items = lectureContent.flatMap((topic) =>
    topic.mistakes.map((mistake) => ({
      title: `${topic.lectureNo}. ${mistake.title}`,
      detail: mistake.detail,
      ar: mistake.ar
    }))
  );

  container.innerHTML = items
    .map(
      (item) => `
        <article class="mistake-card">
          <h4>${item.title}</h4>
          <p>${item.detail}</p>
          <p class="arabic-text">${item.ar}</p>
        </article>
      `
    )
    .join('');
}

function renderTopQuestions() {
  const container = document.getElementById('top-questions-container');
  const questions = lectureContent.flatMap((topic) =>
    topic.examQuestions.map((question) => ({
      topic: topic.title,
      question: question.question,
      answer: question.answer
    }))
  );

  container.innerHTML = questions
    .map(
      (item, index) => `
        <details class="final-question-card">
          <summary>Q${index + 1}. ${item.question}</summary>
          <p class="question-topic">${item.topic}</p>
          <p>${item.answer}</p>
        </details>
      `
    )
    .join('');
}

function renderCheatSheet() {
  const summary = document.getElementById('cheat-sheet-summary');
  summary.innerHTML = `
    <div class="exam-summary-card">
      <h3>Definitions</h3>
      <p>Last-hour pass: definitions first, then differences, then formulas and process steps.</p>
    </div>
    <div class="exam-summary-card">
      <h3>Compare Tables</h3>
      <p>Focus on routing vs forwarding, service models, switching methods, static/dynamic, RIP/OSPF, and VLAN links.</p>
    </div>
    <div class="exam-summary-card">
      <h3>Processes</h3>
      <p>Be ready to write ordered steps for longest prefix match, RIP updates, OSPF LSDB/SPF, and 802.1Q tagging.</p>
    </div>
  `;

  const container = document.getElementById('cheat-sheet-grid');
  container.innerHTML = lectureContent
    .map(
      (topic) => `
        <article class="comparison-card">
          <h4>${topic.compare.title}</h4>
          ${renderMemorizeBlock(topic)}
          <div class="table-responsive">
            <table>
              <thead>
                <tr>${topic.compare.columns.map((column) => `<th>${column}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${topic.compare.rows
                  .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`)
                  .join('')}
              </tbody>
            </table>
          </div>
          ${renderQuestionStyleBlock(topic)}
        </article>
      `
    )
    .join('');
}

function renderCommands() {
  const topics = [
    { id: 'verification', label: 'Verification', match: () => true },
    { id: 'rip', label: 'RIP', match: (topic) => topic.id === 'rip' },
    { id: 'ospf', label: 'OSPF', match: (topic) => topic.id === 'ospf' },
    { id: 'vlan', label: 'VLAN', match: (topic) => topic.id === 'vlan' },
    { id: 'switching', label: 'Switching', match: (topic) => topic.id === 'routing-packets' || topic.id === 'router-forwarding-process' }
  ];

  const tabs = document.getElementById('command-tabs');
  const panes = document.getElementById('command-panes');

  tabs.innerHTML = topics
    .map(
      (topic, index) => `
        <button class="tab-btn ${index === 0 ? 'active' : ''}" data-tab="${topic.id}">${topic.label}</button>
      `
    )
    .join('');

  panes.innerHTML = topics
    .map((tab, index) => {
      const commands = lectureContent
        .filter((topic) => tab.match(topic))
        .flatMap((topic) =>
          topic.commands.map(
            (command) => renderCommandBlock(command)
          )
        )
        .join('');

      return `
        <div class="tab-pane ${index === 0 ? 'active' : ''}" id="${tab.id}">
          ${commands}
        </div>
      `;
    })
    .join('');

  setupCommandTabs();
}

function setupCommandTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const panes = document.querySelectorAll('.tab-pane');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((item) => item.classList.remove('active'));
      panes.forEach((pane) => pane.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });
}

function updateDashboard() {
  const progress = storage.getProgress();
  const completeCount = lectureContent.filter((topic) => progress[topic.id] === 'completed').length;
  const total = lectureContent.length;
  const percentage = Math.round((completeCount / total) * 100);
  document.getElementById('progress-val').textContent = `${percentage}%`;

  const scores = storage.getQuizScores();
  document.getElementById('high-score').textContent = scores.length
    ? `${Math.max(...scores.map((score) => score.score))} / ${quiz.bank.length}`
    : '--';
}

function setupEventListeners() {
  const searchInput = document.getElementById('search-input');
  const revisionToggle = document.getElementById('revision-mode-toggle');

  document.addEventListener('keydown', (event) => {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;

    if (event.key === '/') {
      event.preventDefault();
      searchInput.focus();
    }
  });

  searchInput.addEventListener(
    'input',
    debounce((event) => {
      const results = search.query(event.target.value);
      renderLectures(results.lectures);
      renderOtherResults(results.others);

      const searchStatus = document.getElementById('search-results-count');
      if (!event.target.value.trim()) {
        searchStatus.textContent = '';
      } else {
        searchStatus.textContent = `${results.lectures.length} topics and ${results.others.length} extra results found.`;
      }
    }, 250)
  );

  revisionToggle.addEventListener('click', () => {
    document.body.classList.toggle('revision-mode');
    storage.saveRevisionMode(document.body.classList.contains('revision-mode'));
    updateModeButton();
    renderLectures(search.query(searchInput.value).lectures);
  });

  document.getElementById('reset-progress').addEventListener('click', () => {
    if (window.confirm('Reset study progress and quiz score history?')) {
      storage.resetProgress();
      window.location.reload();
    }
  });

  document.getElementById('quiz-next').addEventListener('click', () => {
    if (quiz.next()) {
      showQuestion();
    } else {
      finishQuiz();
    }
  });

  document.getElementById('quiz-restart').addEventListener('click', () => {
    initQuiz();
  });
}

function renderOtherResults(others) {
  let resultsBox = document.getElementById('other-search-results');
  if (!resultsBox) {
    resultsBox = document.createElement('div');
    resultsBox.id = 'other-search-results';
    resultsBox.className = 'other-results';
    document.querySelector('.search-box').after(resultsBox);
  }

  if (!others.length) {
    resultsBox.innerHTML = '';
    return;
  }

  resultsBox.innerHTML = `
    <h3>Other Results</h3>
    <div class="other-results-grid">
      ${others
        .slice(0, 12)
        .map(
          (item) => `
            <a href="${item.link}" class="other-result-card">
              <small>${item.type}</small>
              <h4>${item.title}</h4>
              <p>${item.desc}</p>
            </a>
          `
        )
        .join('')}
    </div>
  `;
}

function initQuiz() {
  quiz.init();
  document.getElementById('quiz-restart').style.display = 'none';
  showQuestion();
}

function showQuestion() {
  const current = quiz.bank[quiz.currentIndex];
  document.getElementById('quiz-question').innerHTML = `
    <p class="quiz-kicker">Question ${quiz.currentIndex + 1} of ${quiz.bank.length}</p>
    <h3>${current.question}</h3>
  `;

  const options = document.getElementById('quiz-options');
  options.innerHTML = '';
  current.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'quiz-option';
    button.textContent = option;
    button.addEventListener('click', () => handleQuizAnswer(index));
    options.appendChild(button);
  });

  const feedback = document.getElementById('quiz-feedback');
  feedback.style.display = 'none';
  feedback.innerHTML = '';
  document.getElementById('quiz-next').style.display = 'none';
}

function handleQuizAnswer(choice) {
  const result = quiz.checkAnswer(choice);
  if (!result) return;

  const feedback = document.getElementById('quiz-feedback');
  feedback.style.display = 'block';
  feedback.innerHTML = `
    <p class="${result.isCorrect ? 'quiz-feedback-correct' : 'quiz-feedback-wrong'}">
      ${result.isCorrect ? 'Correct answer.' : 'Incorrect answer.'}
    </p>
    <p>${result.explanation}</p>
    <p class="arabic-text quiz-feedback-arabic">${result.explanationAr}</p>
  `;

  const optionButtons = document.querySelectorAll('.quiz-option');
  optionButtons.forEach((button, index) => {
    button.disabled = true;
    if (index === result.correctIndex) {
      button.classList.add('quiz-option-correct');
    } else if (index === choice) {
      button.classList.add('quiz-option-wrong');
    }
  });

  document.getElementById('quiz-next').style.display = 'inline-flex';
}

function finishQuiz() {
  const score = quiz.finish();
  document.getElementById('quiz-container').innerHTML = `
    <div class="quiz-finish-container">
      <h3>Quiz Finished</h3>
      <p class="quiz-finish-score">${score} / ${quiz.bank.length}</p>
      <p>Use the explanations to review weak areas, then restart for another shuffled pass.</p>
      <button id="quiz-restart-inline" class="btn btn-primary">Restart Quiz</button>
    </div>
  `;

  document.getElementById('quiz-restart-inline').addEventListener('click', () => {
    document.getElementById('quiz-container').innerHTML = `
      <div id="quiz-question"></div>
      <div id="quiz-options"></div>
      <div id="quiz-feedback"></div>
      <div class="quiz-controls">
        <button id="quiz-next" class="btn btn-primary">Next Question</button>
        <button id="quiz-restart" class="btn btn-ghost">Restart</button>
      </div>
    `;
    setupEventListenersAfterQuizReset();
    initQuiz();
  });

  updateDashboard();
}

function setupEventListenersAfterQuizReset() {
  document.getElementById('quiz-next').addEventListener('click', () => {
    if (quiz.next()) {
      showQuestion();
    } else {
      finishQuiz();
    }
  });

  document.getElementById('quiz-restart').addEventListener('click', () => {
    initQuiz();
  });
}

function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
