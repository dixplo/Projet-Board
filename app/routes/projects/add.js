import Route from '@ember/routing/route';

export default Route.extend({
    actions: {
        backToProject(model) {
            this.transitionTo('projects');
            set(model, 'name', '')
            set(model, 'description', '')
            set(model, 'startDate', '')
            set(model, 'endDate', '')
        }
        /*
        save(model) {
            console.log("save");
            let dev = this.get('store').createRecord('developer', { name: get(model, 'name'), fname: get(model, 'fname') });
            dev.save();
            //this.transitionTo('developers')
            //set(model, 'name', '')
            //set(model, 'fname', '')
        }
        */
    }
});
