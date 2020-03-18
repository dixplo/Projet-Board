import Route from '@ember/routing/route';

export default Route.extend({
    model(params) {
        return this.get('store').peekRecord('developer', params.dev_id);
    },
    actions: {
        closeDelete() {
            this.transitionTo('developers');
        },
        deleteForever(dev) {
            dev.destroyRecord().then(()=>this.transitionTo('developers'));
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
