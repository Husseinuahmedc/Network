import lectureContent from './lecture-content.js';
import { cheatSheetData, commandData, visualizerData } from './search-data.js';
import quiz from './quiz.js';

function topicSearchBlob(topic) {
  return [
    topic.title,
    topic.overviewEn,
    topic.overviewAr,
    topic.concept.en,
    topic.concept.ar,
    topic.whyItMatters.en,
    topic.whyItMatters.ar,
    topic.howItWorks.en,
    topic.howItWorks.ar,
    ...(topic.tags || []),
    ...(topic.keyIdeas || []).flatMap((idea) => [idea.en, idea.ar]),
    ...(topic.example?.steps || []).flatMap((step) => [step.en, step.ar]),
    ...(topic.commands || []).flatMap((command) => [command.cmd, command.desc]),
    ...(topic.mistakes || []).flatMap((mistake) => [mistake.title, mistake.detail, mistake.ar]),
    ...(topic.examQuestions || []).flatMap((question) => [question.question, question.answer]),
    ...(topic.compare?.rows || []).flatMap((row) => row)
  ].join(' ').toLowerCase();
}

const search = {
  query: (text) => {
    const term = text.toLowerCase().trim();
    if (!term) {
      return { lectures: lectureContent, others: [] };
    }

    const lectures = lectureContent.filter((topic) => topicSearchBlob(topic).includes(term));
    const others = [];

    cheatSheetData.forEach((item) => {
      if (`${item.topic} ${item.content}`.toLowerCase().includes(term)) {
        others.push({ type: 'Exam Note', title: item.topic, desc: item.content, link: item.link });
      }
    });

    commandData.forEach((item) => {
      if (`${item.cmd} ${item.desc} ${item.category}`.toLowerCase().includes(term)) {
        others.push({ type: 'CLI Command', title: item.cmd, desc: item.desc, link: item.link });
      }
    });

    visualizerData.forEach((item) => {
      if (`${item.title} ${item.desc}`.toLowerCase().includes(term)) {
        others.push({ type: 'Visual Step', title: item.title, desc: item.desc, link: item.link });
      }
    });

    quiz.bank.forEach((item) => {
      if (`${item.question} ${item.explanation} ${item.explanationAr}`.toLowerCase().includes(term)) {
        others.push({ type: 'Quiz', title: item.question, desc: item.explanation, link: '#quiz' });
      }
    });

    return { lectures, others };
  }
};

export default search;
