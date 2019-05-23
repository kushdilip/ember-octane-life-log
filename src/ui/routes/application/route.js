import Route from '@ember/routing/route';
import { fetchNotes } from 'ember-octane-life-log/src/utils/notes';

export default class ApplicationRoute extends Route {
  model() {
    return fetchNotes();
  }
}
