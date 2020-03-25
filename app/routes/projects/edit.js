import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
    model(params) {
        
        let project_id = params.project_id;
        let proj = this.get('store').peekRecord('project', project_id);
        let myproj = proj;
        let r = RSVP.hash({
            projId: project_id,
            proj: myproj,
            name: myproj.get('name'),
            description: myproj.get('description'),
            startDate: myproj.get('startDate'),
            endDate:  myproj.get('endDate'),
            owner:  myproj.get('owner'),
            projects:  myproj.get('projects')
        });
        return r;
    },
    actions: {
        backToProject(model) {
            set(this.modelFor('projects'), 'alreadyOpen', ""); 
            this.transitionTo('projects');
        },
        save(model) {
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
        }
    },
    renderTemplate(model) {
        this.render('projects.edit', {
            into: 'projects',
            outlet: model.model.projId,
            view: 'projects.edit'
        });
    }
});
