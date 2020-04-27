import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { set } from '@ember/object';
import { next } from '@ember/runloop';

export default Route.extend({
    async model() {
        let m = this.modelFor('project')
        set(m, "whereIAm", 6);
        set(m, "color", "#21BA49");
        let project_id = m.project_id;
        let project = await this.store.findRecord('project', project_id, {
            reload: true,
            include: 'developers,stories,tags'
        });
        await project.get('developers');
        await project.get('stories');
        await project.get('tags');
        let retour = RSVP.hash({
            project: project,
            project_id: project_id,
            colors: [
                { name: "red", hexa: "#DB2828" },
                { name: "orange", hexa: "#F2711C" },
                { name: "yellow", hexa: "#FBBD08" },
                { name: "olive", hexa: "#b5cc18" },
                { name: "green", hexa: "#24BA45" },
                { name: "teal", hexa: "#00B5AD" },
                { name: "blue", hexa: "#2185D0" },
                { name: "purple", hexa: "#A333C8" },
                { name: "pink", hexa: "#E03997" },
                { name: "brown", hexa: "#A5673F" },
                { name: "white", hexa: "#E5E5E5" },
                { name: "grey", hexa: "#767676" },
                { name: "black", hexa: "#1B1C1D" }
            ],
            showEdit: false
        });

        return retour;
    },
    actions: {
        showEdit(model, tag) {
            set(model, "editTagTitle", tag.title);
            set(model, "oldEditTagTitle", tag.title);
            set(model, "editTagColor", tag.color);
            set(model, "showEdit", true)
            set(model, "currentEdit", tag.id)

            let colors = []
            model.colors.forEach(color => {
                colors.push({
                    "name": color.name,
                    "value": color.name,
                    "selected": color.name == tag.color
                })
            });
            jQuery('.ui.dropdown').dropdown({
                on: "hover",
                values: colors
            });
            let textTag = jQuery('#divChangeTagColor > div > div.text');
            textTag.removeClass()
            textTag.addClass("ui " + tag.color + " label text")
        },
        save(model) {
            let tag = model.project.tags.findBy('id', model.currentEdit)
            set(tag, "title", model.editTagTitle)
            set(tag, "color", model.editTagColor)
            tag.save();
            set(model, "showEdit", false);
        },
        delete(model) {
            let tag = model.project.tags.findBy('id', model.currentEdit)
            tag.destroyRecord();
            set(model, "showEdit", false);
        },
        didTransition() {
            next(this, 'initUI');
        }
    },
    initUI() {
        let model = this.modelFor("project.tags")
        jQuery('.ui.dropdown').dropdown({
            on: "hover"
        });
        jQuery('#editTagsColor').change(function () {
            var color = jQuery('#editTagsColor')[0].value;
            let textTag = jQuery('#divChangeTagColor > div > div.text');
            textTag.removeClass()
            textTag.addClass("ui " + color + " label text")
            set(model, "editTagColor", color);
        });
    }
});
