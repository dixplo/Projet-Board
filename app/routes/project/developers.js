import Route from '@ember/routing/route';
import { set } from '@ember/object';

export default Route.extend({
    model() {
        
        let m = this.modelFor('project')
        set(m, "whereIAm", 5);
        return {};
    }
});
