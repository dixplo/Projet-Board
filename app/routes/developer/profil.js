import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    async model() {
        let devloperId = this.paramsFor("developer").developer_id;
        let developer = await this.get('store').findRecord('developer', devloperId)
        debugger
        return RSVP.hash({
            developer: developer
        });


    }
});
