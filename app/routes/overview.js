import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { get, set } from '@ember/object';

export default Route.extend({
    async model(params) {        
        let modificationcontents = await this.store.findAll('modificationcontent', { reload: true });
        let allData = await this.store.findAll('modification', { reload: true, include: 'modificationcontent' });
        let developers = await this.store.findAll('developer');
        let stories = await this.store.findAll('story');
        let tags = await this.store.findAll('tag');
        var projects = await this.store.findAll('project');
        if (params.what == "all") {
            developers.forEach(developer => {
                allData.forEach(modification => {
                    modification.contents.forEach(content => {
                        if (content.referTo == developer.id) {
                            set(content, 'object', developer)
                        }
                    })
                })
            });
            projects.forEach(project => {
                allData.forEach(modification => {
                    if (modification.referTo == project.id) {
                        set(modification, 'object', project)
                    }
                })
            });
            stories.forEach(story => {
                allData.forEach(modification => {
                    modification.contents.forEach(content => {
                        if (content.referTo == story.id) {
                            set(content, 'object', story)
                        }
                    })
                })
            });

            allData = allData.toArray().sort((a, b) => {
                if (a.date < b.date) {
                    return 1;
                }
                else {
                    return -1;
                }
            });
            allData.forEach(data => {
                let newContents = data.contents.toArray().sort((a, b) => {
                    if (a.order > b.order) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                });
                set(data, 'contents', newContents);
            })

            return RSVP.hash({
                tags: tags,
                developers: developers,
                stories: stories,
                projects: projects,
                allData: allData
            });
        } else if (params.what == "myProject" && JSON.parse(localStorage.getItem("connected"))) {
            let devId =  localStorage.getItem("developerId");
            
            let dev = await this.store.findRecord('developer', devId);
            var projects = dev.get('projects');
            let projectsId = []

            projects.forEach(project => {
                projectsId.push(project.id)
                allData.forEach(modification => {
                    if (modification.referTo == project.id) {
                        set(modification, 'object', project)
                    }
                })
            });

            developers.forEach(developer => {
                allData.forEach(modification => {
                    modification.contents.forEach(content => {
                        if (content.referTo == developer.id) {
                            set(content, 'object', developer)
                        }
                    })
                })
            });
            stories.forEach(story => {
                allData.forEach(modification => {
                    modification.contents.forEach(content => {
                        if (content.referTo == story.id) {
                            set(content, 'object', story)
                        }
                    })
                })
            });

            allData = allData.toArray().sort((a, b) => {
                if (a.date < b.date) {
                    return 1;
                }
                else {
                    return -1;
                }
            });

            allData.forEach(data => {
                if (projectsId.indexOf(data.referTo) != -1) {

                    let newContents = data.contents.toArray().sort((a, b) => {
                        if (a.order > b.order) {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                    });
                    set(data, 'contents', newContents);
                } else {
                    allData.removeObject(data)
                }
            })
            return RSVP.hash({
                tags: tags,
                developers: developers,
                stories: stories,
                projects: projects,
                allData: allData
            });
        } else {
            this.transitionTo('overview', "all");
            return {};
        }

    },
    actions: {
        openAny(model, any) {
            var isStory = false;
            let projectId = any.referTo;
            var storyId = undefined;
            any.contents.forEach(content => {
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
