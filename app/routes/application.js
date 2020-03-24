import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import jQuery from 'jquery';

export default Route.extend({
    async model() {
        let href = window.location.href;
        var where = "";
        /*await this.store.findAll('developer');
        await this.store.findAll('story');
        await this.store.findAll('tag');
        await this.store.findAll('project');*/
        if (href.includes("project")) {
            where = "projects";
        } else if (href.includes("developers")) {
            where = "developers"
        } else {
            this.transitionTo("home");
            where = "home";
        }
        return {
            whereIAm: where
        };
    },
    actions: {
        goToDevelopers(model) {
            set(model, 'whereIAm', 'developers')
            this.transitionTo('developers');
        },
        goToProjects(model) {
            set(model, 'whereIAm', 'projects')
            this.transitionTo('projects');
        },
        goToHome(model) {
            set(model, 'whereIAm', 'home')
            this.transitionTo('home');
        },
        didTransition() {
            Ember.run.next(this, 'initUI');
        }
    },
    initUI() {
        jQuery('.ui.dropdown').dropdown();
        jQuery('.ui.overlay').visibility({ type: 'fixed', offset: 15 });
    }
});
