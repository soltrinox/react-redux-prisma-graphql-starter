import {createStore, reducer} from 'easy-peasy'
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist'
import {reducer as formReducer} from 'redux-form'
import createEncryptor from '@packages/redux-storage-encrypt'
import {createLogger} from 'redux-logger'

import {createReduxHistory, routerMiddleware, routerReducer} from '../router'
import model from './ducks'

// ! logger must be the last middleware in chain
// ! https://github.com/LogRocket/redux-logger/issues/20
const middleware = [routerMiddleware]

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    collapsed: true
  })
  middleware.push(logger)
}

const encryptor =
  process.env.NODE_ENV === 'production'
    ? createEncryptor({
        u: '71d5ee9e-3b32-11e9-b210-d663bd873d93',
        onError: error => {
          console.error(error.message)
        }
      })
    : null

const store = createStore(
  {
    ...model,
    router: reducer(routerReducer),
    form: reducer(formReducer)
  },
  {
    // ENABLE CACHE
    // reducerEnhancer: reducer =>
    //   persistReducer(
    //     {
    //       key: '$state',
    //       storage,
    //       blacklist: ['router', 'auth'],
    //       transforms: encryptor ? [encryptor] : []
    //     },
    //     reducer
    //   ),
    middleware
  }
)

// In case of change in the model, webpack can reload the state
// else React hot loader breaks it
if (module.hot) {
  module.hot.accept('./ducks', () => {
    const nextModel = require('./ducks/index')
    store.replaceReducer(nextModel)
  })
}

if (process.env.NODE_ENV === 'development') {
  window.$r = store
}

const persistor = persistStore(store)

export const history = createReduxHistory(store)

export {store, persistor}
// export {store}
