import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
    async model() {
        var content = [];
        let listDevelopers = await this.store.findAll('developer');

        listDevelopers.forEach(developer => {
            content.push(
                {
                    category: "Developers",
                    title: developer.username,
                    description: developer.fullName,
                    url: "/developer/" + developer.id + "/home"
                });
        });


        return RSVP.hash({
            developers: this.get('store').findAll('developer'),
            content: content,
            alreadyOpen: ''
        });

    },
    actions: {
        openAdd() {
            this.transitionTo('developers.new');
        },
        openEdit(model, dev) {
            if (get(model, 'alreadyOpen') != "") {
                if (get(model, 'alreadyOpen') == dev.id) {
                    set(model, 'alreadyOpen', ""); 
                    this.transitionTo('developers');
                    return
                } else {
                    this.disconnectOutlet(get(model, 'alreadyOpen'));
                }
            }
            set(model, 'alreadyOpen', dev.id);            
            this.transitionTo('developers.edit', dev.id);
        },
        openDelete(model, dev) {
            if (get(model, 'alreadyOpen') != "") {
                if (get(model, 'alreadyOpen') == dev.id) {
                    set(model, 'alreadyOpen', ""); 
                    this.transitionTo('developers');
                    return
                } else {
                    this.disconnectOutlet(get(model, 'alreadyOpen'));
                }
            }
            set(model, 'alreadyOpen', dev.id)
            this.transitionTo('developers.delete', dev.id);
        },
        initUI() {
            jQuery('.ui.dropdown').dropdown({
                on: 'hover'
            });
            jQuery('.ui.overlay').visibility({ type: 'fixed', offset: 15 });
    
            jQuery('#searchBarDev')
                .search({
                    source: this.modelFor('developers').content,
                    searchFields: [
                        'title', 'description'
                    ],
                    type: "category",
                    fullTextSearch: true,
                    searchOnFocus: true,
                    minCharacters: 0,
                    maxResults: 10
                });
        }
    }
});
