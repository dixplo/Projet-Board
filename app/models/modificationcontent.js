import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
    /*
    Explication :
        text : prend les valeurs soit : "create story", "create project", "create task", "in story", "in project", "in task", "update", ...(a voir)
        referTo : id de l'objet au qu'elle il fait reference soit : story, task
        classHTML : pour lui donné un style par defaut mettre "ui teal text"
        order : ordre dans le quel l'objet modificationcontent dois apparaitre
        object : objet story ou task qui fais referance a l'id dans le referTo
    */
    text: DS.attr(),
    referTo: DS.attr(),
    classHTML: DS.attr(),
    order: DS.attr('number'),
    object: null
});
