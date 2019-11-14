import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class ApplicationController extends Controller {
  @service lockfile;

  @action updateLockfile(event) {
    let source;

    if (event instanceof ClipboardEvent) {
      source = event.clipboardData.getData("text");
    } else {
      source = event.target.value;
    }

    try {
      this.lockfile.parse.perform(source);
    } catch (e) {
      // Error shown in UI
    }
  }
}
