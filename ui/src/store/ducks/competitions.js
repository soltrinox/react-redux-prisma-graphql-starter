import {thunk} from 'easy-peasy'
import {reset} from 'redux-form'
import gql from 'graphql-tag'

const CREATE_COMPETITION_MUTATION = gql`
  mutation CREATE_COMPETITION_MUTATION(
    $name: String!
    $startTime: DateTime!
    $endTime: DateTime!
  ) {
    createCompetition(
      data: {name: $name, startTime: $startTime, endTime: $endTime}
    ) {
      id
      name
      status
      visibility
      startTime
      endTime
      pausedTime
      description
    }
  }
`

const UPDATE_COMPETITION_MUTATION = gql`
  mutation UPDATE_COMPETITION_MUTATION(
    $id: ID!
    $name: String!
    $description: String
    $startTime: DateTime!
    $endTime: DateTime!
    $status: CompetitionStatus!
    $visibility: CompetitionVisibility!
  ) {
    updateCompetition(
      where: {id: $id}
      data: {
        name: $name
        startTime: $startTime
        endTime: $endTime
        description: $description
        status: $status
        visibility: $visibility
      }
    ) {
      id
      name
      status
      visibility
      startTime
      endTime
      pausedTime
      description
    }
  }
`

const DELETE_COMPETITION_MUTATION = gql`
  mutation DELETE_COMPETITION_MUTATION($id: ID!) {
    deleteCompetition(where: {id: $id}) {
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

const Competitions = {
  ...initialState,
  add: (state, payload) => {
    state.list.push(payload)
  },
  edit: (state, payload) => {
    const competitionIndex = state.list.findIndex(
      competition => competition.id === (state.editingKey || payload.id)
    )
    state.list[competitionIndex] = payload
  },
  remove: (state, payload) => {
    state.list = [
      ...state.list.filter(competition => competition.id !== payload)
    ]
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
  create: thunk(async (actions, payload, store) => {
    actions.toggleLoading()
    try {
      const {
        data: {createCompetition: competition}
      } = await window.$ap.mutate({
        mutation: CREATE_COMPETITION_MUTATION,
        variables: {
          name: payload.name,
          startTime: payload.dates[0].toDate(),
          endTime: payload.dates[1].toDate()
        }
      })
      actions.add(competition)
      store.dispatch(reset('createCompetition'))
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
        data: {updateCompetition: competition}
      } = await window.$ap.mutate({
        mutation: UPDATE_COMPETITION_MUTATION,
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
        mutation: DELETE_COMPETITION_MUTATION,
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

export default Competitions
