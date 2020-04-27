import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { set } from '@ember/object';

export default Route.extend({
    async model() {
        let project_id = this.paramsFor('project').project_id;
        let project = await this.store.findRecord('project', project_id, {
            reload: true,
            include: 'developers,stories,tags,steps'
        });
        let developers = await project.get('developers');
        let stories = await project.get('stories');

        let tags = await this.store.query('tag', {
            filter: {
                project: project_id
            }
        });
       await this.store.findAll('modificationcontent');
        var modifications = await this.store.query('modification', {
            filter: {
                idProject: project_id
            }
        });

        developers.forEach(developer => {
            modifications.forEach(modification => {
                modification.contents.forEach(content => {
                    if (content.referTo == developer.id) {
                        set(content, 'object', developer)
                    }
                })
            })
        });
        stories.forEach(story => {
            modifications.forEach(modification => {
                modification.contents.forEach(content => {
                    if (content.referTo == story.id) {
                        set(content, 'object', story)
                    }
                })
            })
        });
        tags.forEach(tag => {
            modifications.forEach(modification => {
                modification.contents.forEach(content => {
                    if (content.referTo == tag.id) {
                        set(content, 'object', tag)
                    }
                })
            })
        });

        modifications = modifications.toArray().sort((a, b) => {
            if (a.date < b.date) {
                return 1;
            }
            else {
                return -1;
            }
        });

        modifications.forEach(modification => {
            if (modification.idProject == project.id) {
                set(modification, 'project', project)
            }
            let newContents = modification.contents.toArray().sort((a, b) => {
                if (a.order > b.order) {
                    return 1;
                }
                else {
                    return -1;
                }
            });
            set(modification, 'contents', newContents);
        })
        console.log(modifications);

        let modificationsOrderedTable = null;
        let retour = [];
        let numberByRow = 3;
        let numberTab = Math.ceil((modifications.length + 1) / numberByRow);
        for (let i = 0; i < numberTab; i++) {
            let tab = [];
            for (let j = i * numberByRow; j < (i + 1) * numberByRow; j++) {
                let step = modifications.toArray()[j];
                if (step !== undefined) {
                    tab.push(step);
                } else {
                    tab.push("hidden");
                }
            }
            retour.push(tab);
        }
        modificationsOrderedTable = retour;
        console.log(modificationsOrderedTable);
        
        let m = this.modelFor('project')
        set(m, "whereIAm", 1);
        set(m, "color", "#FFD700");

        return RSVP.hash({
            modifications: modifications,
            modificationsOrderedTable: modificationsOrderedTable,
            project_id: project_id
        });
    },
    actions: {
        openAny(modification) {
            var isStory = false;
            let projectId = modification.idProject;
            var storyId = undefined;
            modification.contents.forEach(content => {
                if (content.object._internalModel.modelName == "story") {
                    isStory = true;
                    storyId = content.referTo;
                }
            });
            if (isStory) {
                this.transitionTo('/project/' + projectId + '/story/' + storyId);
            } else {
                this.transitionTo('/project/' + projectId + "/home");
            }
        }
    }
});
