import { Promise } from 'rsvp';

const DEFAULT_NOTES = [
  {
    id: 1,
    text: 'The day starts great #daystart #morning',
    timestamp: '1558541488775',
  },
  {
    id: 2,
    text: 'Had a meeting, lots of input #meetings',
    timestamp: '1558541488775',
  },
  {
    id: 3,
    text: 'Had salad in lunch #lunch #health',
    timestamp: '1558541488775',
  },
];

const notes = [...DEFAULT_NOTES];
const notesWithTags = notes.map(note => {
  return { ...note, ...{ tags: extractTags(note.text) } };
});

function extractTags(text = '') {
  return text.match(/#[a-z]+/gi);
}

/**
 * delay in ms
 */
function getRandomDelay() {
  const maxDelay = 800;
  const minDelay = 500;
  return Math.random() * (maxDelay - minDelay) + minDelay;
}

export function fetchNotes() {
  return new Promise(resolve => {
    const delay = getRandomDelay();
    setTimeout(() => {
      resolve([...notesWithTags]);
    }, delay);
  });
}

export function addNote({ text, timestamp }) {
  return new Promise(resolve => {
    const delay = getRandomDelay();
    setTimeout(() => {
      const id = notes.length + 1;
      const note = { id, text, timestamp, tags: extractTags(text) };
      notes.push(note);
      resolve(note);
    }, delay);
  });
}
