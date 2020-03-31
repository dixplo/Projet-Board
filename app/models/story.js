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
    modificationDate: DS.attr('utc'),
    ratioTasks: computed('tasks.@each.finished', function () {
        let tasks = this.get('tasks');
        var finished = 0;
        tasks.toArray().forEach(task => {
            if (task.finished) {
                finished++;
            }
        });
        return parseInt(finished/tasks.length*100) +" %"
    })
});
