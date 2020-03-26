import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
  classNameBindings: ['isActive'],
  isActive: Ember.computed('content.active', function () {
    let content = get(this, 'content');
    if (get(content, 'active'))
      return this.get('activeClass');
    return '';
  }),
  attributeBindings: ['draggable'],
  draggable: 'true',

  dragStart(event) {
    return event.dataTransfer.setData('text/data', get(this, 'content').get('id'));
  },
  doubleClick() {
    this.sendAction("onDblClick", get(this, 'content'));
  },
  click() {
    this.sendAction("onClick", get(this, 'content'));
  }
});