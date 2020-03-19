import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

export default Route.extend({
    model(params) {
        return this.get('store').peekRecord('developer', params.dev_id);
    },
    actions: {
        closeDelete() {
            set(this.modelFor('developers'), 'alreadyOpen', ""); 
            this.transitionTo('developers');
        },
        deleteForever(dev) {
            dev.destroyRecord().then(()=> {
                set(this.modelFor('developers'), 'alreadyOpen', ""); 
                this.transitionTo('developers');
            });
        }
    },
    renderTemplate(model) {
        this.render('developers.delete', {
            into: 'developers',
            outlet: model.model.id,
            view: 'developers.delete'
        });
    }
});
