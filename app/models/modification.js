import DS from 'ember-data';
const { Model } = DS;
import { computed } from '@ember/object';

export default Model.extend({
    /*
    Explication :
        date : date de la modification
        referTo : id du projet au quel elle fait reference
        classHTML : pour lui donné un style par defaut mettre "white large bold"
        contents : tableaux du contenue de la modification voir /app/models/modificationcontent.js pour plus d'explication
        operation : prend les valeurs soit : "create", "update", "delete"
        object : objet projet qui fais reference a l'id dans le referTo
    
    Exemple : 
        /app/routes/project/newstory.js lignes 119 à 141
    ATENTION NE PAS OUBLIER DE CREER LES COLLECTIONS
    */
    date: DS.attr('date'),
    referTo: DS.attr(),
    classHTML: DS.attr(),
    contents: DS.hasMany('modificationcontent'),
    operation: DS.attr('number'),
    object: null,

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
    })
});
