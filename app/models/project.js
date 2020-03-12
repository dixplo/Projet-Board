import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
    name: DS.attr(),
    descriptif: DS.attr(),
    startDate: DS.attr('date'),
    endDate: DS.attr('date'),
    stories: DS.hasMany('story'),
    owner: DS.belongsTo('developer'),
    developers: DS.hasMany('developer')
});
