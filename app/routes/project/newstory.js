import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import { next } from '@ember/runloop';
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
            colors: [
                { name: "red", hexa: "#DB2828" },
                { name: "orange", hexa: "#F2711C" },
                { name: "yellow", hexa: "#FBBD08" },
                { name: "olive", hexa: "#b5cc18" },
                { name: "green", hexa: "#24BA45" },
                { name: "teal", hexa: "#00B5AD" },
                { name: "blue", hexa: "#2185D0" },
                { name: "purple", hexa: "#A333C8" },
                { name: "pink", hexa: "#E03997" },
                { name: "brown", hexa: "#A5673F" },
                { name: "white", hexa: "#E5E5E5" },
                { name: "grey", hexa: "#767676" },
                { name: "black", hexa: "#1B1C1D" }
            ],
            task: { title: undefined, color: undefined, finished: undefined }
        });

        let m = this.modelFor('project')
        set(m, "whereIAm", 3);
        set(m, "color", "");
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
            if (title === undefined || title == "") {
                jQuery('body')
                    .toast({
                        class: 'error',
                        showIcon: true,
                        message: 'You must enter a tag name to add it !'
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
                classHTML: "ui " + color + " label"
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
            //set(model, 'tags', get(project, 'tags'));
            set(model, 'titleNewTag', '');

            jQuery('body')
                .toast({
                    class: 'success',
                    showIcon: true,
                    message: 'Tag <div class="ui ' + color + ' label">' + title + '</div> added successfully'
                });
        },
        async save(model) {
            let project = get(model, 'project');

            var tasks = []

            var tags = []
            if (model.tags != undefined) {
                tags = model.tags;
            }
            var endDate = null
            if (model.endDate != undefined) {
                endDate = new Date(model.endDate);
            }

            let story = this.store.createRecord('story', {
                code: model.code,
                description: model.description,
                project: project,
                developer: model.developer,
                tags: tags,
                createDate: new Date(Date.now()),
                endDate: endDate,
                tasks: tasks,
                estimate: model.estimate
            });
            if (model.tasks != undefined) {
                model.tasks.forEach(task => {
                    set(task, 'story', story);
                    task.save();
                })
                tasks = model.tasks;
            }
            set(story, 'tasks', tasks);
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
        },
        didTransition() {
            next(this, 'initUI');
        },
        finished(model, task) {
            var tasksFinished = 0;
            set(task, "finished", !task.finished);
            model.tasks.forEach(task => {
                if (task.finished == true) {
                    tasksFinished++
                }
            });

            set(model, "tasksFinished", tasksFinished);
        },
        addTask(model) {
            var tasks = get(model, 'tasks');
            if (tasks == undefined) {
                tasks = [];
            }

            tasks.pushObject(this.store.createRecord('task', {
                title: model.task.title,
                color: jQuery('#colorNewTask')[0].value,
                finished: false,
                project: get(model, 'project_id')
            }))

            set(model, "task.title", "");
            set(model, 'tasks', tasks);
            var tasksFinished = 0;
            model.tasks.forEach(task => {
                if (task.finished == true) {
                    tasksFinished++
                }
            });

            set(model, "tasksFinished", tasksFinished);

            set(model, "haveExtra", true);
        },
        deleteTask(model, task) {
            model.tasks.removeObject(task)

            var tasksFinished = 0;
            model.tasks.forEach(task => {
                if (task.finished == true) {
                    tasksFinished++
                }
            });

            set(model, "tasksFinished", tasksFinished);

            var haveExtra = false
            if (model.tags != undefined && model.tags.length > 0) {
                haveExtra = true
            }
            if (model.estimate != undefined && model.estimate.length > 0) {
                haveExtra = true
            }
            if (model.tasks != undefined && model.tasks.length > 0) {
                haveExtra = true
            }
            set(model, "haveExtra", haveExtra);
        }
    },
    initUI() {
        jQuery('.ui.calendar').calendar({
            type: 'date'
        });

        let model = this.modelFor('project.newstory');
        let developers = model.project.developers;
        var contentDevelopers = [{
            name: "Select developer",
            value: "",
            image: "/assets/images/avatars/unknow.jpg",
            imageClass: "ui mini image",
            selected: true
        }];

        developers.toArray().forEach(developer => {
            contentDevelopers.push({
                name: developer.username,
                value: developer.id,
                image: "/assets/images/avatars/" + developer.avatar + ".jpg",
                imageClass: "ui mini image"
            })
        });
        jQuery('#addDeveloper').dropdown({
            minCharacters: 0,
            fullTextSearch: true,
            values: contentDevelopers
        });
        let estimates = ["1", "2", "3", "5", "8", "13", "21", "40"];
        let estimatesDropdown = [{
            name: "Select an Estimate",
            value: "",
            selected: true
        }, {
            name: "coffee",
            value: "coffee",
            icon: "coffee"
        }]
        estimates.toArray().forEach(estimate => {
            estimatesDropdown.push({
                name: estimate,
                value: estimate
            })
        });
        estimatesDropdown.push({
            name: "unknown",
            value: "unknown",
            icon: "help"
        })

        jQuery('#estimateDropdown').dropdown({
            minCharacters: 0,
            fullTextSearch: true,
            values: estimatesDropdown
        });
        jQuery('.ui.dropdown').dropdown({
            on: "hover"
        });

        jQuery('#addDeveloper').change(function () {
            var idDev = jQuery('#addDeveloper')[0].value;
            let developer = null
            model.project.developers.toArray().forEach(dev => {
                if (dev.id == idDev) {
                    developer = dev;
                }
            });
            set(model, "developer", developer);
        });

        jQuery('#estimateDropdown').change(function () {
            let value = jQuery('#estimateDropdown')[0].value;
            set(model, "isIcon", (value == "coffee" || value == "unknown"));
            set(model, "estimate", value);
            var haveExtra = false
            if (model.tags != undefined && model.tags.length > 0) {
                haveExtra = true
            }
            if (model.estimate != undefined && model.estimate.length > 0) {
                haveExtra = true
            }
            if (model.tasks != undefined && model.tasks.length > 0) {
                haveExtra = true
            }
            set(model, "haveExtra", haveExtra);
        });

        jQuery('#addTags').change(function () {
            var selectedOptions = jQuery('#addTags')[0].selectedOptions;
            set(model, "tags", [])
            for (let option of selectedOptions) {
                if (!(option instanceof Number)) {
                    let index = option.index - 1;
                    if (index != -1) {
                        get(model, "tags").push(model.project.tags.toArray()[index])
                    }
                }
            }

            let dropdown = jQuery('#addTagsDropdown a');
            for (let option of dropdown) {
                if (!(option instanceof Number)) {
                    get(model, "tags").forEach(tag => {
                        if (tag.id == option.dataset.value) {
                            model.colors.forEach(color => {
                                if (tag.color == color.name) {
                                    option.style.backgroundColor = color.hexa
                                    if (color.name != "white") {
                                        option.style.color = "#FFF"
                                    }
                                }
                            })
                        }
                    })
                }
            }

            var haveExtra = false
            if (model.tags != undefined && model.tags.length > 0) {
                haveExtra = true
            }
            if (model.estimate != undefined && model.estimate.length > 0) {
                haveExtra = true
            }
            if (model.tasks != undefined && model.tasks.length > 0) {
                haveExtra = true
            }
            set(model, "haveExtra", haveExtra);
        });
        jQuery('#colorNewTag').change(function () {
            var newValue = jQuery('#colorNewTag')[0].value;
            let text = jQuery('#divAddTag .dropdown div.text div.ui');
            text.addClass(newValue + " label")

        });
        var newValueTag = jQuery('#colorNewTag')[0].value;
        let textTag = jQuery('#divAddTag .dropdown div.text div.ui');
        textTag.addClass(newValueTag + " label")

        jQuery('#colorNewTask').change(function () {
            var newValueTask = jQuery('#colorNewTask')[0].value;
            let text = jQuery('#divAddTask .dropdown div.text div.ui');
            text.addClass(newValueTask + " empty label circular");
            set(model, 'task.color', newValueTask);
        });
        var newValueTask = jQuery('#colorNewTask')[0].value;
        let text = jQuery('#divAddTask .dropdown div.text div.ui');
        text.addClass(newValueTask + " empty label circular")

        jQuery('input').keyup(function () {
            if (
                model.code !== undefined && model.code != ""
            ) {
                set(model, "allFields", true)
            } else {
                set(model, "allFields", false)
            }
        });

        $('.ui.progress').progress({
            duration: 300,
            total: 100
        });
    }
});
