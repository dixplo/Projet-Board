import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

export default Route.extend({
    async model(params) {
        console.log(params.dev_id);

        if (params.dev_id != null) {
            let dev = await this.get('store').findRecord('developer', params.dev_id)

            console.log(dev.fullName)
            return dev;
        } else {
            return {};
        }
    },
    actions: {
        backToDeveloper(model) {
            this.transitionTo('developers');
            set(model, 'name', '')
            set(model, 'fname', '')
        },
        save(model) {
            console.log(model)
            if (get(model, 'fullName') != null) {

            } else {
                let dev = this.get('store').createRecord('developer', { name: get(model, 'name'), fname: get(model, 'fname') });
                dev.save();
                this.transitionTo('developers')
                set(model, 'name', '')
                set(model, 'fname', '')
            }
        }
    }
});
