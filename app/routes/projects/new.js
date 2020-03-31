import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import RSVP from 'rsvp';
import jQuery from 'jquery';

export default Route.extend({
    async model() {
        let connected = JSON.parse(localStorage.getItem("connected"));
        if (!connected) {
            this.transitionTo("home");
            return {};
        }
        let developers = await this.store.findAll('developer');
        return RSVP.hash({
            developers: developers
        });
    },
    actions: {
        backToProject(model) {
            this.transitionTo('projects', "myProject");
            set(model, 'name', '')
            set(model, 'description', '')
            set(model, 'startDate', '')
            set(model, 'endDate', '')
        },
        save(model) {
            let name = get(model, 'name');
            let description = get(model, 'description');
            var startDate = get(model, 'startDate');
            let selectedDev = jQuery('#selectDevelopersAddProject')[0].selectedOptions;
            var endDate = get(model, 'endDate');

            var error = false;
            var errorDescription = "You must enter : <br><ul>"
            if (name === undefined) {
                errorDescription += "<li>Project name</li>";
                error = true;
            }
            if (description === undefined) {
                errorDescription += "<li>Project description</li>";
                error = true;
            }
            if (startDate === undefined) {
                errorDescription += "<li>Start Date</li>";
                error = true;
            }
            if (startDate > endDate) {
                errorDescription += "<li>The end date cannot be less than the start date.</li>";
                error = true;
            }
            if (error) {
                jQuery('body')
                    .toast({
                        class: 'error',
                        title: "Warning",
                        message: errorDescription + "</ul>",
                        showProgress: 'bottom',
                        classProgress: 'black',
                    });
                return;
            }

            let dev = []
            for (let option of selectedDev) {
                if (!(option instanceof Number) && dev.indexOf(option.index - 1) == -1) {
                    let devIndex = option.index - 1;
                    if (devIndex != -1) {
                        dev.push(devIndex)
                    }
                }
            }
            let developers = get(model, 'developers').objectsAt(dev);
            let owner = localStorage.getItem("developerId")
            let notIn = true;

            developers.forEach(developer => {
                if (developer.id == owner.id) {
                    notIn = true
                }
            })
            if (notIn == true) {
                get(model, 'developers').forEach(developer => {
                    if (developer.id == owner) {
                        owner = developer
                    }
                })
                developers.addObject(owner);
            }

            if (endDate == undefined) {
                endDate = null
            }

            let project = this.store.createRecord('project', {
                name: name,
                description: description,
                startDate: new Date(startDate),
                endDate: endDate,
                owner: owner,
                developers: developers
            });
            project.save();

            let contents = [this.store.createRecord('modificationcontent', {
                text: " create project ",
                referTo: owner.id,
                order: 0,
                classHTML: "ui teal text"
            })]
            contents.forEach(content => {
                content.save();
            })

            this.store.createRecord('modification', {
                date: new Date(Date.now()),
                contents: contents,
                referTo: project.id,
                classHTML: "white large bold",
                operation: "create"
            }).save()

            jQuery('body')
                .toast({
                    class: 'success',
                    message: "Project successfully added !",
                    showProgress: 'bottom'
                });
            this.transitionTo('projects', "myProject")
        }
    },
    renderTemplate() {
        this.render('projects.new', {
            into: 'application'
        });
    }
});
