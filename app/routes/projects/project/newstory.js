import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import RSVP from 'rsvp';
import jQuery from 'jquery';

export default Route.extend({
    async model() {
        let parentModel = this.modelFor('projects.project');
        let project_id = parentModel.project_id;
        if (project_id === null || project_id === undefined) {
            this.transitionTo('projects');
            return
        }

        return RSVP.hash({
            project_id: project_id,
            project: await this.store.findRecord('project', project_id, { reload: true , include: 'tags,developers,stories,owner' }),
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
            var project = get(model, 'project');
            let tag = this.store.createRecord('tag', {
                title: title,
                color: color,
                project: project
            });
            tag.save();
            project = await this.store.findRecord('project', project.id, {
                include: 'tags'
            });
            set(model, 'project', project);
            set(model, 'tags', get(project, 'tags'));
            set(model, 'titleNewTag', '');

            jQuery('body')
                .toast({
                    class: 'success',
                    showIcon: true,
                    message: 'Tag <div class="ui ' + color + ' label">' + title + '</div> added successfully'
                });
        }
    }
});
