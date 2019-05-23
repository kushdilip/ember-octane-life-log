import Component from '@glimmer/component';
import { computed } from '@ember/object';

export default class NoteComponent extends Component {
  @computed('@content.timestamp')
  get datetime() {
    return new Date(+this.args.content.timestamp).toLocaleString();
  }
}
