import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import RSVP from 'rsvp'

export default Route.extend({
    async model(params) {
        let dev = await this.get('store').peekRecord('developer', params.dev_id)
        let nom = dev.get('name');
        let r = RSVP.hash({
            dev: dev,
            name: nom,
            fname: dev.get('fname')
        });
        console.log(r);

        return r;
    },
    actions: {
        backToDeveloper(model) {
            this.transitionTo('developers');
            set(model, 'name', '')
            set(model, 'fname', '')
        },
        save(model) {
            console.log("update");
            model.save();
            this.transitionTo('developers')
            set(model, 'name', '')
            set(model, 'fname', '')
        }
    }
});
