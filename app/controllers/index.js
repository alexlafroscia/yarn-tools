import { computed } from "@ember/object";

import InstalledController from "./installed";

export default class IndexController extends InstalledController {
  @computed("lockfile.parsedValue")
  get totalDependencyCount() {
    return Object.entries(this.lockfile.parsedValue).length;
  }

  @computed("installedDependencies")
  get installedDependencyCount() {
    return Object.entries(this.installedDependencies).length;
  }
}
