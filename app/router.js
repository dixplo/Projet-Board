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
  this.route('projects', function () {
    this.route('new');
  });
  this.route('home');

  this.route('project', { path: '/project/:project_id' }, function () {
    this.route('newstory', { path: "/story/new" });
  });

  this.route('story', { path: '/project/:project_id/story/:story_id' }, function () {
    this.route('edit');
  });

});

export default Router;
