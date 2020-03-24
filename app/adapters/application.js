import DS from 'ember-data';
import { pluralize } from 'ember-inflector';
 
var Adapater=DS.RESTAdapter.extend({
  ajaxOptions: function(url, type, options) {
    var hash = this._super(url, type, options);
    if (type == 'POST' || type=='PUT') {
      hash.dataType = 'text';
    }
    return hash;
  },
  host:'http://127.0.0.1:8081',
  namespace: 'ex4',
  urlForDeleteRecord(id, modelName) {
    modelName=pluralize(modelName);
    return this.get('host')+'/'+this.get('namespace')+`/${modelName}/*?filter={_id:'${id}'}`;
  },
  urlForQuery(query,modelName) {
  if (this.sortQueryParams) {
    query = this.sortQueryParams(query);
  }
  modelName=pluralize(modelName);
    return this.get('host')+'/'+this.get('namespace')+'/'+modelName+'?filter='+JSON.stringify(query.filter);
  }
});
 
export default Adapater;