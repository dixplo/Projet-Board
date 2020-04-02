import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { get } from '@ember/object';

export default Route.extend({
    async model(params) {
        let href = window.location.href
        if (href.includes("board")) { this.transitionTo('/project/' + params.project_id + '/board'); }
        else if (href.includes("stories")) { this.transitionTo('/project/' + params.project_id + '/stories'); }

        let project = await this.store.findRecord('project', params.project_id, {
            reload: true,
            include: 'developers,stories,tags,steps'
        });
        let developers = await project.get('developers');
        let stories = await project.get('stories');
        let steps = await project.get('steps');

        let currentDeveloperIsIn = false;

        developers.toArray().forEach(developer => {
            if (developer.id == localStorage.getItem("developerId")) {
                currentDeveloperIsIn = true;
            }
        });

        let retour = RSVP.hash({
            project: project,
            project_id: params.project_id,
            isIn: currentDeveloperIsIn
        });
        console.log(retour);

        return retour;
    },
    actions: {
        openAddStory(model) {
            this.transitionTo('/project/' + get(model, 'project_id') + '/story/new');
        },
        openBoard(model) {
            this.transitionTo('/project/' + get(model, 'project_id') + '/board');
        },
        openStories(model) {
            this.transitionTo('/project/' + get(model, 'project_id') + '/stories');
        },
        openOverview(model) {
            this.transitionTo('/project/' + get(model, 'project_id') + '/home');
        },
        backToProjects() {
            this.transitionTo('projects');
        }
    }
});
