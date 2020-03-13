import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
    name: DS.attr(),
    fname: DS.attr(),
    ownerProjects: DS.hasMany('project', {inverse: 'owner'}),
    projects: DS.hasMany('project'),
    stories: DS.hasMany('story')
});
