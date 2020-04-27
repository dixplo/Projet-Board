import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
    title: DS.attr(),
    color: DS.attr(),
    project: DS.belongsTo('project'),
    showEdit: false
});