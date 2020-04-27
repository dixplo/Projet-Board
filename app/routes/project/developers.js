import Route from '@ember/routing/route';
import { set } from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
    async model() {
        let project_id = this.modelFor('project').project_id;
        let project = await this.store.findRecord('project', project_id, {
            reload: true,
            include: 'developers,stories,tags'
        });
        let developers = await project.get('developers');
        let stories = await project.get('stories');
        let retour = RSVP.hash({
            project: project,
            project_id: project_id
        });
        
        let m = this.modelFor('project')
        set(m, "whereIAm", 5);
        set(m, "color", "#6435C9");

        return retour;
    }
});
