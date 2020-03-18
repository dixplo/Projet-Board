import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('developers', function() {
    this.route('add', { path: '/add' });
    this.route('edit', { path: '/edit/:dev_id' });
    this.route('delete', { path: '/delete/:dev_id' });
  });
  this.route('projects', function() {
    this.route('add');
  });
  this.route('home');
});

export default Router;
