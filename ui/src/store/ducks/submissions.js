import {thunk, listen} from 'easy-peasy'
import {reset} from 'redux-form'
import gql from 'graphql-tag'

const CREATE_SUBMISSION_MUTATION = gql`
  mutation CREATE_SUBMISSION_MUTATION($challenge: ID!, $content: String!) {
    createSubmission(data: {challenge: $challenge, content: $content}) {
      id
      correct
      points
      user {
        id
      }
    }
  }
`

const initialState = {
  list: [],
  error: null,
  loading: false,
  result: null,
  correct: false,
  correctAnswerMessage: 'Correct answer, kudos to you!',
  wrongAnswerMessage: 'Wrong answer, try harder; or smarter :-)'
}

const Submissions = {
  ...initialState,
  // Actions & Thunks
  setError: (state, payload) => {
    state.error = payload
  },
  setInitialState: (state, payload) => {
    state.list = payload
  },
  setResult: (state, payload) => {
    state.correct = payload
    state.result = state.correct
      ? state.correctAnswerMessage
      : state.wrongAnswerMessage
  },
  toggleLoading: (state, payload) => {
    state.loading = !state.loading
  },
  reset: (state, payload) => {
    state.result = null
    state.correct = false
  },
  clear: (state, payload) => {
    state.list = []
  },
  create: thunk(async (actions, payload, store) => {
    const challenge = store
      .getState()
      .challenges.list.find(challenge => challenge.id === payload.challenge)

    actions.toggleLoading()
    try {
      const {
        data: {createSubmission: submission}
      } = await window.$ap.mutate({
        mutation: CREATE_SUBMISSION_MUTATION,
        variables: payload
      })
      challenge.submissions.push(submission)
      actions.setResult(submission.correct)

      store.dispatch.challenges.updateSubmissions(challenge)
      store.dispatch(reset('createSubmission'))
      actions.setError(null)
    } catch (err) {
      actions.setError(err)
    }
    actions.toggleLoading()
  }),
  // Listeners
  listeners: listen(on => {
    on('@action.challenges.toggleModal', (actions, payload) => {
      actions.reset()
    })
  })
}

export default Submissions
