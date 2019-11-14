import Service from "@ember/service";
import { task } from "ember-concurrency-decorators";

const HEADER =
  "# THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.";

function normalizeLockfile(raw) {
  return raw.replace(HEADER, "").trim();
}

export default class LockfileService extends Service {
  get parsedValue() {
    return this.parse.last?.value;
  }

  get parsingError() {
    return this.parse.last?.error;
  }

  @task *parse(raw) {
    const { parse: parseLockfile } = yield import("@yarnpkg/lockfile");
    const normalized = normalizeLockfile(raw);

    const result = parseLockfile(normalized);

    if (result.type === "success") {
      return result.object;
    }

    throw new Error("Unexpected `type` in lockfile parsing result");
  }
}
