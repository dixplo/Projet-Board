import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    async model() {
        let devs = await this.store.findAll('developer')

        let developers = [];
        let numberByRow = 5;
        let numberTab = Math.ceil((devs.length + 1) / numberByRow);
        for (let i = 0; i < numberTab; i++) {
            let tab = [];
            for (let j = i * numberByRow; j < (i + 1) * numberByRow; j++) {
                let dev = devs.toArray()[j];
                if (dev !== undefined) {
                    tab.push(dev);
                } else {
                    if (i == numberTab - 1) {
                        tab.push("empty");
                    }
                }
            }
            developers.push(tab);
        }

        return RSVP.hash({
            developersTable: developers,
            alreadyOpen: ''
        });

    },
    actions: {
    }
});
