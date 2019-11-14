import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route("all");
  this.route("installed");
});

export default Router;
