import InstalledController from "./installed";

export default class IndexController extends InstalledController {
  get totalDependencyCount() {
    return Object.entries(this.lockfile.parsedValue).length;
  }

  get installedDependencyCount() {
    return Object.entries(this.installedDependencies).length;
  }
}
