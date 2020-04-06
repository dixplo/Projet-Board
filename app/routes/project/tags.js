import Route from '@ember/routing/route';
import { set } from '@ember/object';

export default Route.extend({
    model() {
        
        let m = this.modelFor('project')
        set(m, "whereIAm", 6);
        set(m, "color", "#21BA49");
        return {};
    }
});
