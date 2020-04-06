import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    async model() {
        let devloperId = this.paramsFor("developer").developer_id;
        let developer = await this.get('store').findRecord('developer', devloperId)

       // let listProject = await this.get('store').peekRecord('project', devloperId)
       
        let listProject = await this.store.query('project', {
            
            filter: {
                developers: devloperId
                }   
            });

        debugger
        return RSVP.hash({
            developer: developer,
            listProject: listProject
        });


    }
});
