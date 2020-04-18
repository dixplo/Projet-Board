import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { set } from '@ember/object';

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
        currentDeveloper.follow.forEach(DevFollow => {
            if (DevFollow==developerId) {
                canFollow = false
            }
        });

        return RSVP.hash({
            currentDeveloper: currentDeveloper,
            developer: developer,
            listProject: listProject,
            connected: JSON.parse(localStorage.getItem('connected')),
            canFollow: canFollow,
            isMyProfil: isMyProfil,
            whereIam: ""
        });
    },
    actions: {
        follow(model) {
            switch (model.canFollow) {
                case true:
                    model.currentDeveloper.follow.pushObject(model.developer)
                    model.currentDeveloper.save();
                    set('canFollow', 'false') // le bouton devient UnFollow
                
                    break;

                case false:
                       model.currentDeveloper.follow.removeObject(model.developer)
                       model.currentDeveloper.save();
                            set('canFollow', 'true')
                        break;
            
                default:
                    break;
            }
        }
    }
});
