import createHistory from 'history/createBrowserHistory'
import {createReduxHistoryContext} from 'redux-first-history'

export const {
  createReduxHistory,
  routerMiddleware,
  routerReducer
} = createReduxHistoryContext({
  history: createHistory(),
  reduxTravelling: true
})
