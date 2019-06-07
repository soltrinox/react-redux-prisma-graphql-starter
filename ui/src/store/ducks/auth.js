import {thunk} from 'easy-peasy'
import {push} from 'redux-first-history'
import gql from 'graphql-tag'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $nickname: String!
    $password: String!
    $email: String!
    $invitation: String
  ) {
    signup(
      nickname: $nickname
      password: $password
      email: $email
      invitation: $invitation
    ) {
      id
      nickname
      email
      permissions
      hintsUsed {
        id
      }
    }
  }
`

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      nickname
      email
      permissions
      hintsUsed {
        id
      }
    }
  }
`

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    user {
      id
      nickname
      permissions
      hintsUsed {
        id
      }
    }
  }
`

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signout {
      message
    }
  }
`

const initialState = {
  loading: false,
  error: null,
  isLoggedIn: false,
  status: 'UNAUTHENTICATED'
}

const auth = {
  // STATE
  ...initialState,
  // Actions & Thunks
  setIsLoggedIn: (state, payload) => {
    state.isLoggedIn = payload
  },
  toggleLoading: (state, payload) => {
    state.loading = !state.loading
  },
  setError: (state, payload) => {
    state.error = payload
  },
  setStatus: (state, payload) => {
    state.status = payload
  },
  authenticate: thunk(async (actions, payload, store) => {
    actions.setStatus('AUTHENTICATING')
    try {
      const {
        data: {user}
      } = await window.$ap.query({
        query: CURRENT_USER_QUERY,
        fetchPolicy: 'network-only'
      })

      actions.setIsLoggedIn(user)
      actions.setStatus('AUTHENTICATED')
      if (user) {
        await store.dispatch.users.setCurrentUser(user)
      }
    } catch (err) {
      actions.setStatus('UNAUTHENTICATED')
      if (payload && payload.redirect) {
        await store.dispatch(push('/signin'))
      }
    }
  }),
  signup: thunk(async (actions, payload, store) => {
    actions.toggleLoading()
    try {
      const {
        data: {signup: user}
      } = await window.$ap.mutate({
        mutation: SIGNUP_MUTATION,
        variables: payload
      })
      actions.setError(null)
      actions.setIsLoggedIn(true)
      store.dispatch.users.setCurrentUser(user)
      store.dispatch.notifications.show('WELCOME')
      store.dispatch(push('/'))
    } catch (err) {
      actions.setError(err)
    }
    actions.toggleLoading()
  }),
  signin: thunk(async (actions, payload, store) => {
    actions.toggleLoading()
    try {
      const {
        data: {signin: user}
      } = await window.$ap.mutate({
        mutation: SIGNIN_MUTATION,
        variables: payload
      })
      await store.dispatch.fetchInitialState()
      actions.setError(null)
      actions.setIsLoggedIn(true)
      store.dispatch.users.setCurrentUser(user)
      store.dispatch(push('/'))
    } catch (err) {
      actions.setError(err)
    }
    actions.toggleLoading()
  }),
  signout: thunk(async (actions, payload, store) => {
    actions.toggleLoading()
    try {
      const user = await window.$ap.mutate({
        mutation: SIGNOUT_MUTATION
      })
      await store.dispatch.clear()
      await window.$ap.clearStore()
      actions.setError(null)
      store.dispatch.notifications.show('BYE')
      store.dispatch(push('/signin'))
      actions.setIsLoggedIn(false)
      actions.setStatus('UNAUTHENTICATED')
      await store.dispatch.setLoadedState('user')
      await store.dispatch.users.setCurrentUser(null)
    } catch (err) {
      actions.setError(err)
    }
    actions.toggleLoading()
  })
}

export default auth
