import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
    async  model() {
        let currentDevId = localStorage.getItem('developerId')
        let currentDeveloper = await this.get('store').findRecord('developer', currentDevId)

        let developerId = this.paramsFor("developer").developer_id;
        let developer = await this.get('store').findRecord('developer', developerId)

        if (localStorage.getItem("connected") == "true") {
            if (currentDevId == developerId) {
                
            }
            else {
                this.transitionTo("developer").developer_id
                return
            }
        } else{
            this.transitionTo("developer").developer_id
            return
        }




        
      


        

        return RSVP.hash({

        });
    }
});
