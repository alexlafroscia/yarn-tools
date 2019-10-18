import Application from "../app";
import config from "../config/environment";
import { setApplication } from "@ember/test-helpers";
import { start } from "ember-qunit";
import registerRafWaiter from "ember-raf-scheduler/test-support/register-waiter";

setApplication(Application.create(config.APP));

registerRafWaiter();

start();
