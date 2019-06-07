import {thunk} from 'easy-peasy'
import {reset} from 'redux-form'
import gql from 'graphql-tag'

const HINTS_QUERY = gql`
  query HINTS_QUERY {
    hints {
      id
      name
      description
      penalty
      challenge {
        id
      }
    }
  }
`

const CREATE_HINT_MUTATION = gql`
  mutation CREATE_HINT_MUTATION(
    $name: String!
    $description: String!
    $penalty: Float!
    $challenge: ID!
  ) {
    createHint(
      data: {
        name: $name
        description: $description
        penalty: $penalty
        challenge: {connect: {id: $challenge}}
      }
    ) {
      id
      name
      description
      penalty
      challenge {
        id
      }
    }
  }
`

const UPDATE_HINT_MUTATION = gql`
  mutation UPDATE_HINT_MUTATION(
    $id: ID!
    $name: String!
    $description: String!
    $penalty: Float!
    $challenge: ID!
  ) {
    updateHint(
      data: {
        name: $name
        description: $description
        penalty: $penalty
        challenge: {connect: {id: $challenge}}
      }
      where: {id: $id}
    ) {
      id
      name
      description
      penalty
      challenge {
        id
      }
    }
  }
`

const DELETE_HINT_MUTATION = gql`
  mutation DELETE_HINT_MUTATION($id: ID!) {
    deleteHint(where: {id: $id}) {
      id
    }
  }
`

const UPDATE_HINTS_USED_MUTATION = gql`
  mutation UPDATE_HINTS_USED_MUTATION($id: ID!) {
    updateHintsUsed(id: $id) {
      id
      name
      description
      penalty
      challenge {
        id
      }
    }
  }
`

const initialState = {
  loading: false,
  error: null,
  list: [],
  editMode: false,
  editingKey: ''
}

const Hints = {
  ...initialState,
  add: (state, payload) => {
    state.list.push(payload)
  },
  edit: (state, payload) => {
    const hintIndex = state.list.findIndex(
      hint => hint.id === (state.editingKey || payload.id)
    )
    state.list[hintIndex] = payload
  },
  remove: (state, payload) => {
    state.list = [...state.list.filter(hint => hint.id !== payload)]
  },
  setInitialState: (state, payload) => {
    state.list = payload
  },
  toggleEditMode: (state, payload) => {
    if (state.editMode) {
      state.editMode = false
      state.editingKey = ''
    } else {
      state.editMode = true
      state.editingKey = payload
    }
  },
  setError: (state, payload) => {
    state.error = payload
  },
  toggleLoading: (state, payload) => {
    state.loading = !state.loading
  },
  clear: (state, payload) => {
    state.list = []
  },
  refetch: thunk(async (actions, payload, store) => {
    actions.toggleLoading()
    try {
      const {
        data: {hints}
      } = await window.$ap.query({
        query: HINTS_QUERY,
        fetchPolicy: 'network-only'
      })
      actions.setInitialState(hints)
      actions.setError(null)
    } catch (err) {
      actions.setError(err)
    }
    actions.toggleLoading()
  }),
  updateHintsUsed: thunk(async (actions, payload, store) => {
    actions.toggleLoading()
    try {
      const {
        data: {updateHintsUsed: hint}
      } = await window.$ap.mutate({
        mutation: UPDATE_HINTS_USED_MUTATION,
        variables: payload
      })
      actions.setError(null)
      actions.edit(hint)
      store.dispatch.challenges.updateActualPoints(hint)
      store.dispatch.users.updateHintsUsed({id: hint.id})
    } catch (err) {
      actions.setError(err)
    }
    actions.toggleLoading()
  }),
  create: thunk(async (actions, payload, store) => {
    actions.toggleLoading()
    try {
      const {
        data: {createHint: hint}
      } = await window.$ap.mutate({
        mutation: CREATE_HINT_MUTATION,
        variables: payload
      })
      actions.add(hint)
      store.dispatch(reset('createHint'))
      actions.setError(null)
    } catch (err) {
      actions.setError(err)
    }
    actions.toggleLoading()
  }),
  update: thunk(async (actions, payload, store) => {
    actions.toggleLoading()
    try {
      const {
        data: {updateHint: hint}
      } = await window.$ap.mutate({
        mutation: UPDATE_HINT_MUTATION,
        variables: payload
      })
      actions.edit(hint)
      actions.toggleEditMode()
      actions.setError(null)
    } catch (err) {
      actions.setError(err)
    }
    actions.toggleLoading()
  }),
  delete: thunk(async (actions, payload, store) => {
    actions.toggleLoading()
    try {
      await window.$ap.mutate({
        mutation: DELETE_HINT_MUTATION,
        variables: payload
      })
      actions.setError(null)
      actions.remove(payload.id)
    } catch (err) {
      actions.setError(err)
    }
    actions.toggleLoading()
  })
}

export default Hints
