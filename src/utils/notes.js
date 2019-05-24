import { Promise } from 'rsvp';
import { later } from '@ember/runloop';

const DEFAULT_NOTES = [
  {
    id: 1,
    text: 'The day starts great #daystart #morning',
    timestamp: '1558541488775',
  },
  {
    id: 2,
    text: 'Had a meeting, lots of inputs, missed lunch #meetings #lunch',
    timestamp: '1558541488775',
  },
  {
    id: 3,
    text: 'Had salad in lunch #lunch #health',
    timestamp: '1558541488775',
  },
];

const _notes = [...DEFAULT_NOTES];
const allNotes = _notes.map(note => {
  return { ...note, ...{ tags: extractTags(note.text) } };
});

function extractTags(text = '') {
  return text.match(/#[a-z]+/gi).map(tag => tag.slice(1));
}

/**
 * delay in ms
 */
function getRandomDelay(min = 300, max = min + 200) {
  if (min > max) {
    throw new Error('max delay cannot be less than min');
  }
  return Math.random() * (max - min) + min;
}

export function fetchNotes() {
  return new Promise(resolve => {
    const delay = getRandomDelay();
    later(() => {
      resolve([...allNotes])
    }, delay);
  });
}

export function fetchNotesByTagName(tagname) {
  return fetchNotes().then(notes => {
    return notes.filter(note => note.tags.includes(tagname));
  });
}

export function addNote({ text, timestamp }) {
  return new Promise(resolve => {
    const delay = getRandomDelay();
    setTimeout(() => {
      const id = allNotes.length + 1;
      const tags = extractTags(text).uniq();
      const note = { id, text, timestamp, tags };
      allNotes.push(note);
      resolve(note);
    }, delay);
  });
}
