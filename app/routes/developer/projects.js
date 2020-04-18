import Route from '@ember/routing/route';
import { set } from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({

  async model() {
        let currentDevId = localStorage.getItem('developerId')
        let currentDeveloper = await this.get('store').findRecord('developer', currentDevId)
        let m = this.modelFor("developer")
        set(m,"whereIam", "projects")
       


        currentDeveloper.follow.forEach(DevFollow => {
            if (DevFollow==developerId) {
                canFollow = false
            }
        });

        return RSVP.hash({
            currentDeveloper: currentDeveloper,
            listProject: listProject,
        });
       
    },

     






   
});
