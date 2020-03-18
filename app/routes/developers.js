import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        return RSVP.hash({
            developers: this.get('store').findAll('developer'),
            alreadyOpen: true
        });
    },
    actions: {
        openAdd() {
            this.transitionTo('developers.add');
        },
        openEdit(dev) {
            this.transitionTo('developers.edit', dev.id);
        },
        openDelete(model, dev) {
            /*if (get(model, 'alreadyOpen')) {
                debugger
            }
            debugger*/
            this.transitionTo('developers.delete', dev.id);
        }
    }
});
