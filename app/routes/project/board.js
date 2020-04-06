import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { get, set } from '@ember/object';

export default Route.extend({
    async model() {
        let project_id = this.modelFor('project').project_id;
        let project = await this.store.findRecord('project', project_id, {
            reload: true,
            include: 'developers,stories,stories.tasks,tags,steps'
        });
        let developers = await project.get('developers');
        let stories = await project.get('stories');
        await stories.forEach(async story => {
            await story.get('tasks');
        });
        await this.store.findAll('step', { filter: { project: project_id } })
        let retour = RSVP.hash({
            project: project,
            project_id: project_id
        });
        
        let m = this.modelFor('project')
        set(m, "whereIAm", 2);
        set(m, "color", "#00B5AD");
        return retour;
    },
    actions: {
        addStep(model) {
            let title = get(model, 'stepTitle');
            if (title === undefined) {
                jQuery('body')
                    .toast({
                        class: 'error',
                        title: "Warning",
                        showIcon: true,
                        message: "You must enter a step title to add it !",
                        showProgress: 'bottom',
                        classProgress: 'black',
                    });
                return
            }
            let project = get(model, 'project');
            let steps = get(project, 'steps');
            let step = this.store.createRecord('step', {
                title: title,
                project: project,
                order: steps.length
            });
            step.save();
            steps.toArray().addObject(step);
            set(project, 'steps', steps);
            project.save()
            jQuery('body')
                .toast({
                    class: 'success',
                    title: "Success add Step",
                    showIcon: true,
                    message: "Step " + title + " successfully added !",
                    showProgress: 'bottom',
                    classProgress: 'white'
                });
            set(model, 'stepTitle', undefined);
        },
        minusStep(model, step) {
            var order = get(step, 'order');
            if (order > 0) {
                let previousStep = get(model, 'project').stepsOrdered.toArray()[order - 1];
                set(previousStep, 'order', order);
                previousStep.save()
                set(step, 'order', order - 1);
                step.save();
            }
        },
        plusStep(model, step) {
            var order = get(step, 'order');
            let stepList = get(model, 'project').stepsOrdered;
            if (order < stepList.length) {
                let nextStep = stepList.toArray()[order + 1];
                set(nextStep, 'order', order);
                nextStep.save()
                set(step, 'order', order + 1);
                step.save();
            }
        },
        async addToStep(storyId, step) {
            let model = this.modelFor('project.board');
            var story = null;
            let stories = await get(model.project, 'stories');
            stories.forEach(mStory => {
                if (mStory.id == storyId) {
                    story = mStory;
                }
            });
            if (story == null) {
                return
            }
            set(story, 'step', step);
            story.save();
        },
        async activate(story) {
            let model = this.modelFor('project.board');
            let stories = await get(model.project, 'stories');
            stories.forEach(mStory => {
                if (story.id == mStory.id) {
                    set(story, 'active', !get(story, 'active'));
                } else {
                    set(mStory, 'active', false);
                }
            });
        },
        open(story) {
            let project_id = this.modelFor('project.board').project_id;
            this.transitionTo("/project/" + project_id + "/story/" + story.id);
        }
    }
});
