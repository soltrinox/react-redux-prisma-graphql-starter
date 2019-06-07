import {thunk} from 'easy-peasy'

const initialState = {}

export default {
  ...initialState,
  // ACTIONS & THUNKS
  resetApolloStore: thunk(async (state, payload) => {
    await window.$ap.resetStore()
  })
}
