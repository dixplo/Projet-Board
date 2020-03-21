import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | project/story/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:project/story/edit');
    assert.ok(route);
  });
});
