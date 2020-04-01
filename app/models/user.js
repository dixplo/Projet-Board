import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
    password: DS.attr(),
    email: DS.attr(),
    developerId: DS.attr()
});
