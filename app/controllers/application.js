import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { task, lastValue } from "ember-concurrency-decorators";

export default class ApplicationController extends Controller {
  @service lockfile;

  @lastValue("updateLockfile") parsedValue;

  @task *updateLockfile(event) {
    let source;

    if (event instanceof ClipboardEvent) {
      source = event.clipboardData.getData("text");
    } else {
      source = event.target.value;
    }

    return yield this.lockfile.parse.perform(source);
  }
}
