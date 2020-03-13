import DS from 'ember-data';
const { Model } = DS;
import { computed } from '@ember/object';

export default Model.extend({
    name: DS.attr(),
    fname: DS.attr(),
    ownerProjects: DS.hasMany('project', {inverse: 'owner'}),
    projects: DS.hasMany('project', {inverse: 'developers'}),
    stories: DS.hasMany('story'),
    fullName: computed('name', 'fname', function () {
        return this.get('name')+" "+this.get('fname');
    })
});