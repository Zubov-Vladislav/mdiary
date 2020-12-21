/** @jsx jsx */
import jsx from 'jsx-native-events';
import React, {useState} from 'react';
import {Meteor} from "meteor/meteor";
import FormField from "../../components/FormField";
import Button from "../../components/Button";

const initialUser = {
  username: '',
  password: ''
}

const Login = ({history}) => {
  const [{username, password}, setUser] = useState(initialUser)


  const onChangeField = (fieldName) => ({target: {value}}) => {
    setUser(user => ({
      ...user,
      [fieldName]: value
    }))
  }

  const submitHandler = async () => {
    if (password && username) {
      await Meteor.loginWithPassword(username, password);
      history.push('/')
    }
  }

  return <nu-flex
    height='100vh'
    content='center'
    items='center'
    flow='column'
  >
    <nu-h1 padding='0 0 3x 0'>Login</nu-h1>
    <nu-form>
      <nu-flex
        content='center'
        flow='column'
        gap='2x'
      >
        <FormField
          label='Username'
          placeholder='Username'
          name='username'
          value={username}
          onInput={onChangeField('username')}/>
        <FormField
          label='Password'
          placeholder='Password'
          type='password'
          value={password}
          onInput={onChangeField('password')}/>

          <Button
            onClick={submitHandler}
            onKey={submitHandler}
          >Login</Button>
      </nu-flex>
    </nu-form>
  </nu-flex>


}
export default Login
