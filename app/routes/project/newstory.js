import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import RSVP from 'rsvp';
import jQuery from 'jquery';
import EmberResolver from 'ember-resolver';

export default Route.extend({
    async model() {
        let parentModel = this.modelFor('project');
        let project_id = parentModel.project_id;

        if (project_id === null || project_id === undefined) {
            this.transitionTo('projects');
            return
        }
        let project = await this.store.peekRecord('project', project_id);
        let tags = await this.store.findAll('tag');
        return RSVP.hash({
            project_id: project_id,
            project: project,
            tags: tags,
            colors: ["red", "orange", "yellow", "olive", "green", "teal", "blue", "violet", "purple", "pink", "brown", "basic", "empty", "primary", "grey", "black"],

        });
    },
    actions: {
        backToProject(model) {
            this.transitionTo('/project/' + get(model, 'project_id'));
        },
        async addNewTag(model) {
            let dropdown = jQuery("#colorNewTag")[0];
            let color = dropdown.value;
            let title = get(model, 'titleNewTag');
            /*this.store.createRecord('tag', {
                title: title,
                color: color
            }).save();
            let tags = await this.store.findAll('tag');
            set(model, 'tags', tags);*/
            dropdown.value = "red";


            jQuery('body')
                .toast({
                    class: 'warning',
                    showIcon: false,
                    message: 'Hey, where is my icon ?'
                });

        },
        didTransition() {
            Ember.run.next(this, 'initUI');
        }
    },
    initUI() {
        jQuery('.ui.dropdown').dropdown();
    }

});
