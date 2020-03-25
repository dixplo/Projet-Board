import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

export default Route.extend({
    actions: {
        backToDeveloper(model) {
            this.transitionTo('developers');
            set(model, 'name', '')
            set(model, 'fname', '')
        },
        save(model) {
            let dev = this.get('store').createRecord('developer', { name: get(model, 'name'), fname: get(model, 'fname') });
            dev.save();
            this.transitionTo('developers')
            set(model, 'name', '')
            set(model, 'fname', '')
        }
    }
});
