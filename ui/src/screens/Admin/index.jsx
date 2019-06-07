import React from 'react'
import {Route, Redirect, Switch, Router} from 'react-router-dom'

// Layout
import AdminDashboardLayout from '../../layouts/AdminDashboard'

// screen components
import ScreensAdminHome from './Home'
import ScreensAdminCategories from './Categories'
import ScreensAdminChallenges from './Challenges'
import ScreensAdminChallenge from './Challenge'
import ScreensAdminCompetitions from './Competitions'
import ScreensAdminSettings from './Settings'

export default React.memo(function Screens() {
  return (
    <AdminDashboardLayout>
      <Switch>
        <Route exact path="/admin" component={ScreensAdminHome} />
        <Route
          exact
          path="/admin/competitions"
          component={ScreensAdminCompetitions}
        />
        <Route
          exact
          path="/admin/categories"
          component={ScreensAdminCategories}
        />
        <Route
          exact
          path="/admin/challenges"
          component={ScreensAdminChallenges}
        />
        <Route exact path="/admin/settings" component={ScreensAdminSettings} />
        <Route path="/admin/challenges/:id" component={ScreensAdminChallenge} />
        <Redirect to="/404" />
      </Switch>
    </AdminDashboardLayout>
  )
})
