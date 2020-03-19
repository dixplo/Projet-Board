import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        return RSVP.hash({
            developers: this.get('store').findAll('developer'),
            alreadyOpen: ''
        });
    },
    actions: {
        openAdd() {
            this.transitionTo('developers.add');
        },
        openEdit(model, dev) {
            if (get(model, 'alreadyOpen') != "") {
                this.disconnectOutlet(get(model, 'alreadyOpen'))
            }
            set(model, 'alreadyOpen', dev.id);            
            this.transitionTo('developers.edit', dev.id);
        },
        openDelete(model, dev) {
            if (get(model, 'alreadyOpen') != "") {
                this.disconnectOutlet(get(model, 'alreadyOpen'))
            }
            set(model, 'alreadyOpen', dev.id)
            this.transitionTo('developers.delete', dev.id);
        }
    }
});
