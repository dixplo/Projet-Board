import Route from '@ember/routing/route';
import developers from '../developers';

export default Route.extend({
    model(params) {
        return this.get('store').peekRecord('developer', params.dev_id);
    },
    actions: {
        closeDelete() {
            this.transitionTo('developers');
        },
        deleteForever(dev) {
            let developer = this.get('store').peekRecord('developer', dev.id);
            developer.destroyRecord(); // => DELETE to /posts/2
        }
    }
});
