import Route from '@ember/routing/route';
//import { get, set } from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
    async model(params) {
        let story = await this.store.peekRecord('story', params.story_id)
        
        return RSVP.hash({
            story: story,
            project_id: params.project_id,
            story_id: params.story_id
        });
    },
    actions: {
    }
});
