import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { get } from '@ember/object';

export default Route.extend({
    async model(params) {
        let project = await this.store.findRecord('project', params.project_id, {
            include: 'developers,tags,stories,owner',
            reload: true
        });
        project.load('developers')
        let retour = RSVP.hash({
            project: project,
            project_id: params.project_id
        });
        debugger
        return retour;
    },
    actions: {
        openAddStory(model) {
            this.transitionTo('/projects/project/' + get(model, 'project_id') + '/story/new');
        }
    },
    renderTemplate(model) {
        this.render('projects.project', {
            into: 'application',
            view: 'projects.project',
            model: model.model
        });
    }
});
