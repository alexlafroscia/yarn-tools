import Controller from "@ember/controller";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

export default class IndexController extends Controller {
  @service lockfile;

  @computed("lockfile.parsedValue")
  get dependencyCount() {
    return Object.entries(this.lockfile.parsedValue).length;
  }
}
