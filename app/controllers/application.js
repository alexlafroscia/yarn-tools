import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { task } from "ember-concurrency-decorators";

export default class ApplicationController extends Controller {
  @service lockfile;

  @task *updateLockfile(event) {
    let source;

    if (event instanceof ClipboardEvent) {
      source = event.clipboardData.getData("text");
    } else {
      source = event.target.value;
    }

    yield this.lockfile.parse.perform(source);
  }
}
