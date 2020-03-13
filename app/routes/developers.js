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
        closeDelete(dev) {
            dev.set('viewDelete', false)
        },
        openDelete(dev) {
            dev.set('viewDelete', true)
        }
    }
});
