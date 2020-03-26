import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
    title: DS.attr(),
    project: DS.belongsTo('project'),
    order: DS.attr('number')
});
