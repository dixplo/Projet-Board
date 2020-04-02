import DS from 'ember-data';
const { Model } = DS;
import { computed } from '@ember/object';

export default Model.extend({
    username: DS.attr(),
    email: DS.attr(),
    name: DS.attr(),
    fname: DS.attr(),
    avatar: DS.attr(),
    languagesString: DS.attr(),
    ownerProjects: DS.hasMany('project', { inverse: 'owner' }),
    projects: DS.hasMany('project', { inverse: 'developers' }),
    stories: DS.hasMany('story'),
    follow: DS.hasMany('developer'),
    fullName: computed('name', 'fname', function () {
        return this.get('name') + " " + this.get('fname');
    }),
    languages: computed('languagesString', function () {
        return JSON.parse(this.get('languagesString'));
    })
});