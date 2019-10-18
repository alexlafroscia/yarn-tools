import Controller from "@ember/controller";
import { reads } from "@ember/object/computed";
import { inject as service } from "@ember/service";
import { task } from "ember-concurrency-decorators";

export default class ApplicationController extends Controller {
  @service lockfile;

  @reads("updateLockfile.last.value") parsedValue;
  @reads("updateLockfile.last.error") parsingError;

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
