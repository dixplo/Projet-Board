# Board project
:date: : 12/03/2020 to 01/05/2020 | :no_mobile_phones: : Only on laptop | :fr: French Developers

This project aim to represent a manage administration of projects of developers. It can be assimilate to Github.

#### Technology Used
- JSon
- AngularJS
- Node.JS
- Ember

## Contributors :
students on BTS SIO on the Saint Ursule High School in Caen.

@TheoMarie, @ThomasFont3721, @ThomasHolley

## Features

- Log in/Log out of the application
- Modify account informations
- Create a project
- Add one or several stories in a project
- Delete a story in a project
- Assign story points
- Affect / withdraw a story to a developer
- List the developers who participate to a project
- List the project which i have created
- List the project where i have participated (participation at least to one user story in the project)
- List the priority projects ( due date close)
- List the priority stories ( owned to a priority project and not end)
- List the task i have realised ( order by priority and classed by Project/story)
- Add a step
- Change a story of stage (Todo, In progress, Done…)
- Manage the tags (creation, modification, removal)
- Add / withdraw a tag on a story
- Add / withdraw tasks to a story
- Note a task like done
- Consult a project
- Consult a story
- Display the board of a project
- Display the dashboard of a user

## Diagram

![image](https://user-images.githubusercontent.com/55082849/80465049-f7fec980-893a-11ea-9188-d3a27a51ace9.png)


## Project specifications :

### Dependency :

- Ember-CLI
- Vendor

### Frameworks :
Frameworks used in the project.

- EmberJS. Framework JS.
- BootStrap. Framework Css.

### Deployment :
Project deployment used

- Heroku

### API :

- REST RESTHEART

### DataBase :

- MongoDB

### Template :

- Semantic-UI
- Fomentic-UI

### IDE :
Development environment used

- Visual Studio Code

----------------------------------------------------------------------------------------------
## Start the project :

###  Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

###  Installation

* `git clone <repository-url>` this repository
* `cd td4`
* `npm install`

###  Launch / Development

* `ember serve`
* `Mongod`
> :warning: in case of port problem with mongoDB, execute mongodb on another port like 27017 : `mongod --port 27117`
* `java -jar restheart.jar`
> :warning: in case of port problem with restheart, modify the configuration file
>  - modify port 8080
>  - comment the security part of line 165
>  - execute restheart.jar specifying the configuration file modify : `java -jar restheart.jar etc/restheart.yml`

* Visit your app at [http://localhost:4200](http://localhost:4200).


### Deploying

**User ID :** user@user.user 
**Password :** user

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
  
  -----------------------------------------------------------------------------------------------------------------------
  
  ### ScreenShot :
  
![BoardLogin](https://user-images.githubusercontent.com/55082849/81183683-c081c400-8faf-11ea-8b87-a9086cf94b82.PNG)

![BoardRegister](https://user-images.githubusercontent.com/55082849/81183688-c11a5a80-8faf-11ea-9dfd-f3b460a0aba5.PNG)

![BoardProfil](https://user-images.githubusercontent.com/55082849/81183686-c081c400-8faf-11ea-8535-ccd10cb8fb52.PNG)

![BoardSearchBar](https://user-images.githubusercontent.com/55082849/81183690-c1b2f100-8faf-11ea-941a-f89922675be8.PNG)

![boardView](https://user-images.githubusercontent.com/55082849/81183693-c24b8780-8faf-11ea-9448-166640810fdf.PNG)

![BoardViewDev](https://user-images.githubusercontent.com/55082849/81183696-c2e41e00-8faf-11ea-9b9f-c6ce1aaf65fd.PNG)

![boardAddProjet](https://user-images.githubusercontent.com/55082849/81183680-bfe92d80-8faf-11ea-9c5a-29e03b52258b.PNG)

![BoardViewProj](https://user-images.githubusercontent.com/55082849/81183698-c37cb480-8faf-11ea-98e4-8e7bf2df0cd1.PNG)

![BoardViewProjContributor](https://user-images.githubusercontent.com/55082849/81183700-c37cb480-8faf-11ea-8295-c0d5e6368ca5.PNG)

![BoardViewProjDashboard](https://user-images.githubusercontent.com/55082849/81183709-c677a500-8faf-11ea-803f-9568a53aaa99.PNG)

![BoardViewProjStories](https://user-images.githubusercontent.com/55082849/81183714-c7103b80-8faf-11ea-9fa2-277bb5951426.PNG)

![BoardViewProjTag](https://user-images.githubusercontent.com/55082849/81183717-c7a8d200-8faf-11ea-93b9-0c97422a20b9.PNG)

