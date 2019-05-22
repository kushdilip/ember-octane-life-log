import Route from '@ember/routing/route';
import { fetchNotes } from 'ember-octane-life-log/src/utils/notes';

export default class IndexRoute extends Route {
  model() {
    return fetchNotes();
  }

  setupController(controller, model) {
    controller.notes = model;
  }
}
