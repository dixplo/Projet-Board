import Route from '@ember/routing/route';

export default Route.extend({
    async model() {
        let projects = await this.get('store').findAll('project', { include: 'tags,developers,stories,owner' });
        return projects;
    },
    actions: {
        openAdd() {
            this.transitionTo('projects.new');
        },
        openEdit(project) {
            this.transitionTo('/projects/edit/' + project.id);
        },
        openDelete(project) {
            this.transitionTo('projects.delete', project.id);
        },
        openProject(project) {
            this.transitionTo('/project/' + project.id);
        }
    }
});