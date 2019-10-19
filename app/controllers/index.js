import Controller from "@ember/controller";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import { assembleVersion, parseVersion } from "../utils/version-utils";

export default class IndexController extends Controller {
  @service lockfile;

  @computed("lockfile.parsedValue")
  get installedDependencies() {
    return Object.entries(this.lockfile.parsedValue).reduce(
      (acc, [key, value]) => {
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
      },
      {}
    );
  }
}
