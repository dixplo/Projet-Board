import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | developers/add', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:developers/add');
    assert.ok(route);
  });
});
