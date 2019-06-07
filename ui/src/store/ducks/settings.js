import {thunk} from 'easy-peasy'
import {reset} from 'redux-form'
import gql from 'graphql-tag'

const SETTINGS_QUERY = gql`
  query SETTINGS_QUERY {
    settings {
      id
      key
      value
      type
    }
  }
`

const UPDATE_SETTINGS_MUTATION = gql`
  mutation UPDATE_SETTINGS_MUTATION(
    $settings: [SettingUpdateManyMutationInput!]!
  ) {
    updateSettings(data: $settings) {
      message
    }
  }
`

const initialState = {
  loading: false,
  error: null,
  list: [],
  listAsObject: {}
}

const Settings = {
  ...initialState,
  setError: (state, payload) => {
    state.error = payload
  },
  toggleLoading: (state, payload) => {
    state.loading = !state.loading
  },
  asObject: (state, payload) => {
    const settings = payload.reduce((accumulator, setting) => {
      accumulator[setting.key] = setting.value

      return accumulator
    }, {})
    state.listAsObject = settings
  },
  setInitialState: (state, payload) => {
    state.list = payload
  },
  fetch: thunk(async (actions, payload, store) => {
    try {
      const {
        data: {settings}
      } = await window.$ap.query({
        query: SETTINGS_QUERY
      })
      actions.setInitialState(settings)
      actions.asObject(settings)
      actions.setError(null)
    } catch (err) {
      actions.setError(err)
    }
  }),
  update: thunk(async (actions, payload, store) => {
    const settingsPayload = Object.keys(payload).reduce((accumulator, key) => {
      accumulator.push({key, value: payload[key]})

      return accumulator
    }, [])

    actions.toggleLoading()
    try {
      const {
        data: {updateSettings: settings}
      } = await window.$ap.mutate({
        mutation: UPDATE_SETTINGS_MUTATION,
        variables: {settings: settingsPayload}
      })
      actions.fetch()
      actions.setError(null)
      store.dispatch.notifications.show('UPDATED_SETTINGS')
    } catch (err) {
      actions.setError(err)
    }
    actions.toggleLoading()
  })
}
export default Settings
