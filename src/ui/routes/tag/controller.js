import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';

export default class TagController extends Controller {
  @tracked tagname;
  @alias('model') notes;
}
