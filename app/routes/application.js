import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { next } from '@ember/runloop';
import jQuery from 'jquery';
import RSVP from 'rsvp';

export default Route.extend({
    async model() {
        var developers = await this.store.findAll('developer', { reload: true });

        if (developers.length == 0) {
            let colors = ["red", "orange", "yellow", "olive", "green", "teal", "blue", "purple", "pink", "brown", "white", "grey", "black"];
            let estimates = ["coffee", "1", "2", "3", "5", "8", "13", "21", "40", "unknown"]
            let string = "Quibus occurrere bene pertinax miles explicatis ordinibus parans hastisque feriens scuta qui habitus iram pugnantium concitat et dolorem proximos iam gestu terrebat sed eum in certamen alacriter consurgentem revocavere ductores rati intempestivum anceps subire certamen cum haut longe muri distarent, quorum tutela securitas poterat in solido locari cunctorum. Ideoque fertur neminem aliquando ob haec vel similia poenae addictum oblato de more elogio revocari iussisse, quod inexorabiles quoque principes factitarunt. et exitiale hoc vitium, quod in aliis non numquam intepescit, in illo aetatis progressu effervescebat, obstinatum eius propositum accendente adulatorum cohorte. Post emensos insuperabilis expeditionis eventus languentibus partium animis, quas periculorum varietas fregerat et laborum, nondum tubarum cessante clangore vel milite locato per stationes hibernas, fortunae saevientis procellae tempestates alias rebus infudere communibus per multa illa et dira facinora Caesaris Galli, qui ex squalore imo miseriarum in aetatis adultae primitiis ad principale culmen insperato saltu provectus ultra terminos potestatis delatae procurrens asperitate nimia cuncta foedabat. propinquitate enim regiae stirpis gentilitateque etiam tum Constantini nominis efferebatur in fastus, si plus valuisset, ausurus hostilia in auctorem suae felicitatis, ut videbatur. Illud autem non dubitatur quod cum esset aliquando virtutum omnium domicilium Roma, ingenuos advenas plerique nobilium, ut Homerici bacarum suavitate Lotophagi, humanitatis multiformibus officiis retentabant. Non ergo erunt homines deliciis diffluentes audiendi, si quando de amicitia, quam nec usu nec ratione habent cognitam, disputabunt. Nam quis est, pro deorum fidem atque hominum! qui velit, ut neque diligat quemquam nec ipse ab ullo diligatur, circumfluere omnibus copiis atque in omnium rerum abundantia vivere? Haec enim est tyrannorum vita nimirum, in qua nulla fides, nulla caritas, nulla stabilis benevolentiae potest esse fiducia, omnia semper suspecta atque sollicita, nullus locus amicitiae.".replace(',', '').replace('.', '');
            let tabString = string.split(' ');

            let tabNewDev = [
                {
                    "username": "Rae",
                    "name": "Rosario",
                    "fname": "Orli",
                    "avatar": "bob",
                    "email": "user@user.user",
                    "languagesString": "[\"html\",\"javascript\",\"c++\",\"php\"]"
                },
                {
                    "username": "Zenaida",
                    "name": "Washington",
                    "fname": "Tara",
                    "avatar": "molly",
                    "email": "justo.nec.ante@diam.net",
                    "languagesString": "[\"swift\",\"python\"]"
                },
                {
                    "username": "Cody",
                    "name": "Cantrell",
                    "fname": "Leigh",
                    "avatar": "pablo",
                    "email": "pellentesque.massa.lobortis@ipsumdolorsit.com",
                    "languagesString": "[\"dart\",\"css\",\".net\"]"
                },
                {
                    "username": "Oryon3721",
                    "name": "Fontaine",
                    "fname": "Thomas",
                    "avatar": "steve",
                    "email": "thomas.fontaine@sts-sio-caen.info",
                    "languagesString": "[\"kotlin\",\"css\",\"java\",\"javascript\",\"html\"]"
                },
                {
                    "username": "Garyade",
                    "name": "Holle",
                    "fname": "Thomas",
                    "avatar": "joe",
                    "email": "thomas.holle@sts-sio-caen.info",
                    "languagesString": "[\"dart\",\"css\",\"html\"]"
                },
                {
                    "username": "NYTS",
                    "name": "Marie",
                    "fname": "Théo",
                    "avatar": "steve",
                    "email": "theo.marie@sts-sio-caen.info",
                    "languagesString": "[\"swift\",\"css\",\"javascript\",\"html\"]"
                },
                {
                    "username": "Cody",
                    "name": "Cantrell",
                    "fname": "Leigh",
                    "avatar": "pablo",
                    "email": "pellentesque.massa.lobortis@ipsumdolorsit.com",
                    "languagesString": "[\"php\"]"
                }
            ]
            let tabDeveloper = []
            tabNewDev.forEach(dev => {
                let developer = this.store.createRecord('developer', dev);
                developer.save();
                tabDeveloper.push(developer);
            })
            let user = this.store.createRecord('user', {
                email: "user@user.user",
                password: "user",
                developerId: tabDeveloper[0].id
            })
            user.save()

            let tabProjects = []
            for (let index = 0; index < 10; index++) {
                var description = ""
                if (Math.floor(Math.random() * (Math.floor(2))) % 2 == 0) {
                    let numberWord = Math.floor(Math.random() * (Math.floor(150)))
                    var startNumber = Math.floor(Math.random() * (Math.floor(tabString.length)))
                    if (startNumber + numberWord > tabString.length) {
                        startNumber = startNumber - 150
                        if (startNumber < 0) {
                            startNumber = 0
                        }
                    }
                    for (let i = startNumber; i < startNumber + numberWord; i++) {
                        const word = tabString[i]
                        description = description + " " + word
                    }
                }
                var name = ""
                let numberWord = Math.floor(Math.random() * (Math.floor(5)))
                while (numberWord < 1) {
                    numberWord = Math.floor(Math.random() * (Math.floor(5)))
                }
                var startNumber = Math.floor(Math.random() * (Math.floor(tabString.length)))
                if (startNumber + numberWord > tabString.length) {
                    startNumber = startNumber - 5
                    if (startNumber < 0) {
                        startNumber = 0
                    }
                }
                for (let i = startNumber; i < startNumber + numberWord; i++) {
                    const word = tabString[i]
                    name = name + " " + word
                }
                let startDate = new Date(new Date(2018, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2018, 0, 1).getTime()));
                var endDate = "????-??-??"
                if (Math.floor(Math.random() * (Math.floor(2))) % 2 == 0) {
                    endDate = new Date(startDate.getTime() + Math.random() * (new Date().getTime() - startDate.getTime()))
                }
                let project = this.store.createRecord('project', {
                    name: name,
                    description: description,
                    startDate: startDate,
                    endDate: endDate
                })
                project.save()
                tabProjects.pushObject(project)

            }


            tabProjects.forEach(project => {
                var numberDev = Math.floor(Math.random() * (Math.floor(tabDeveloper.length)))
                if (numberDev == 0) {
                    numberDev = 1
                }
                for (let index = 0; index < numberDev; index++) {
                    let developer = tabDeveloper[Math.floor(Math.random() * (Math.floor(tabDeveloper.length)))]
                    if (project.owner == undefined) {
                        project.owner = developer
                    }
                    if (project.developers.indexOf(developer) == -1) {
                        project.developers.addObject(developer)
                    }
                }
                for (let index = 0; index < Math.floor(Math.random() * (Math.floor(60))); index++) {
                    let title = tabString[Math.floor(Math.random() * (Math.floor(tabString.length)))]
                    let color = colors[Math.floor(Math.random() * (Math.floor(colors.length)))];
                    let developer = project.developers.toArray()[Math.floor(Math.random() * (Math.floor(project.developers.length)))];

                    let tag = this.store.createRecord('tag', {
                        title: title,
                        color: color,
                        project: project
                    });
                    tag.save()
                    project.tags.addObject(tag)

                    let contents = [this.store.createRecord('modificationcontent', {
                        text: " create tag ",
                        referTo: developer.id,
                        order: 0,
                        classHTML: "ui teal text"
                    }),
                    this.store.createRecord('modificationcontent', {
                        text: " in project  ",
                        referTo: tag.id,
                        order: 1,
                        classHTML: "ui " + color + " label"
                    })]
                    contents.forEach(content => {
                        content.save();
                    })
                    let endDate = null
                    if (project.endDate instanceof Date) {
                        endDate = project.endDate
                    } else {
                        endDate = new Date(Date.now())
                    }
                    this.store.createRecord('modification', {
                        date: new Date(project.startDate.getTime() + Math.random() * (endDate.getTime() - project.startDate.getTime())),
                        contents: contents,
                        idProject: project.id,
                        idDeveloper: developer.id,
                        classHTML: "white large bold",
                        operation: "create"
                    }).save()
                }
                for (let index = 0; index < Math.floor(Math.random() * (Math.floor(10))); index++) {
                    let step = this.store.createRecord('step', {
                        title: tabString[Math.floor(Math.random() * (Math.floor(tabString.length)))],
                        project: project,
                        order: project.steps.length
                    });
                    project.steps.addObject(step)
                    step.save();
                }
                for (let index = 0; index < Math.floor(Math.random() * (Math.floor(50))); index++) {
                    let code = tabString[Math.floor(Math.random() * (Math.floor(tabString.length)))]
                    let numberWord = Math.floor(Math.random() * (Math.floor(50)))
                    var startNumber = Math.floor(Math.random() * (Math.floor(tabString.length)))
                    var description = ""
                    if (Math.floor(Math.random() * (Math.floor(2))) % 2 == 0) {
                        if (startNumber + numberWord > tabString.length) {
                            startNumber = startNumber - 50
                        }
                        for (let i = startNumber; i < startNumber + numberWord; i++) {
                            const word = tabString[i]
                            description = description + " " + word
                        }
                    }
                    var developer = undefined
                    if (Math.floor(Math.random() * (Math.floor(2))) % 2 == 0) {
                        developer = project.developers.toArray()[Math.floor(Math.random() * (Math.floor(project.developers.length)))]
                    }

                    let tags = []
                    if (Math.floor(Math.random() * (Math.floor(2))) % 2 == 0 && project.tags.length > 0) {
                        let numberTag = Math.floor(Math.random() * (Math.floor(project.tags.length)))
                        for (let i = 0; i < numberTag; i++) {
                            const tag = project.tags.toArray()[Math.floor(Math.random() * (Math.floor(project.tags.length)))]
                            if (tags.indexOf(tag) == -1) {
                                tags.push(tag)
                            }
                        }
                    }
                    var step = undefined
                    if (Math.floor(Math.random() * (Math.floor(2))) % 2 == 0 && project.steps.length > 0) {
                        step = project.steps.toArray()[Math.floor(Math.random() * (Math.floor(project.steps.length)))]
                    }
                    var estimate = undefined
                    if (Math.floor(Math.random() * (Math.floor(2))) % 2 == 0) {
                        estimate = estimates[Math.floor(Math.random() * (Math.floor(estimates.length)))]
                    }

                    var endDate = undefined
                    if (project.endDate instanceof Date) {
                        endDate = project.endDate
                    } else {
                        endDate = new Date(Date.now())
                    }
                    let createDate = new Date(project.startDate.getTime() + Math.random() * (endDate.getTime() - project.startDate.getTime()))
                    endDate = new Date(createDate.getTime() + Math.random() * (endDate.getTime() - createDate.getTime()))
                    let story = this.store.createRecord('story', {
                        code: code,
                        description: description,
                        project: project,
                        developer: developer,
                        tags: tags,
                        step: step,
                        estimate: estimate,
                        createDate: createDate,
                        endDate: endDate
                    });
                    if (Math.floor(Math.random() * (Math.floor(2))) % 2 == 0) {
                        let numberTasks = Math.floor(Math.random() * (Math.floor(15)))
                        for (let i = 0; i < numberTasks; i++) {
                            let task = this.store.createRecord('task', {
                                title: tabString[Math.floor(Math.random() * (Math.floor(tabString.length)))],
                                color: colors[Math.floor(Math.random() * (Math.floor(colors.length)))],
                                story: story,
                                finished: Math.floor(Math.random() * (Math.floor(2))) % 2 == 0,
                                project: project
                            })
                            task.save()
                            story.tasks.pushObject(task)
                        }
                    }
                    let contents = [this.store.createRecord('modificationcontent', {
                        text: " create story ",
                        referTo: project.developers.toArray()[Math.floor(Math.random() * (Math.floor(project.developers.length)))].id,
                        order: 0,
                        classHTML: "ui teal text"
                    }),
                    this.store.createRecord('modificationcontent', {
                        text: " in project  ",
                        referTo: story.id,
                        order: 1,
                        classHTML: "ui teal text"
                    })]
                    contents.forEach(content => {
                        content.save();
                    })
                    this.store.createRecord('modification', {
                        date: createDate,
                        contents: contents,
                        idProject: project.id,
                        idDeveloper: project.developers.toArray()[Math.floor(Math.random() * (Math.floor(project.developers.length)))].id,
                        classHTML: "white large bold",
                        operation: "create"
                    }).save()



                    story.save()
                    project.stories.addObject(story)

                }



                project.save();
                tabProjects.push(project);
            })

            let number = Math.floor(Math.random() * (Math.floor(tabString.length)));
        }



















        var content = [];
        let projects = await this.store.findAll('project', { reload: true });
        developers = await this.store.findAll('developer', { reload: true });
        projects.forEach(project => {
            content.push(
                {
                    category: "Projects",
                    title: project.name,
                    description: project.description,
                    url: "/project/" + project.id + "/home"
                });
        });
        developers.forEach(developer => {
            content.push(
                {
                    category: "Developers",
                    title: developer.username,
                    description: developer.fullName,
                    url: "/developer/" + developer.id + "/projects"
                });
        });
        let connected = (localStorage.getItem("connected") == "true");
        let dev = undefined;
        if (connected == true) {
            let devId = localStorage.getItem("developerId")
            developers.forEach(developer => {
                if (developer.id == devId) {
                    dev = developer

                }
            });
        }
        let retour = RSVP.hash({
            content: content,
            connected: connected,
            user: dev
        });
        return retour;
    },
    actions: {
        signOut(model) {
            set(model, "connected", false);
            set(model, "user", undefined);
            localStorage.setItem('user', undefined);
            localStorage.setItem("connected", false);
            localStorage.setItem("developerId", undefined);
            this.transitionTo('overview', "all");
        },
        goToDevelopers() {
            this.transitionTo('developers');

        },
        openProfil(model) {
            this.transitionTo('/developer/' + model.user.id + '/projects');
        },
        goToLogin() {
            this.transitionTo('login');
        },
        goToRegister() {
            this.transitionTo('register');
        },
        goToProjects(my) {
            if (my === undefined) {
                this.transitionTo('projects.new');
            } else {
                this.transitionTo('projects', my);
            }
        },
        goToHomeOverview(what) {
            this.transitionTo("overview", what);
        },
        didTransition() {
            next(this, 'initUI');
        }
    },
    initUI() {
        jQuery('.ui.dropdown').dropdown({
            on: 'hover'
        });
        jQuery('.ui.overlay').visibility({ type: 'fixed', offset: 15 });

        jQuery("#searchAll")
            .search({
                source: this.modelFor('application').content,
                searchFields: [
                    'title', 'description'
                ],
                type: "category",
                fullTextSearch: true,
                searchOnFocus: true,
                minCharacters: 0,
                maxResults: 10
            });
    }
});
