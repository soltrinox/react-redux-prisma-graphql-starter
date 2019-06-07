import {thunk} from 'easy-peasy'
import {reset} from 'redux-form'
import gql from 'graphql-tag'

const CATEGORIES_QUERY = gql`
  query CATEGORIES_QUERY {
    challengeCategories {
      id
      name
      description
    }
  }
`

const CREATE_CATEGORY_MUTATION = gql`
  mutation CREATE_CATEGORY_MUTATION($name: String!, $description: String) {
    createChallengeCategory(data: {name: $name, description: $description}) {
      id
      name
      description
    }
  }
`

const UPDATE_CATEGORY_MUTATION = gql`
  mutation UPDATE_CATEGORY_MUTATION(
    $id: ID!
    $name: String!
    $description: String
  ) {
    updateChallengeCategory(
      where: {id: $id}
      data: {name: $name, description: $description}
    ) {
      id
      name
      description
    }
  }
`

const DELETE_CATEGORY_MUTATION = gql`
  mutation DELETE_CATEGORY_MUTATION($id: ID!) {
    deleteChallengeCategory(where: {id: $id}) {
      id
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

const Categories = {
  ...initialState,
  add: (state, payload) => {
    state.list.push(payload)
  },
  edit: (state, payload) => {
    const categoryIndex = state.list.findIndex(
      category => category.id === state.editingKey
    )
    state.list[categoryIndex] = payload
  },
  remove: (state, payload) => {
    state.list = [...state.list.filter(category => category.id !== payload)]
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
  setInitialState: (state, payload) => {
    state.list = payload
  },
  clear: (state, payload) => {
    state.list = []
  },
  create: thunk(async (actions, payload, store) => {
    actions.toggleLoading()
    try {
      const {
        data: {createChallengeCategory: category}
      } = await window.$ap.mutate({
        mutation: CREATE_CATEGORY_MUTATION,
        variables: payload
      })
      actions.add(category)
      store.dispatch(reset('createCategory'))
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
        data: {updateChallengeCategory: category}
      } = await window.$ap.mutate({
        mutation: UPDATE_CATEGORY_MUTATION,
        variables: payload
      })
      actions.edit(payload)
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
        mutation: DELETE_CATEGORY_MUTATION,
        variables: payload
      })
      actions.remove(payload.id)
      actions.setError(null)
    } catch (err) {
      actions.setError(err)
    }
    actions.toggleLoading()
  })
}

export default Categories
