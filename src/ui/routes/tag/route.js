import Route from '@ember/routing/route';
import { fetchNotesByTagName } from '../../../utils/notes';

export default class TagRoute extends Route {
  model(params) {
    this.tagname = params.tagname;
    return fetchNotesByTagName(params.tagname)
  }

  setupController(controller) {
    controller.tagname = this.tagname;
    super.setupController(...arguments);
  }
}
