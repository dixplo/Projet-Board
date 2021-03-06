import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
    title: DS.attr(),
    color: DS.attr(),
    story: DS.belongsTo('story'),
    finished: DS.attr('boolean'),
    project: DS.attr()
});
