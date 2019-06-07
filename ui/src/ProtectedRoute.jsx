import React, {useEffect, useState} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useActions, useStore} from 'easy-peasy'
import PropTypes from 'prop-types'
import {SpinUI} from './components/UI'

const propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object
}

export const ProtectedRoute = ({component: Component, ...rest}) => {
  const [loading, setLoading] = useState(false)
  const {isLoggedIn, status} = useStore(store => store.auth)
  const {authenticate} = useActions(actions => actions.auth)

  if (!loading && !isLoggedIn && status !== 'AUTHENTICATING') {
    waitForAuthentication()
  }

  async function waitForAuthentication() {
    setLoading(true)
    await authenticate({redirect: true})
    setLoading(false)
  }

  if (loading) {
    return <SpinUI tip="Stealing credentials" size="large" />
  }

  return (
    <Route
      {...rest}
      render={props => {
        if (isLoggedIn) {
          return <Component {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: '/signup',
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

ProtectedRoute.propTypes = propTypes

export default ProtectedRoute
