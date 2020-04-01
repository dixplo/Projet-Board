import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | profil', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:profil');
    assert.ok(route);
  });
});
