import Component from '@ember/component';
import { set, get } from '@ember/object';

export default Component.extend({
  classNames: ['draggableDropzone'],
  classNameBindings: ['dragClass'],
  dragClass: '',

  actions: {
  dragLeave(event) {
    event.preventDefault();
    set(this, 'dragClass', '');
  },

  dragOver(event) {
    event.preventDefault();
    set(this, 'dragClass', '');
  },

  drop(event) {
    var data = event.dataTransfer.getData('text/data');
    this.sendAction('dropped', data, get(this, 'content'));
    set(this, 'dragClass', 'deactivated');
  }
}

});