import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

export default Route.extend({
    model() {
        return this.get('store').findAll('project');
    },
    actions: {
        openAdd() {
            this.transitionTo('projects.new');
        },
        openEdit(project) {
            this.transitionTo('projects.edit', project.id);
        },
        openDelete(project) {
            this.transitionTo('projects.delete', project.id);
        },
        openProject(project) {
            this.transitionTo('project', project.id);
        }
    }
});