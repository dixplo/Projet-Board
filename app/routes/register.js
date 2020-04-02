import Route from '@ember/routing/route';
import $ from 'jquery';
import { next } from '@ember/runloop';
import { get, set } from '@ember/object';

export default Route.extend({
    model() {

        return {
            selectedImage: "ade",
            selectedLanguages: [],
            avatars: ["ade", "bob", "christian", "daniel", "elliot", "elyse", "eve", "ines", "joe", "justen", "laura", "lena", "lindsay", "marie", "mark", "matthew", "molly", "nan", "pablo", "steve", "tom", "veronika"],
            languages: [".net", "c++", "css", "dart", "html", "java", "javascript", "kotlin", "objective-c", "php", "python", "swift"]
        };
    },
    actions: {
        register(model) {
            let developer = this.store.createRecord('developer', {
                name: model.name,
                email: model.email,
                fname: model.fname,
                username: model.username,
                avatar: model.selectedImage,
                languagesString: JSON.stringify(model.selectedLanguages)
            });
            developer.save();
            let user = this.store.createRecord('user', {
                email: model.email,
                password: model.password,
                developerId: developer.id
            });
            user.save();
            let m = this.modelFor("application");
            set(m, "connected", true);
            set(m, "user", user);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem("connected", true);
            localStorage.setItem("developerId", developer.id);
            this.transitionTo("overview", "myProject");
        },
        changeImagePlus(model) {
            let avatars = get(model, "avatars");
            let index = avatars.indexOf(get(model, "selectedImage"));

            if (avatars.length - 1 > index) {
                set(model, "selectedImage", avatars[index + 1]);
            } else {
                set(model, "selectedImage", avatars[0]);
            }
        },
        changeImageMinus(model) {
            let avatars = get(model, "avatars");
            let index = avatars.indexOf(get(model, "selectedImage"));

            if (0 < index) {
                set(model, "selectedImage", avatars[index - 1]);
            } else {
                set(model, "selectedImage", avatars[avatars.length - 1]);
            }
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
            if (password == repassword && repassword != "") {
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
                model.samePassword == true &&
                model.selectLanguages == true
            ) {
                set(model, "allFields", true)
            } else {
                set(model, "allFields", false)
            }
        });
        $('.ui.dropdown').dropdown({
            on: 'hover'
        });
        $("#selectLanguagesRegister").change(function () {
            var selected = jQuery('#selectLanguagesRegister')[0].selectedOptions;
            let model = self.modelFor('register');
            if (selected.length > 0) {
                set(model, "selectLanguages", true)
            } else {
                set(model, "selectLanguages", false)
            }
            set(model, "selectedLanguages", [])
            for (let option of selected) {
                if (!(option instanceof Number)) {
                    let index = option.index - 1;
                    if (index != -1) {
                        get(model, "selectedLanguages").push(get(model, "languages")[index])
                    }
                }
            }
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
                model.samePassword == true &&
                model.selectLanguages == true
            ) {
                set(model, "allFields", true)
            } else {
                set(model, "allFields", false)
            }
        });
    }
});
