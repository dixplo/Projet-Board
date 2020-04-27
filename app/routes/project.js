import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    async model(params) {

        let project = await this.store.findRecord('project', params.project_id, {
            reload: true,
            include: 'developers,stories,stories.tasks,tags,steps'
        });
        let developers = await project.get('developers');
        await project.get('stories');
        await this.store.query('task', {
            filter: {
                project: params.project_id
            }
        });

        await this.store.query('step', {
            filter: {
                project: params.project_id
            }
        });
        await this.store.query('tag', {
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

        return retour;
    }
});
