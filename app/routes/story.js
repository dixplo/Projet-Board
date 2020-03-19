import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
    async model(params) {
        let stories = this.get('store').query('story', {
            filter: {
                project: params.project_id
            }
        })
        
        return RSVP.hash({
            stories: stories
        });
    },
    actions: {
    }
});
