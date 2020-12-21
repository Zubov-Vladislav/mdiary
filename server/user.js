import { Accounts } from 'meteor/accounts-base'

export const USERS = [
  {
    username: 'user',
    password: 'user'
  },
  {
    username: 'Username',
    password: 'password'
  },
]

export const startUpCreateUser = (Meteor) => Meteor.startup(() => {
  if (!Accounts.findUserByUsername(USERS[0].username)) {
    Accounts.createUser(USERS[0]);
  }
  if (!Accounts.findUserByUsername(USERS[1].username)) {
    Accounts.createUser(USERS[1]);
  }
})
