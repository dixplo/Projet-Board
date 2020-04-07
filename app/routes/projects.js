import Route from '@ember/routing/route';

export default Route.extend({
    async model(params) {

        let allProjects = await this.get('store').findAll('project', { include: 'tags,developers,stories,steps' });
        var projects = [];
        if (params.what == "all") {
            projects = allProjects;
        } else if (params.what == "myProject") {
            if (!JSON.parse(localStorage.getItem("connected"))) {
                this.transitionTo("home")
                return {};
            }
            allProjects.forEach(async project => {
                let developers = await project.get('developers')
                developers.forEach(developer => {
                    if (developer.id == localStorage.getItem("developerId")) {
                        projects.push(project);
                    }
                })
            });
        } else if (params.what == "new") {
            this.transitionTo("projects.new")
        }
        
        return projects;
        debugger
    },
    actions: {
        openAdd() {
            this.transitionTo('projects.new');
        },
        openEdit(project) {
            this.transitionTo('/projects/edit/' + project.id);
        },
        openDelete(project) {
            this.transitionTo('projects.delete', project.id);
        },
        openProject(project) {
            this.transitionTo('/project/' + project.id + "/home");
        },
    },
});

