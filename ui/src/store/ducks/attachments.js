import {thunk} from 'easy-peasy'
import {reset} from 'redux-form'
import gql from 'graphql-tag'

const CREATE_ATTACHMENT_MUTATION = gql`
  mutation CREATE_ATTACHMENT_MUTATION(
    $name: String!
    $url: String!
    $challenge: ID!
  ) {
    createAttachment(
      data: {name: $name, url: $url, challenge: {connect: {id: $challenge}}}
    ) {
      id
      name
      url
      challenge {
        id
      }
    }
  }
`

const UPDATE_ATTACHMENT_MUTATION = gql`
  mutation UPDATE_ATTACHMENT_MUTATION(
    $id: ID!
    $name: String!
    $url: String!
    $challenge: ID!
  ) {
    updateAttachment(
      data: {name: $name, url: $url, challenge: {connect: {id: $challenge}}}
      where: {id: $id}
    ) {
      id
      name
      url
      challenge {
        id
      }
    }
  }
`

const DELETE_ATTACHMENT_MUTATION = gql`
  mutation DELETE_ATTACHMENT_MUTATION($id: ID!) {
    deleteAttachment(where: {id: $id}) {
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

const Attachments = {
  ...initialState,
  add: (state, payload) => {
    state.list.push(payload)
  },
  edit: (state, payload) => {
    const attachmentIndex = state.list.findIndex(
      attachment => attachment.id === state.editingKey
    )
    state.list[attachmentIndex] = payload
  },
  remove: (state, payload) => {
    state.list = [...state.list.filter(attachment => attachment.id !== payload)]
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
        data: {createAttachment: attachment}
      } = await window.$ap.mutate({
        mutation: CREATE_ATTACHMENT_MUTATION,
        variables: payload
      })
      actions.add(attachment)
      store.dispatch(reset('createAttachment'))
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
        data: {updateAttachment: attachment}
      } = await window.$ap.mutate({
        mutation: UPDATE_ATTACHMENT_MUTATION,
        variables: payload
      })
      actions.edit(attachment)
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
        mutation: DELETE_ATTACHMENT_MUTATION,
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

export default Attachments
