import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('developers', function () {
    this.route('new', { path: '/new' });
    this.route('edit', { path: '/edit/:dev_id' });
    this.route('delete', { path: '/delete/:dev_id' });
  });

  this.route('projects', { path: "projects/:what" }, function () {
    this.route('new');
    this.route('edit', { path: '/edit/:project_id' });
  });


  this.route('project', { path: '/project/:project_id' }, function () {
    this.route('newstory', { path: "/story/new" });

    this.route('story', { path: '/story/:story_id' }, function () {
      this.route('edit', { path: "/edit" });
    });
    this.route('board');
    this.route('stories', function () {
    });
    this.route('home');
  });

  this.route('login');
  this.route('register');
  this.route('overview', { path: 'overview/:what' });

  this.route('developer', { path: 'developer/:developer_id' }, function () {
    this.route('home');
  });
  this.route('profil');
});

export default Router;
