import Route from '@ember/routing/route';
import { set } from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({

  async model() {
        let currentDevId = localStorage.getItem('developerId')
        let currentDeveloper = await this.get('store').findRecord('developer', currentDevId)
        let m = this.modelFor("developer")
        set(m,"whereIam", "projects")
       
        let listProject = await this.store.query('project', {
            filter: {
                developers: this.paramsFor("developer").developer_id
            }
        });

       

        return RSVP.hash({
            currentDeveloper: currentDeveloper,
            listProject: listProject,
        });
       
    },

     






   
});
