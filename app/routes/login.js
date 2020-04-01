import Route from '@ember/routing/route';
import $ from 'jquery';
import { next } from '@ember/runloop';
import { set } from '@ember/object';

export default Route.extend({
    model() {
        return {};
    },
    actions: {
        async login(model) {
            var user = await this.store.query('user', {
                filter: {
                    email: model.email,
                    password: model.password
                }
            });
            user = user.firstObject;
            if (user !== undefined) {
                let developer = await this.store.findRecord('developer', user.developerId)
                let m = this.modelFor("application");
                set(m, "connected", true);
                set(m, "user", developer);
                localStorage.setItem("developerId", user.developerId);
                localStorage.setItem("connected", true);
                this.transitionTo('overview', 'myProject');
            } else {
                $('body')
                    .toast({
                        class: 'error',
                        message: "Your email or password are/is uncorrect !",
                        showProgress: 'bottom',
                        classProgress: "white"
                    });
            }
        },
        didTransition() {
            next(this, 'initUI');
        }
    },
    initUI() {
        let self = this;
        $('input').keyup(function () {
            let model = self.modelFor('login');
            if (
                model.email !== undefined && model.email != "" &&
                model.password !== undefined && model.password != ""
            ) {
                set(model, "allFields", true)
            } else {
                set(model, "allFields", false)
            }
        });
    }
});
