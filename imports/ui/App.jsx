import React, {useEffect, useState} from 'react';
import Login from "./containers/Login/Login";
import {useTracker} from 'meteor/react-meteor-data'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import '../api/methods/tasksMethods';
import Tasks from "./containers/Tasks";


export const App = () => {

  const [isNumlLoaded, setIsNumlLoaded] = useState(false)

  const isUser = useTracker(() => {
    const user = Meteor.user()
    const id = Meteor.userId();
    return !!user || !!id
  });

  useEffect(() => {
    function loadScript(cb) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://cdn.jsdelivr.net/npm/numl@1.0.0-beta.12/dist/index.js';
      script.async = true;
      document.body.appendChild(script);
      if (cb) script.addEventListener('load', cb, false)
      return script
    }

    const setLoaded = () => setIsNumlLoaded(true)
    const script = loadScript(setLoaded);

    return () => script.removeEventListener('load', setLoaded, true)
  }, [])

  if (isNumlLoaded) return (
    <nu-root responsive='1900px|900px|500px'>
      <nu-theme hue='280' />
      <nu-props radius=".5x"/>
      <Router>
        <Switch>
          {isUser && <Redirect from='/login' to='/'/>}

          <Route exact path='/login' component={Login}/>

          <WithUser
            isUser={isUser}
          >
            <Redirect from='/' to='/tasks'/>
            <Route exact path='/tasks' component={Tasks}/>

          </WithUser>
        </Switch>
      </Router>
    </nu-root>
  )
  return <h1>Loading...</h1>
}

const WithUser = ({isUser, children}) => {
  if (isUser) return children
  return <Redirect from='/*' to="/login"/>
}
