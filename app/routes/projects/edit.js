import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import RSVP from 'rsvp';
import { next } from '@ember/runloop';
import jQuery from 'jquery';


export default Route.extend({
    async model(params) {

        let project_id = params.project_id;
        let proj = this.get('store').peekRecord('project', project_id, { include: 'developers' });
        let myproj = proj;
        let developers = await this.store.findAll('developer');
        let developersInProject = await get(proj, 'developers');
        let owner = await get(proj, 'owner');

        let r = RSVP.hash({
            projId: project_id,
            proj: myproj,
            name: myproj.get('name'),
            description: myproj.get('description'),
            startDate: myproj.get('stringStartDate'),
            endDate: myproj.get('stringEndDate'),
            developers: developers,
            developersInProject: developersInProject,
            owner: owner
        });
        return r;
    },
    actions: {
        backToProject(model) {
            set(this.modelFor('projects'), 'alreadyOpen', "");
            this.transitionTo('projects');
        },
        save(model) {
            let name = get(model, 'name');
            let description = get(model, 'description');
            let ownerIndex = jQuery('#selectOwnerEditProject')[0].selectedIndex - 1;
            let selectedDev = jQuery('#selectDevelopersEditProject')[0].selectedOptions;
            let startDate = new Date(get(model, 'startDate'));
            let endDate = new Date(get(model, 'endDate'));

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
            if (startDate > endDate) {
                errorDescription += "<li>The end date cannot be less than the start date.</li>";
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

            let proj = get(model, 'proj');
            proj.set('name', get(model, 'name'));
            proj.set('description', get(model, 'description'));
            proj.set('startDate', get(model, 'startDate'));
            proj.set('endDate', get(model, 'endDate'));
            proj.set('owner', get(model, 'owner'));
            proj.set('projects', get(model, 'projects'));
            proj.save();
            set(this.modelFor('projects'), 'alreadyOpen', "");
            this.transitionTo('projects')
            set(model, 'name', '')
            set(model, 'description', '')
            set(model, 'startDate', '')
            set(model, 'endDate', '')
            set(model, 'owner', '')
            set(model, 'projects', '')
        },
        didTransition() {
            next(this, 'initUI');
        }
    },
    initUI() {
        let model = this.modelFor('projects.edit');
        let developersInProject = model.developersInProject;
        let owner = model.owner;
        let developers = model.developers;
        var contentOwner = [];
        var contentDevelopers = [developers.toArray()];

        developers.toArray().forEach(developer => {
            let dev = {
                name: developer.fullName,
                value: developer.id
            }
            if (developer.id == owner.id) {
                dev.selected = true;
            }
            contentOwner.push(dev)
        });
        developers.toArray().forEach(developer => {
            let dev = {
                name: developer.fullName,
                value: developer.id
            }
            developersInProject.toArray().forEach(devlo => {
                if (developer.id == devlo.id) {
                    dev.selected = true;
                }
            });
            contentDevelopers.push(dev)
        });
        jQuery('#selectOwnerEditProject')
            .dropdown({
                values: contentOwner
            });
        jQuery('#selectDevelopersEditProject')
            .dropdown({
                values: contentDevelopers
            });
    },
    renderTemplate(model) {
        this.render('projects.edit', {
            into: 'projects',
            outlet: model.model.projId,
            view: 'projects.edit'
        });
    }
});
