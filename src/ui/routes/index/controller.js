import Controller from '@ember/controller';
import { action } from '@ember/object';
import { addNote } from 'ember-octane-life-log/src/utils/notes';
import { tracked } from '@glimmer/tracking';

const KEYCODES = {
  ENTER: 13,
};

export default class IndexController extends Controller {
  @tracked
  inputValue = '';

  @action addNote(event) {
    const {
      keyCode,
      target: { value },
    } = event;

    if (keyCode === KEYCODES.ENTER && value) {
      const timestamp = new Date().getTime();
      addNote({ text: value, timestamp }).then(note => {
        this.notes.unshiftObject(note);
        this.inputValue = '';
      });
    }
  }
}
