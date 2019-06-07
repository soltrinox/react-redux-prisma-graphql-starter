import React from 'react'
import {Route, Redirect, Switch, Router} from 'react-router-dom'
import {history} from '../store'

import ProtectedRoute from '../ProtectedRoute'
import ProtectedAdminRoute from '../ProtectedAdminRoute'

// container components
import App from '../components/App'

// screen components
import ScreensHome from './Home'
import ScreensSignup from './Signup'
import ScreensSignin from './Signin'
import ScreensResults from './Results'
import ScreensAdmin from './Admin'
import Screens404 from './404'

export default function Screens() {
  return (
    <App>
      <Router history={history}>
        <Switch>
          <ProtectedRoute exact path="/" component={ScreensHome} />
          <ProtectedAdminRoute path="/admin" component={ScreensAdmin} />
          <Route path="/signup" component={ScreensSignup} />
          <Route path="/signin" component={ScreensSignin} />
          <Route path="/results" component={ScreensResults} />
          <Route component={Screens404} />
        </Switch>
      </Router>
    </App>
  )
}
