import { check } from 'meteor/check';
import TaskCollection from '../../db/collections/TaskCollection';

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);
    
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }
    
    TaskCollection.insert({
      text,
      createdAt: new Date,
      userId: this.userId,
    })
  },
  'tasks.update'(task, text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

    TaskCollection.update({ _id: task._id, userId: this.userId }, {
      ...task,
      text
    })
  },
  'tasks.remove'(taskId) {
    check(taskId, String);
    
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }
    
    const task = TaskCollection.findOne({ _id: taskId, userId: this.userId });
    
    if (!task) {
      throw new Meteor.Error('Access denied.');
    }
    
    TaskCollection.remove(taskId)
  },
  
  'tasks.setChecked'(taskId, checked) {
    check(taskId, String)
    check(checked, Boolean)
    
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }
    
    const task = TaskCollection.findOne({ _id: taskId, userId: this.userId });
    
    if (!task) {
      throw new Meteor.Error('Access denied.');
    }
    
    TaskCollection.update(taskId, {
      $set: {
        checked
      }
    })
  }
})
