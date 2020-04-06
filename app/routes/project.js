import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { get } from '@ember/object';

export default Route.extend({
    async model(params) {

        let project = await this.store.findRecord('project', params.project_id, {
            reload: true,
            include: 'developers,stories,tags,steps'
        });
        let developers = await project.get('developers');
        let stories = await project.get('stories');
        let steps = await this.store.query('step', {
            filter: {
                project: params.project_id
            }
        });
        let tags = await this.store.query('tag', {
            filter: {
                project: params.project_id
            }
        });
        let currentDeveloperIsIn = false;

        developers.toArray().forEach(developer => {
            if (developer.id == localStorage.getItem("developerId")) {
                currentDeveloperIsIn = true;
            }
        });

        let retour = RSVP.hash({
            project: project,
            project_id: params.project_id,
            isIn: currentDeveloperIsIn,
            whereIAm: 1,
            color: "#FFD700"
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
        openContributors(model) {
            this.transitionTo('/project/' + get(model, 'project_id') + '/developers');
        },
        openTags(model) {
            this.transitionTo('/project/' + get(model, 'project_id') + '/tags');
        },
        backToProjects() {
            this.transitionTo('projects');
        }
    }
});
