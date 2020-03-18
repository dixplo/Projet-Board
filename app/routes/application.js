import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import jQuery from 'jquery';

export default Route.extend({
    model() {
        
        return {
            whereIAm: "developers"
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
