import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
    async  model() {
        let currentDevId = localStorage.getItem('developerId')
        //let currentDeveloper = await this.get('store').findRecord('developer', currentDevId)

        let developerId = this.paramsFor("developer").developer_id;
        let developer = await this.get('store').findRecord('developer', developerId)

        

        if (localStorage.getItem("connected") == "true") {
            if (currentDevId == developerId) {
                
            }
            else {
                this.transitionTo("developer").developer_id
                return
            }
        } else{
            this.transitionTo("developer").developer_id
            return
        }
      

        return RSVP.hash({
            developer:developer,
            selectedImage: "ade",
            selectedLanguages: developer.languagesString,
            avatars: ["ade", "bob", "christian", "daniel", "elliot", "elyse", "eve", "ines", "joe", "justen", "laura", "lena", "lindsay", "marie", "mark", "matthew", "molly", "nan", "pablo", "steve", "tom", "veronika"],
            languages: [".net", "c++", "css", "dart", "html", "java", "javascript", "kotlin", "objective-c", "php", "python", "swift"]
        });
       


        },
        actions: {
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
        /* la partie en commentaire me supprime l'affichage des logos des languages 
        
        didTransition() {
            next(this, 'initUI');
        },
        */
       /*
        initUI() {
            $('input').keyup(function () {
                let model = self.modelFor('register');
                if (
                    model.email !== undefined && model.email != "" &&
                    model.fname !== undefined && model.fname != "" &&
                    model.name !== undefined && model.name != "" &&
                    model.username !== undefined && model.username != "" &&
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
                    model.selectLanguages == true
                ) {
                    set(model, "allFields", true)
                } else {
                    set(model, "allFields", false)
                }
            });
        }
*/
    
}
});
