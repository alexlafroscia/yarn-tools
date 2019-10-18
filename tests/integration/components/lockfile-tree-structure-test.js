import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | lockfile-tree-structure", function(hooks) {
  setupRenderingTest(hooks);

  test("rendering basic information", async function(assert) {
    this.set("lockfile", {
      foo: { version: "1.0.0" }
    });

    await render(hbs`
      <LockfileTreeStructure @lockfile={{this.lockfile}} />
    `);

    assert
      .dom("[data-test-dependency-identifier]")
      .hasText("foo", "Shows the name of the dependency");
    assert
      .dom("[data-test-version]")
      .hasText("1.0.0", "Displays the installed version");
  });
});
