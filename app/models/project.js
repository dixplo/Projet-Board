import DS from 'ember-data';
const { Model } = DS;
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';

export default Model.extend({
    name: DS.attr(),
    description: DS.attr(),
    startDate: DS.attr('utc'),
    endDate: DS.attr('utc'),
    stories: DS.hasMany('story'),
    owner: DS.belongsTo('developer'),
    developers: DS.hasMany('developer'),
    tags: DS.hasMany('tag'),
    steps: DS.hasMany('step'),
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
    haveStoriesWithNoStep: computed('stories.@each.step', function () {
        return this.get('stories').filter((story) => {
            return story.get('step').get('id') == undefined;
        });
    }),
    stepsOrdered: sort('steps.@each.order', function (a, b) {
        if (a.order > b.order) {
            return 1;
        } else if (a.order < b.order) {
            return -1;
        }

        return 0;
    }),
    stepsOrderedTable: computed('stepsOrdered', function () {
        let retour = [];
        let steps = this.get('stepsOrdered');
        let numberTab = Math.ceil((steps.length + 1) / 4);
        let d = retour[1];
        for (let i = 0; i < numberTab; i++) {
            let tab = [];
            var one = false;
            for (let j = i * 4; j < (i + 1) * 4; j++) {
                let step = steps.toArray()[j];
                if (step !== undefined) {
                    tab.push(step);
                } else {
                    if (!one && i == numberTab - 1) {
                        one = true;
                        tab.push("addStep");
                    }
                }
            }
            retour.push(tab);
        }
        return retour;
    }),
    storiesOrdered: sort('stories.@each.estimate', function (a, b) {
        if (a.estimate > b.estimate) {
            return 1;
        } else if (a.estimate < b.estimate) {
            return -1;
        }

        return 0;
    })
});
