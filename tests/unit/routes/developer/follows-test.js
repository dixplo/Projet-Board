import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | developer/follows', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:developer/follows');
    assert.ok(route);
  });
});
