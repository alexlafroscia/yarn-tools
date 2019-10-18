import { helper } from "@ember/component/helper";

export default helper(function objectEntries([object]) {
  return Object.entries(object);
});
