import Route from '@ember/routing/route';
//import { get, set } from '@ember/object';
import { next } from '@ember/runloop';
import jQuery from 'jquery';
import RSVP from 'rsvp';

export default Route.extend({
    async model() {
        var content = [];
        let projects = await this.store.findAll('project', { reload: true });
        let developers = await this.store.findAll('developer', { reload: true });
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
                    url: "/developer/" + developer.id + "/projects"
                });
        });
        let connected = (localStorage.getItem("connected") == "true");
        let dev = undefined;
        if (connected == true) {
            let devId = localStorage.getItem("developerId")
            developers.forEach(developer => {
                if (developer.id == devId) {
                    dev = developer

                }
            });
        }
        let retour = RSVP.hash({
            content: content,
            connected: connected,
            user: dev
        });
        return retour;
    },
    actions: {
        signOut(model) {
            set(model, "connected", false);
            set(model, "user", undefined);
            localStorage.setItem('user', undefined);
            localStorage.setItem("connected", false);
            localStorage.setItem("developerId", undefined);
            this.transitionTo('overview', "all");
        },
        goToDevelopers() {
            this.transitionTo('developers');
            
        },
        openProfil(model) {
            this.transitionTo('/developer/' + model.user.id + '/projects');
        },
        goToLogin() {
            this.transitionTo('login');
        },
        goToRegister() {
            this.transitionTo('register');
        },
        goToProjects(my) {
            if (my === undefined) {
                this.transitionTo('projects.new');
            } else {
                this.transitionTo('projects', my);
            }
        },
        goToHomeOverview(what) {
            this.transitionTo("overview", what);
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

        jQuery("#searchAll")
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
