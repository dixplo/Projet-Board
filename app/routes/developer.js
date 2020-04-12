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


        return RSVP.hash({
            currentDeveloper: currentDeveloper,
            developer: developer,
            listProject: listProject,
            connected: JSON.parse(localStorage.getItem('connected')),
            canFollow: canFollow,
            isMyProfil: isMyProfil
        });
    },
    actions: {
        follow(model) {
            switch (model.canFollow) {
                case true:
               // set(model.currentDevId, 'follow', 'model.developerId')
              //  model.currentDevId.save();
                model.currentDeveloper.follow.pushObject(model.developer)
                model.currentDeveloper.save();
                set('canFollow', 'false')
                debugger

                    break;
                case false:
                    
                    model.currentDeveloper.follow.forEach(DevFollow,index => {
                       if (DevFollow == developer.id) {
                        model.currentDeveloper.follow.splice(index,1)
                        model.currentDeveloper.save();
                        set('canFollow', 'true')
                       }
                       debugger
                    });
                    debugger
                       

                    set('canFollow', 'true')
                    break;
            
                default:
                    break;
            }
        }
    }
});
