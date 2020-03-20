import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { get, set } from '@ember/object';

export default Route.extend({
    async model(params) {
        let project = await this.get('store').findRecord('project', params.project_id);
        let retour = RSVP.hash({
            project: project,
            project_id: params.project_id
        });
        
        return retour;
    },
    actions: {
        openAddStory(model) {
            this.transitionTo('/project/' + get(model, 'project_id') + '/story/new');
        }
    }
});
