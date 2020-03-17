import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

export default Route.extend({
    model() {
        return this.get('store').findAll('developer');
    },
    actions: {
        addDeveloper() {
            this.transitionTo('developers.add');
        },
        openEdit(dev) {
            this.transitionTo('developers.edit', dev.id);
        },
        openDelete(dev) {
            this.transitionTo('developers.delete', dev.id);
        }
    }
});
