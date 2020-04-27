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
            colors: [{ name: "red", hexa: "#DB2828" },
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
            { name: "black", hexa: "#1B1C1D" }],
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
            //story.save();
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
            /*
            contents.forEach(content => {
                //content.save();
                'content' is defined but never used 
            })
            */
            this.store.createRecord('modification', {
                date: new Date(Date.now()),
                contents: contents,
                idProject: project.id,
                idDeveloper: localStorage.getItem("developerId"),
                classHTML: "white large bold",
                operation: "create"
            })//.save()

            get(project, 'stories').toArray().addObject(story);
            //project.save();
            debugger
            this.transitionTo('/project/' + project.id + '/stories');
        },
        didTransition() {
            next(this, 'initUI');
        },
        do() {
            console.log("do");

        },
        finished(task) {
            set(task, "finished", !get(task, "finished"));
        },
        addTask(model) {
            var tasks = get(model, 'tasks');
            if (tasks == undefined) {
                tasks = [];
            }

            tasks.push({
                title: model.task.title,
                color: jQuery('#colorNewTask')[0].value,
                finished: false
            })

            set(model, 'tasks', tasks);
            console.log(get(model, 'tasks'));
            
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
            set(model, "isIcon", (value == "coffee"));
            set(model, "estimate", value);
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
    }
});
