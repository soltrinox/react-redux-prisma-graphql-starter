import {thunk} from 'easy-peasy'

export default {
  // ACTIONS & THUNKS
  resetApolloStore: thunk(async (actions, payload) => {
    await window.$ap.resetStore()
  })
}
