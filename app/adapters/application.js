import DS from 'ember-data';
import { pluralize } from 'ember-inflector';
import Adapter from 'ember-local-storage/adapters/local';

export default Adapter.extend({
  modelNamespace: 'boards'
});
 
export default Adapater;