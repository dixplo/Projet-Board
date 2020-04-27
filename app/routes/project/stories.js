import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { set } from '@ember/object';

export default Route.extend({
    async model() {
        let project_id = this.modelFor('project').project_id;
        let project = await this.store.findRecord('project', project_id, {
            reload: true,
            include: 'developers,stories,tags'
        });
        await project.get('developers'); 
        await project.get('stories');
        let retour = RSVP.hash({
            project: project,
            project_id: project_id
        });

        let m = this.modelFor('project')
        set(m, "whereIAm", 4);
        set(m, "color", "#FF1493");
        return retour;
    }
});
