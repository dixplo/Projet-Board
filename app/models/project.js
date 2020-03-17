import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
    name: DS.attr(),
    descriptif: DS.attr(),
    startDate: DS.attr('utc'),
    endDate: DS.attr('utc'),
    stories: DS.hasMany('story'),
    owner: DS.belongsTo('developer'),
    developers: DS.hasMany('developer')
});
