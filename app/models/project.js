import DS from 'ember-data';
const { Model } = DS;
import EmberObject, { computed } from '@ember/object';

export default Model.extend({
    name: DS.attr(),
    description: DS.attr(),
    startDate: DS.attr('utc'),
    endDate: DS.attr('utc'),
    stories: DS.hasMany('story'),
    owner: DS.belongsTo('developer'),
    developers: DS.hasMany('developer'),
    stringStartDate: computed('startDate', function () {
        var string = "00/00/0000";
        if (this.get('startDate') !== null && this.get('startDate') !== undefined) {
            string = this.get('startDate').getDate() + "/" + (this.get('startDate').getMonth() + 1) + "/" + this.get('startDate').getFullYear();
        }
        return string;
    }),
    stringEndDate: computed('endDate', function () {
        var string = "00/00/0000";
        if (this.get('endDate') !== null && this.get('endDate') !== undefined) {
            string = this.get('endDate').getDate() + "/" + (this.get('endDate').getMonth() + 1) + "/" + this.get('endDate').getFullYear();
        }
        return string;
    })
});
