import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { next } from '@ember/runloop';
import jQuery from 'jquery';
import RSVP from 'rsvp';

export default Route.extend({
    async model() {
        var content = [];
        let projects = await this.store.findAll('project');
        let developers = await this.store.findAll('developer');
        projects.forEach(project => {
            content.push(
                {
                    category: "Projects",
                    title: project.name,
                    description: project.description,
                    url: "/project/" + project.id + "/home"
                });
        });
        developers.forEach(developer => {
            content.push(
                {
                    category: "Developers",
                    title: developer.username,
                    description: developer.fullName,
                    url: "/developer/" + developer.id + "/home"
                });
        });
        var user = JSON.parse(sessionStorage.getItem("user"));
        return RSVP.hash({
            content: content,
            connected: sessionStorage.getItem("connected"),
            user: user
        });
    },
    actions: {
        goToDevelopers() {
            this.transitionTo('developers');
        },
        goToLogin() {
            this.transitionTo('login');
        },
        goToRegister() {
            this.transitionTo('register');
        },
        goToProjects(my) {
            if (my === undefined) {
                this.transitionTo('projects');
            } else if (my == "new") {
                this.transitionTo('projects.new');
            } else if (my == "myProject") {
                this.transitionTo('projects.new');
            }
        },
        goToHomeOverview(what) {
            this.transitionTo(what);
        },
        didTransition() {
            next(this, 'initUI');
        }
    },
    initUI() {
        jQuery('.ui.dropdown').dropdown({
            on: 'hover'
        });
        jQuery('.ui.overlay').visibility({ type: 'fixed', offset: 15 });

        jQuery('.ui.search')
            .search({
                source: this.modelFor('application').content,
                searchFields: [
                    'title', 'description'
                ],
                type: "category",
                fullTextSearch: true,
                searchOnFocus: true,
                minCharacters: 0,
                maxResults: 10
            });
    }
});
