import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { get, set } from '@ember/object';

export default Route.extend({
    async model() {
        let project_id = this.paramsFor('project').project_id;
        let project = await this.store.findRecord('project', project_id, {
            reload: true,
            include: 'developers,stories,tags,steps'
        });
        let developers = await project.get('developers');
        let stories = await project.get('stories');
        let tags = await project.get('tags');
        let modificationcontents = await this.store.findAll('modificationcontent');
        var modifications = await this.store.query('modification', {
            filter: {
                referTo: project_id
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
        modifications = modifications.toArray().sort((a, b) => {
            if (a.date < b.date) {
                return 1;
            }
            else {
                return -1;
            }
        });

        modifications.forEach(modification => {
            if (modification.referTo == project.id) {
                set(modification, 'object', project)
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
        
        
        return RSVP.hash({
            modifications: modifications,
            project_id : project_id
        });
    },
    actions: {
        openAny(modification) {
            var isStory = false;
            let projectId = modification.referTo;
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
