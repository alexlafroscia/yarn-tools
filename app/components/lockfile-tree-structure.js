import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class LockfileTreeStructureComponent extends Component {
  @tracked filter = "";

  get entries() {
    return Object.entries(this.args.lockfile).filter(([key]) =>
      key.includes(this.filter)
    );
  }

  @action updateInput(event) {
    this.filter = event.target.value;
  }
}
