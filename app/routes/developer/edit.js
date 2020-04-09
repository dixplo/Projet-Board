import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
    async  model() {
        let currentDevId = localStorage.getItem('developerId')
        let currentDeveloper = await this.get('store').findRecord('developer', currentDevId)
        let developer = await this.get('store').findRecord('developer', developerId)


        var isMyProfil = false;
        if (currentDevId == developerId) {
            isMyProfil = true;
        }

        return RSVP.hash({
            developer: developer,
            connected: JSON.parse(localStorage.getItem('connected')),
            isMyProfil: isMyProfil
        });
    }
});
