import { Meteor } from 'meteor/meteor';
import TaskCollection from "../../db/collections/TaskCollection";

Meteor.publish('tasks', function publishTasks() {
  return TaskCollection.find({userId: this.userId})
})
