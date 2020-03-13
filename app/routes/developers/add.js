import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import Developer from 'td4/models/developer';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        return RSVP.hash({
            title: "Add developer"
        });
    },
    actions: {
        backToDeveloper(model) {
            this.transitionTo('developers');
            set(model, 'name', '')
            set(model, 'fname', '')
        },
        save(model) {
            this.get('store').createRecord('developer', {name: get(model, 'name'), fname: get(model, 'fname')});
        }
    }
});
