import {thunk, listen} from 'easy-peasy'
import {reset} from 'redux-form'
import {push} from 'redux-first-history'
import gql from 'graphql-tag'

const CREATE_CHALLENGE_MUTATION = gql`
  mutation CREATE_CHALLENGE_MUTATION(
    $category: ID!
    $name: String!
    $description: String!
    $flag: String!
    $points: Float!
    $firstSubmissionBonus: Float!
    $hints: [HintCreateWithoutChallengeInput!]
  ) {
    createChallenge(
      data: {
        name: $name
        description: $description
        flag: $flag
        points: $points
        firstSubmissionBonus: $firstSubmissionBonus
        category: {connect: {id: $category}}
        hints: {create: $hints}
      }
    ) {
      id
      name
      description
      flag
      points
      firstSubmissionBonus
      category {
        id
        name
      }
      hints {
        id
        name
        description
        penalty
      }
    }
  }
`

const UPDATE_CHALLENGE_MUTATION = gql`
  mutation UPDATE_CHALLENGE_MUTATION(
    $id: ID!
    $name: String!
    $points: Float!
    $firstSubmissionBonus: Float!
    $flag: String!
    $category: ID!
    $description: String
  ) {
    updateChallenge(
      where: {id: $id}
      data: {
        name: $name
        description: $description
        points: $points
        firstSubmissionBonus: $firstSubmissionBonus
        flag: $flag
        category: {connect: {id: $category}}
      }
    ) {
      id
      name
      description
      flag
      points
      firstSubmissionBonus
      category {
        id
        name
      }
      hints {
        id
        name
        description
        penalty
      }
    }
  }
`

const DELETE_CHALLENGE_MUTATION = gql`
  mutation DELETE_CHALLENGE_MUTATION($id: ID!) {
    deleteChallenge(where: {id: $id}) {
      id
    }
  }
`

const initialState = {
  loading: false,
  error: null,
  filteredList: [],
  list: [],
  editingKey: '',
  modal: {
    visible: false,
    challenge: null
  }
}

const Challenges = {
  ...initialState,
  // ACTIONS
  setError: (state, payload) => {
    state.error = payload
  },
  setState: (state, payload) => {
    state.list = payload
    state.filteredList = payload
  },
  setInitialState: thunk(async (actions, payload, store) => {
    const UserhintsUsed = store
      .getState()
      .users.currentUser.hintsUsed.map(hint => hint.id)

    const challenges = payload.map(challenge => {
      challenge.actualPoints = challenge.points
      const hintsUsed = challenge.hints.filter(hint =>
        UserhintsUsed.includes(hint.id)
      )

      hintsUsed.forEach(
        hintUsed => (challenge.actualPoints -= hintUsed.penalty)
      )

      return challenge
    })
    actions.setState(challenges)
  }),
  applyFilters: (state, payload) => {
    let challenges = state.list
    Object.keys(payload).forEach(key => {
      if (key === 'showAlreadySolvedChallenges') {
        if (!payload[key]) {
          challenges = challenges.filter(
            challenge =>
              !challenge.submissions.find(submission => submission.correct)
          )
        }
      }

      if (key === 'showOnlyChallengesWithBonus') {
        if (payload[key]) {
          challenges = challenges.filter(
            challenge =>
              challenge.solves === 0 && challenge.firstSubmissionBonus !== 0
          )
        }
      }
    })

    state.filteredList = challenges
  },
  updateActualPoints: (state, payload) => {
    const challengeIndex = state.list.findIndex(
      challenge => challenge.id === payload.challenge.id
    )

    const newPoints = state.list[challengeIndex].actualPoints - payload.penalty

    state.list[challengeIndex].actualPoints = newPoints

    state.modal.challenge.actualPoints = newPoints
  },
  toggleLoading: (state, payload) => {
    state.loading = !state.loading
  },
  toggleModal: (state, payload) => {
    state.modal.visible = !state.modal.visible
    state.modal.challenge = payload || state.modal.challenge
    state.error = null
  },
  // ACTIONS >> CRUD Operations
  add: (state, payload) => {
    state.list.push(payload)
  },
  edit: (state, payload) => {
    const challengeIndex = state.list.findIndex(
      challenge => challenge.id === payload.id
    )
    state.list[challengeIndex] = payload
  },
  updateSubmissions: (state, payload) => {
    const challengeIndex = state.list.findIndex(
      challenge => challenge.id === payload.id
    )
    state.list[challengeIndex].submissions = payload.submissions
  },
  updateSolves: (state, payload) => {
    if (!payload.challenge) {
      return
    }
    const challengeIndex = state.list.findIndex(
      challenge => challenge.id === payload.challenge.id
    )
    if (challengeIndex > -1) {
      state.list[challengeIndex].solves += 1
    }
  },
  remove: (state, payload) => {
    state.list = [...state.list.filter(challenge => challenge.id !== payload)]
  },
  clear: (state, payload) => {
    state.list = []
    state.filteredList = []
  },
  assignDifficulty: thunk(async (actions, payload, store) => {
    const {categories, challenges} = store.getState()
    let challengesWithDifficulty = []

    categories.list.forEach(category => {
      const categoryChallenges = challenges.list
        .filter(challenge => challenge.category.id === category.id)
        .sort((a, b) => a.points - b.points)

      if (!categoryChallenges.length) return

      if (categoryChallenges.length === 1) {
        challengesWithDifficulty.push({
          ...categoryChallenges[0],
          difficulty: 0
        })

        return
      }

      const min = categoryChallenges[0]
      const max = categoryChallenges[categoryChallenges.length - 1]
      // number 3 below refers to the difficulty having 3 levels
      const unit = Math.floor((max.points - min.points) / 3)

      const categoryChallengesWithDifficulty = categoryChallenges.map(
        challenge => {
          let difficulty = 1
          if (challenge.points > min.points + unit) difficulty += 1
          if (challenge.points > min.points + 2 * unit) difficulty += 1

          challenge.difficulty = difficulty

          return challenge
        }
      )

      challengesWithDifficulty = challengesWithDifficulty.concat(
        categoryChallengesWithDifficulty
      )
    })

    actions.setInitialState(challengesWithDifficulty)
  }),
  // THUNKS
  view: thunk(async (actions, payload, store) => {
    store.dispatch(push({pathname: `/admin/challenges/${payload}`}))
  }),
  create: thunk(async (actions, payload, store) => {
    actions.toggleLoading()
    try {
      const {
        data: {createChallenge: challenge}
      } = await window.$ap.mutate({
        mutation: CREATE_CHALLENGE_MUTATION,
        variables: payload
      })
      actions.add(challenge)
      await store.dispatch.hints.refetch()
      await store.dispatch(reset('createChallenge'))
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
        data: {updateChallenge: challenge}
      } = await window.$ap.mutate({
        mutation: CREATE_CHALLENGE_MUTATION,
        variables: payload
      })
      actions.edit(payload)
      actions.setError(null)
      store.dispatch.notifications.show('UPDATED_CHALLENGE')
    } catch (err) {
      actions.setError(err)
    }
    actions.toggleLoading()
  }),
  delete: thunk(async (actions, payload, store) => {
    actions.toggleLoading()
    try {
      await window.$ap.mutate({
        mutation: DELETE_CHALLENGE_MUTATION,
        variables: payload
      })
      actions.remove(payload.id)
      actions.setError(null)
    } catch (err) {
      actions.setError(err)
    }
    actions.toggleLoading()
  }),
  // Listeners
  listeners: listen(on => {
    on('@action.filters.change', (actions, payload, store) => {
      actions.applyFilters(store.getState().filters)
    })
  })
}

export default Challenges
