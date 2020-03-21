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
        let date = this.get('startDate');
        if (date !== null && date !== undefined && date instanceof Date) {
            let year = date.getFullYear().toString();
            var month = (date.getMonth() + 1).toString();
            var day = date.getDate().toString();
            var newDate = year + "-";
            if (month.length == 1) { month = "0" + month; }
            if (day.length == 1) { day = "0" + day; }
            newDate += month + "-" + day;
            return newDate;
        } else if (date !== "" && date !== null) {
            return date;
        } else {
            return "0000-00-00";
        }
    }),
    stringEndDate: computed('endDate', function () {
        let date = this.get('endDate');
        if (date !== null && date !== undefined && date instanceof Date) {
            let year = date.getFullYear().toString();
            var month = (date.getMonth() + 1).toString();
            var day = date.getDate().toString();
            var newDate = year + "-";
            if (month.length == 1) { month = "0" + month; }
            if (day.length == 1) { day = "0" + day; }
            newDate += month + "-" + day;
            return newDate;
        } else if (date !== "" && date !== null) {
            return date;
        } else {
            return "0000-00-00";
        }
    }),
    storiesLength: computed('stories', function () {
        return this.get('stories').length;
    }),
    developersLength: computed('developers', function () {
        return this.get('developers').length;
    })
});
