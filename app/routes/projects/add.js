import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

export default Route.extend({
    actions: {
        backToProject(model) {
            this.transitionTo('projects');
            set(model, 'name', '')
            set(model, 'description', '')
            set(model, 'startDate', '')
            set(model, 'endDate', '')
        },
        save(model) { 
            console.log("save");
            let proj = this.get('store').createRecord('projects', { name: get(model, 'name'), description: get(model, 'description'),startdate: get(model, 'startdate'),endDate: get(model, 'endDate') });
            proj.save();
            //this.transitionTo('developers')
            //set(model, 'name', '')
            //set(model, 'fname', '')
        }
    }
});
