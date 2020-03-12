import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
    code: DS.attr(),
    descriptif: DS.attr(),
    project: DS.belongsTo('project'),
    developer: DS.belongsTo('developer'),
    tags: DS.hasMany('tag'),
    tasks: DS.hasMany('task'),
    step: DS.belongsTo('step')
});
