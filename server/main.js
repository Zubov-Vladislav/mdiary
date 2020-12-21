import { Meteor } from 'meteor/meteor';
import { startUpCreateUser } from "./user";
import '/imports/api/methods/tasksMethods';
import '/imports/api/publications/tasksPublications';

startUpCreateUser(Meteor)
