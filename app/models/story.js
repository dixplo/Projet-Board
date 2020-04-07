import DS from 'ember-data';
const { Model } = DS;
import { computed } from '@ember/object';

export default Model.extend({

    active: false,
    code: DS.attr(),
    description: DS.attr(),
    
    project: DS.belongsTo('project'),

    developer: DS.belongsTo('developer'),

    tags: DS.hasMany('tag'),

    tasks: DS.hasMany('task'),

    step: DS.belongsTo('step'),

    estimate: DS.attr('number'),

    createDate: DS.attr('utc'),
    endDate: DS.attr('utc'),

    ratioTasks: computed('tasks.@each.finished', function () {
        let tasks = this.get('tasks');
        var finished = 0;
        tasks.toArray().forEach(task => {
            if (task.finished) {
                finished++;
            }
        });
        return parseInt(finished / tasks.length * 100) + " %"
    }),

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
            return "????-??-??";
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
            return "????-??-??";
        }
    }),
});
