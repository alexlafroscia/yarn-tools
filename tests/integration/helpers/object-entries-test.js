import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Helper | object-entries", function(hooks) {
  setupRenderingTest(hooks);

  test("it enumerates the key-value pairs of an object", async function(assert) {
    this.set("inputValue", { foo: "foo", bar: "var" });

    await render(hbs`
      <ul>
        {{#each (object-entries inputValue) as |entry|}}
          {{#let (object-at 0 entry) (object-at 1 entry) as |key value|}}
            <li>{{key}}: {{value}}</li>
          {{/let}}
        {{/each}}
      </ul>
    `);

    assert.dom("li").exists({ count: 2 });
  });
});
