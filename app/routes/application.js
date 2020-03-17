import Route from '@ember/routing/route';

export default Route.extend({
    actions: {
        goToDevelopers() {
            this.transitionTo('developers');
        },
        goToProjects() {
            this.transitionTo('projects');
        }
    }
});
