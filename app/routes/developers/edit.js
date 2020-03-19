import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import RSVP from 'rsvp'

export default Route.extend({
    model(params) {
        let dev = this.get('store').peekRecord('developer', params.dev_id);
        let mydev = dev;
        let r = RSVP.hash({
            devId: params.dev_id,
            dev: mydev,
            name: mydev.get('name'),
            fname: mydev.get('fname')
        });
        return r;
    },
    actions: {
        backToDeveloper(model) {
            this.transitionTo('developers');
        },
        save(model) {
            let dev = get(model, 'dev');
            dev.set('name', get(model, 'name'));
            dev.set('fname', get(model, 'fname'));
            dev.save();
            this.transitionTo('developers')
            set(model, 'name', '')
            set(model, 'fname', '')
        }
    },
    renderTemplate(model) {
        this.render('developers.edit', {
            into: 'developers',
            outlet: model.model.devId,
            view: 'developers.edit'
        });
    }
});
