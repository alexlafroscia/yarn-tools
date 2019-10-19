import { module, test } from "qunit";
import { assembleVersion, parseVersion } from "yarn-tools/utils/version-utils";

module("Unit | Utility | version-utils", function() {
  module("assembleVersion", function() {
    test("it creates a package identifier", function(assert) {
      const dependency = assembleVersion("foo-bar", "1.0.0");

      assert.equal(dependency, "foo-bar@1.0.0", "Creates the right identifier");
    });
  });

  module("parseVersion", function() {
    test("it handles a dependency with a scope", function(assert) {
      const [name, version] = parseVersion("@foo/bar@1.0.0");

      assert.equal(name, "@foo/bar", "Parses out the name");
      assert.equal(version, "1.0.0", "Parses out the version");
    });

    test("it handles a dependency without a scope", function(assert) {
      const [name, version] = parseVersion("foo-bar@1.0.0");

      assert.equal(name, "foo-bar", "Parses out the name");
      assert.equal(version, "1.0.0", "Parses out the version");
    });
  });
});
