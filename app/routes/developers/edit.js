import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import RSVP from 'rsvp'

export default Route.extend({
    templateName: 'developers/add',
    model(params) {
        let dev = this.get('store').peekRecord('developer', params.dev_id);
        let mydev = dev;
        let r = RSVP.hash({
            devId: params.dev_id,
            dev: mydev,
            name: mydev.get('name'),
            fname: mydev.get('fname')
        });
        console.log(r);
        debugger
        return r;
    },
    actions: {
        backToDeveloper(model) {
            this.transitionTo('developers');
        },
        save(model) {
            console.log("update");
            let dev = get(model, 'dev');
            dev.set('name', get(model, 'name'));
            dev.set('fname', get(model, 'fname'));
            dev.save();
            debugger
            this.transitionTo('developers')
            set(model, 'name', '')
            set(model, 'fname', '')
        }
    }
});
