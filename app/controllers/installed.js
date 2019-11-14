import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { assembleVersion, parseVersion } from "../utils/version-utils";

export default class InstalledController extends Controller {
  @service lockfile;
  @tracked filter = "";

  get installedDependencies() {
    const filter = this.filter.toLowerCase();

    return Object.entries(this.lockfile.parsedValue)
      .filter(([key]) => key.toLowerCase().indexOf(filter) > -1)
      .reduce((acc, [key, value]) => {
        const [name] = parseVersion(key);
        const installedVersion = assembleVersion(name, value.version);

        if (!acc[installedVersion]) {
          return {
            ...acc,
            [installedVersion]: {
              version: value.version,
              packages: [key]
            }
          };
        }

        const def = acc[installedVersion];

        return {
          ...acc,
          [installedVersion]: { ...def, packages: [...def.packages, key] }
        };
      }, {});
  }

  @action updateFilter(event) {
    this.filter = event.target.value;
  }
}
