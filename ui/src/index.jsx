import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'
import 'moment-countdown'

import DefaultErrorBoundary from './DefaultErrorBoundary'
import ScreensRoot from './screens/root'

// Fonts library
import './fontAwesome'

import {ThemeProvider} from 'styled-components'
import GlobalStyles from './styles/global'
import theme from './styles/themes/default'

// Redux Store
import {StoreProvider as EasyPeasyProvider} from 'easy-peasy'
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from './store'
import {Provider as ReactReduxProvider} from 'react-redux'

//Window Object
import loadWindowObject from './window'
loadWindowObject()

ReactDOM.render(
  <DefaultErrorBoundary>
    {/* <PersistGate loading={<div>Rehydrating store</div>} persistor={persistor}> */}
    <ReactReduxProvider store={store}>
      <EasyPeasyProvider store={store}>
        <ThemeProvider theme={theme}>
          <React.Fragment>
            <GlobalStyles />
            <ScreensRoot />
          </React.Fragment>
        </ThemeProvider>
      </EasyPeasyProvider>
    </ReactReduxProvider>
    {/* </PersistGate> */}
  </DefaultErrorBoundary>,
  document.getElementById('app')
)

// required for RHL (react-hot-loader)
if (module.hot) {
  module.hot.accept()
}
