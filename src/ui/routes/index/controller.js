import Controller from '@ember/controller';
import { action } from '@ember/object';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { addNote } from 'ember-octane-life-log/src/utils/notes';
import { tracked } from '@glimmer/tracking';

const KEYCODES = {
  ENTER: 13,
};

export default class IndexController extends Controller {
  @alias('model') notes;

  @tracked isLoading = false;
  @tracked inputValue = '';

  @computed('notes.@each.text')
  get allTags() {
    const tagsMap = this.notes
      .reduce((allTags, note) => {
        return [...allTags, ...note.tags];
      }, [])
      .reduce((tagMap, tag) => {
        return tagMap.has(tag) ? tagMap.set(tag, tagMap.get(tag) + 1) : tagMap.set(tag, 1);
      }, new Map());

    const allTags = Array.from(tagsMap.entries()).map(tag => ({ value: tag[0], notesCount: tag[1] }));
    return allTags;
  }

  focusInput(element) {
    element.focus();
  }

  @action addNote(event) {
    const {
      keyCode,
      target: { value },
    } = event;

    if (keyCode === KEYCODES.ENTER && value) {
      const timestamp = new Date().getTime();
      this.isLoading = true;
      addNote({ text: value, timestamp }).then(note => {
        this.notes.unshiftObject(note);
        this.inputValue = '';
        this.isLoading = false;
      });
    }
  }
}
