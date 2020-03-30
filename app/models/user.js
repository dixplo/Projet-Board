import DS from 'ember-data';
const { Model } = DS;
import Developer from 'td4/models/developer'

export default Developer.extend({
    password: DS.attr(),
    email: DS.attr()
});
