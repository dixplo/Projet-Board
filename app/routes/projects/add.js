import Route from '@ember/routing/route';

export default Route.extend({
    actions: {
        backToProject(model) {
            this.transitionTo('projects');
            set(model, 'name', '')
            set(model, 'description', '')
            set(model, 'startdate', '')
            set(model, 'duedate', '')
        },
        save(model) {
            console.log("save");
            let proj = this.get('store').createRecord('project', { name: get(model, 'name'), description: get(model, 'description'),startdate: get(model, 'startdate'),duedate: get(model, 'duedate') });
            proj.save();
            //this.transitionTo('developers')
            //set(model, 'name', '')
            //set(model, 'fname', '')
        }
    }
});
