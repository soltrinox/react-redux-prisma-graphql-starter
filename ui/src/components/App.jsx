import React, {useState, useEffect} from 'react'
import {hot} from 'react-hot-loader'
import {useActions, useStore} from 'easy-peasy'
import PropTypes from 'prop-types'
import {ApolloProvider} from 'react-apollo'
import {SpinUI} from './UI'

import setupApollo from '../apollo'

if (process.env.NODE_ENV !== 'production') {
  // ! Common Fixing Scenarios
  // ! http://bit.ly/wdyr02
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React)
}

const propTypes = {
  children: PropTypes.node.isRequired
}
function App({children}) {
  const [client, setClient] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const {list: settings, error} = useStore(store => store.settings)
  const {fetch: fetchSettings} = useActions(actions => actions.settings)

  if (!settings.length && !error) {
    init()
  }

  async function init() {
    const client = await setupApollo()
    window.$ap = client

    await fetchSettings()
    setClient(client)
    setLoaded(true)
  }

  if (!loaded) {
    return <SpinUI tip="Creating master plan..." size="large" />
  }
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

App.propTypes = propTypes

export default hot(module)(App)
