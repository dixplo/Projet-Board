import DS from 'ember-data';
const { Model } = DS;
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';

export default Model.extend({
    /*
    Explication :
        date : date de la modification
        idProject : id du projet au quel elle fait reference
        idDeveloper : id du developer au quel elle fait reference
        classHTML : pour lui donné un style par defaut mettre "white large bold"
        contents : tableaux du contenue de la modification voir /app/models/modificationcontent.js pour plus d'explication
        operation : prend les valeurs soit : "create", "update", "delete"
        project : objet projet qui fais reference a l'id dans le idProject    
    Exemple : 
        /app/routes/project/newstory.js lignes 119 à 141
    ATENTION NE PAS OUBLIER DE CREER LES COLLECTIONS
    */
    date: DS.attr('date'),
    idProject: DS.attr(),
    idDeveloper: DS.attr(),
    classHTML: DS.attr(),
    contents: DS.hasMany('modificationcontent'),
    operation: DS.attr(),
    project: null,

    stringDate: computed('date', function () {
        let date = this.get('date');
        if (date !== null && date !== undefined) {
            if (!(date instanceof Date)) {
                date = new Date(date);
            }
            var month = (date.getMonth() + 1).toString();
            var day = date.getDate().toString();
            var hour = date.getHours().toString();
            var minute = date.getMinutes().toString();
            if (month.length == 1) { month = "0" + month; }
            if (day.length == 1) { day = "0" + day; }
            if (hour.length == 1) { hour = "0" + hour; }
            if (minute.length == 1) { minute = "0" + minute; }

            var newDate = hour + ":" + minute
                + " " + day + "/" + month
                + "/" + date.getFullYear().toString();
            return newDate;
        } else {
            return "??:?? ??/??/????";
        }
    }),
    contentsLengthMinusOne: computed('contents', function () {
        return this.get("contents").length - 1;
    }),
    contentsOrdered: sort('contents.@each.order', function (a, b) {
        if (a.order > b.order) {
            return 1;
        } else if (a.order < b.order) {
            return -1;
        }
        return 0;
    })
});
