import React, {useEffect, useState} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useActions, useStore} from 'easy-peasy'
import PropTypes from 'prop-types'
import {SpinUI} from './components/UI'

const propTypes = {
  component: PropTypes.object.isRequired,
  location: PropTypes.object
}

const ProtectedAdminRoute = ({component: Component, ...rest}) => {
  const [loading, setLoading] = useState(false)
  const {isLoggedIn} = useStore(store => store.auth)
  const currentUser = useStore(store => store.users.currentUser)
  const {authenticate} = useActions(actions => actions.auth)
  const showNotification = useActions(actions => actions.notifications.show)

  if (!loading && !isLoggedIn && status !== 'AUTHENTICATING') {
    waitForAuthentication()
  }

  async function waitForAuthentication() {
    setLoading(true)
    await authenticate({redirect: true})
    setLoading(false)
  }

  if (loading) {
    return <SpinUI size="large" />
  }

  return (
    <Route
      {...rest}
      render={props => {
        if (isLoggedIn && currentUser.isAdmin) {
          return <Component {...props} />
        } else {
          showNotification('ADMIN_ACCESS_ONLY')
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location
                }
              }}
            />
          )
        }
      }}
    />
  )
}

ProtectedAdminRoute.propTypes = propTypes

export default ProtectedAdminRoute
