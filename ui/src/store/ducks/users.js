import {thunk} from 'easy-peasy'
import gql from 'graphql-tag'

const SCORES_QUERY = gql`
  query SCORES_QUERY {
    userScores {
      id
      nickname
      score
    }
  }
`

const initialState = {
  loading: false,
  error: null,
  currentUser: null,
  list: [],
  scores: []
}

const Users = {
  ...initialState,
  setCurrentUser: (state, payload) => {
    state.currentUser = payload
    if (payload && payload.permissions) {
      state.currentUser.isAdmin = payload.permissions.includes('ADMIN')
    }
  },
  setInitialState: (state, payload) => {
    state.list = payload
  },
  setError: (state, payload) => {
    state.error = null
  },
  toggleLoading: (state, payload) => {
    state.loading = !state.loading
  },
  fetchScores: thunk(async (actions, payload, store) => {
    actions.toggleLoading()
    try {
      const {
        data: {userScores: scores}
      } = await window.$ap.query({
        query: SCORES_QUERY
      })
      actions.setScores(scores)
      actions.setError(null)
    } catch (err) {
      actions.setError(err)
    }
    actions.toggleLoading()
  }),
  setScores: (state, payload) => {
    state.scores = payload
  },
  updateScore: (state, payload) => {
    const userIndex = state.scores.findIndex(user => user.id === payload.id)
    if (userIndex === -1) {
      state.scores.push(payload)
    } else {
      state.scores[userIndex].score = payload.score
    }
  },
  updateHintsUsed: (state, payload) => {
    state.currentUser.hintsUsed.push(payload)
  }
}
export default Users
