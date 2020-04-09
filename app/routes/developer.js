import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    async model() {
        let currentDevId = localStorage.getItem('developerId')
        let currentDeveloper = await this.get('store').findRecord('developer', currentDevId)

        let developerId = this.paramsFor("developer").developer_id;
        let developer = await this.get('store').findRecord('developer', developerId)

        let listProject = await this.store.query('project', {
            filter: {
                developers: developerId
            }
        });

        var canFollow = true;
        var isMyProfil = false;
        if (currentDevId != developerId) {
            currentDeveloper.follow.forEach(dev => {
                if (dev.id == developer.id) {
                    canFollow = false
                }
            });
        } else {
            isMyProfil = true;
        }


        return RSVP.hash({
            developer: developer,
            listProject: listProject,
            connected: JSON.parse(localStorage.getItem('connected')),
            canFollow: canFollow,
            isMyProfil: isMyProfil
        });


    }
});
