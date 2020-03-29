import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { next } from '@ember/runloop';
import jQuery from 'jquery';

export default Route.extend({
    async model() {
        let href = window.location.href;
        if (href.includes("project")) {
        } else if (href.includes("developers")) {
        } else {
            this.transitionTo("home");
        }

        var content = [];
        let projects = await this.store.findAll('project');
        projects.forEach(project => {
            content.push(
                {
                    title: project.name,
                    description: project.description,
                    url: "/project/" + project.id + "/home"
                });
        });

        return {
            content: content
        };
    },
    actions: {
        goToDevelopers() {
            this.transitionTo('developers');
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
        goToHome() {
            this.transitionTo('home');
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
                    'title'
                ],
                fullTextSearch: false
            });
    }
});
