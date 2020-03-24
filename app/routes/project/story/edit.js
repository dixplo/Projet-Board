import Route from '@ember/routing/route';
//import { get, set } from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
    async model() {
        let parentModel = this.modelFor('story');
        let story = await this.store.findRecord('story', parentModel.story_id)
        return RSVP.hash({
            story: story,
            project_id: parentModel.project_id,
            story_id: parentModel.story_id
        });
    }
});
