import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    async model(params) {
        let project = this.modelFor('project').project;
        let story = await this.store.peekRecord('story', params.story_id);
        return RSVP.hash({
            story: story,
            project: project,
            story_id: params.story_id
        });
    },
    actions: {
    }
});
