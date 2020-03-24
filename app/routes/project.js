import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { get } from '@ember/object';

export default Route.extend({
    async model(params) {

        let project = await this.store.findRecord('project', params.project_id, {
            reload: true,
            include: 'developers,stories,tags'
        });
        
        let developers = await project.get('developers');
        let stories = await project.get('stories');
        let tags = await project.get('tags');
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