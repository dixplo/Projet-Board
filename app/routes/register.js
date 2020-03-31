import Route from '@ember/routing/route';
import $ from 'jquery';
import { next } from '@ember/runloop';
import { set } from '@ember/object';

export default Route.extend({
    model() {
        return {};
    },
    actions: {
        register(model) {
            let developer = this.store.createRecord('developer', {
                name: model.name,
                fname: model.fname,
                username: model.username
            });
            developer.save();
            let user = this.store.createRecord('user', {
                email: model.email,
                password: model.password,
                developer: developer
            });
            user.save();
            let m = this.modelFor("application");
            set(m, "connected", true);
            set(m, "user", user);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem("connected", true);
            this.transitionTo("home");
        },
        didTransition() {
            next(this, 'initUI');
        }
    },
    initUI() {
        let self = this;
        $('#password').keyup(function () {
            let model = self.modelFor('register');
            let password = model.password;
            if (password.match(/[A-Z]/g)) {
                set(model, "upperPassord", true)
            } else {
                set(model, "upperPassord", false)
            }
            if (password.match(/[a-z]/g)) {
                set(model, "lowerPassord", true)
            } else {
                set(model, "lowerPassord", false)
            }
            if (password.match(/[0-9]/g)) {
                set(model, "numberPassord", true)
            } else {
                set(model, "numberPassord", false)
            }
            let repassword = model.repassword;
            if (password == repassword) {
                set(model, "samePassword", true)
            } else {
                set(model, "samePassword", false)
            }
        });
        $('#repassword').keyup(function () {
            let model = self.modelFor('register');
            let password = model.password;
            let repassword = model.repassword;
            if (password == repassword) {
                set(model, "samePassword", true)
            } else {
                set(model, "samePassword", false)
            }
        });
        $('input').keyup(function () {
            let model = self.modelFor('register');
            if (
                model.email !== undefined && model.email != "" &&
                model.fname !== undefined && model.fname != "" &&
                model.name !== undefined && model.name != "" &&
                model.username !== undefined && model.username != "" &&
                model.password !== undefined &&
                model.upperPassord == true &&
                model.lowerPassord == true &&
                model.numberPassord == true &&
                model.password.length > 8 &&
                model.repassword !== undefined &&
                model.samePassword == true
            ) {
                set(model, "allFields", true)
            } else {
                set(model, "allFields", false)
            }
        });
    }
});
