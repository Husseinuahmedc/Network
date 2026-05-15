import lectureContent from './lecture-content.js';
import { cheatSheetData, commandData, visualizerData } from './search-data.js';
import quiz from './quiz.js';

const search = {
  query: (text) => {
    const term = text.toLowerCase().trim();
    if (!term) return { lectures: lectureContent, others: [] };

    const lectures = lectureContent.filter(l => 
      l.title.toLowerCase().includes(term) ||
      l.englishExplanation.toLowerCase().includes(term) ||
      l.arabicExplanation.includes(term) ||
      l.terms.some(t => t.en.toLowerCase().includes(term) || t.ar.includes(term))
    );

    const others = [];

    // Search Cheat Sheet
    cheatSheetData.forEach(item => {
      if (item.topic.toLowerCase().includes(term) || item.content.toLowerCase().includes(term)) {
        others.push({ type: 'Cheat Sheet', title: item.topic, desc: item.content, link: '#cheat-sheet' });
      }
    });

    // Search Commands
    commandData.forEach(item => {
      if (item.cmd.toLowerCase().includes(term) || item.desc.toLowerCase().includes(term)) {
        others.push({ type: 'Command', title: item.cmd, desc: item.desc, link: '#commands' });
      }
    });

    // Search Quiz
    quiz.bank.forEach(item => {
      if (item.question.toLowerCase().includes(term) || item.explanation.toLowerCase().includes(term)) {
        others.push({ type: 'Quiz Question', title: 'Quiz Question', desc: item.question, link: '#quiz' });
      }
    });

    // Search Visualizers
    visualizerData.forEach(item => {
      if (item.title.toLowerCase().includes(term) || item.desc.toLowerCase().includes(term)) {
        others.push({ type: 'Visualizer', title: item.title, desc: item.desc, link: '#visualizer' });
      }
    });

    return { lectures, others };
  }
};

export default search;
