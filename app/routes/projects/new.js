import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import RSVP from 'rsvp';
import jQuery from 'jquery';

export default Route.extend({
    async model() {
        let developers = await this.store.findAll('developer');
        return RSVP.hash({
            developers: developers
        });
    },
    actions: {
        backToProject(model) {
            this.transitionTo('projects');
            set(model, 'name', '')
            set(model, 'description', '')
            set(model, 'startDate', '')
            set(model, 'endDate', '')
        },
        save(model) {
            let name = get(model, 'name');
            let description = get(model, 'description');
            let ownerIndex = jQuery('#selectOwnerAddProject')[0].selectedIndex - 1;
            let selectedDev = jQuery('#selectDevelopersAddProject')[0].selectedOptions;
            let startDate = get(model, 'startDate');
            let endDate = get(model, 'endDate');

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
            if (ownerIndex == -1) {
                errorDescription += "<li>Owner project</li>";
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

            let owner = get(model, 'developers').objectAt(jQuery('#selectOwnerAddProject')[0].selectedIndex - 1);
            let dev = [ownerIndex]
            for (let option of selectedDev) {
                if (!(option instanceof Number) && dev.indexOf(option.index - 1) == -1) {
                    let devIndex = option.index - 1;
                    if (devIndex != -1) {
                        dev.push(devIndex)
                    }
                }
            }
            let developers = get(model, 'developers').objectsAt(dev);
            this.store.createRecord('project',
                {
                    name: name,
                    description: description,
                    startDate: startDate,
                    endDate: endDate,
                    owner: owner,
                    developers: developers
                }).save();

            jQuery('body')
                .toast({
                    class: 'success',
                    message: "Project successfully added !",
                    showProgress: 'bottom'
                });
            this.transitionTo('projects')
        }
    }
});
