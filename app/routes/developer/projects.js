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
        
        await this.store.findAll('developer');
        await this.store.findAll('story');

        let projects = [];
        let numberByRow = 2;
        let numberTab = Math.ceil((listProject.length + 1) / numberByRow);
        for (let i = 0; i < numberTab; i++) {
            let tab = [];
            for (let j = i * numberByRow; j < (i + 1) * numberByRow; j++) {
                let project = listProject.toArray()[j];
                if (project !== undefined) {
                    tab.push(project);
                } else {
                    if (i == numberTab - 1) {
                        tab.push("empty");
                    }
                }
            }
            projects.push(tab);
        }

        return RSVP.hash({
            currentDeveloper: currentDeveloper,
            projectTable: projects,
        });
       
    }   
});
