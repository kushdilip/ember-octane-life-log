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
    return this.notes
      .reduce((allTags, note) => {
        return [...allTags, ...note.tags];
      }, [])
      .uniq();
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
