import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import RSVP from 'rsvp';
import jQuery from 'jquery';

export default Route.extend({
    async model() {
        let parentModel = this.modelFor('project');
        let project_id = parentModel.project_id;
        if (project_id === null || project_id === undefined) {
            this.transitionTo('projects');
            return
        }
        await this.store.findAll('tag', { filter: { project: project_id } });
        let retour = await RSVP.hash({
            project_id: project_id,
            project: await this.store.findRecord('project', project_id, { reload: true, include: 'tags,developer' }),
            colors: ["red", "orange", "yellow", "olive", "green", "teal", "blue", "purple", "pink", "brown", "basic", "empty", "primary", "grey", "black"],
        });
        return retour;
    },
    actions: {
        backToProject(model) {
            this.transitionTo('/project/' + get(model, 'project_id') + '/stories');
        },
        async addNewTag(model) {
            let dropdown = jQuery("#colorNewTag")[0];
            let color = dropdown.value;
            let title = get(model, 'titleNewTag');
            if (title === undefined) {
                jQuery('body')
                    .toast({
                        class: 'error',
                        showIcon: true,
                        message: 'You must enter a tag title to add it !'
                    });
                return
            }
            var project = get(model, 'project');
            let tag = this.store.createRecord('tag', {
                title: title,
                color: color,
                project: project
            });
            tag.save();

            let contents = [this.store.createRecord('modificationcontent', {
                text: " create tag ",
                referTo: localStorage.getItem("developerId"),
                order: 0,
                classHTML: "ui teal text"
            }),
            this.store.createRecord('modificationcontent', {
                text: " in project  ",
                referTo: tag.id,
                order: 1,
                classHTML: "ui "+color+" label"
            })]
            contents.forEach(content => {
                content.save();
            })

            this.store.createRecord('modification', {
                date: new Date(Date.now()),
                contents: contents,
                idProject: project.id,
                idDeveloper: localStorage.getItem("developerId"),
                classHTML: "white large bold",
                operation: "create"
            }).save()

            project.tags.toArray().addObject(tag);
            project.save();
            project = await this.store.findRecord('project', project.id, {
                include: 'tags,developers,stories',
                reload: true
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
        },
        async save(model) {
            let code = model.code;
            let description = model.description;

            var error = false;
            var errorDescription = "You must enter : <br><ul>"
            if (code === undefined) {
                errorDescription += "<li>Story code</li>";
                error = true;
            }
            if (description === undefined) {
                errorDescription += "<li>Story description</li>";
                error = true;
            }
            if (error) {
                jQuery('body')
                    .toast({
                        class: 'error',
                        title: "Warning",
                        showIcon: true,
                        message: errorDescription + "</ul>",
                        showProgress: 'bottom',
                        classProgress: 'black',
                    });
                return
            }

            let project = get(model, 'project');
            let developer = null;
            get(project, 'developers').forEach(dev => {
                if (dev.id == jQuery("#addDeveloper")[0].value) {
                    developer = dev;
                }
            });

            let tagsDropdown = jQuery("#addTags")[0].selectedOptions;
            let tags = []
            for (let option of tagsDropdown) {
                if (!(option instanceof Number) && tags.indexOf(option.index - 1) == -1) {
                    let tagIndex = option.index - 1;
                    if (tagIndex != -1) {
                        tags.push(tagIndex)
                    }
                }
            }
            let tagsInProject = get(model, 'project').tags.objectsAt(tags);

            let story = this.store.createRecord('story', {
                code: code,
                description: description,
                project: project,
                developer: developer,
                tags: tagsInProject,
                createDate: new Date(Date.now())
            });
            story.save();
            let contents = [this.store.createRecord('modificationcontent', {
                text: " create story ",
                referTo: localStorage.getItem("developerId"),
                order: 0,
                classHTML: "ui teal text"
            }),
            this.store.createRecord('modificationcontent', {
                text: " in project  ",
                referTo: story.id,
                order: 1,
                classHTML: "ui teal text"
            })]
            contents.forEach(content => {
                content.save();
            })

            this.store.createRecord('modification', {
                date: new Date(Date.now()),
                contents: contents,
                idProject: project.id,
                idDeveloper: localStorage.getItem("developerId"),
                classHTML: "white large bold",
                operation: "create"
            }).save()

            get(project, 'stories').toArray().addObject(story);
            project.save();
            this.transitionTo('/project/' + project.id + '/stories');
        }
    }
});
