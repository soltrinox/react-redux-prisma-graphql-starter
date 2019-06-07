import {thunk} from 'easy-peasy'
import gql from 'graphql-tag'

import config from './config'
import notifications from './notifications'
import apollo from './apollo'
import auth from './auth'
import categories from './categories'
import challenges from './challenges'
import hints from './hints'
import attachments from './attachments'
import submissions from './submissions'
import competitions from './competitions'
import users from './users'
import settings from './settings'
import filters from './filters'

const INITIAL_STATE_USER_QUERY = gql`
  query INITIAL_STATE_USER_QUERY {
    challengeCategories {
      id
      name
      description
      challenges {
        id
        name
      }
    }

    hints {
      id
      name
      description
      penalty
      challenge {
        id
      }
    }

    attachments {
      id
      name
      url
      challenge {
        id
      }
    }

    challenges {
      id
      name
      description
      points
      solves
      firstSubmissionBonus
      category {
        id
        name
      }
      hints {
        id
        penalty
      }
      submissions {
        id
        correct
        points
        user {
          id
        }
      }
    }

    submissions {
      id
      correct
      points
      user {
        id
      }
      challenge {
        id
      }
    }

    competitions {
      id
      name
      status
      visibility
      startTime
      endTime
      description
      pausedTime
    }

    userScores {
      id
      nickname
      score
    }
  }
`

const INITIAL_STATE_ADMIN_QUERY = gql`
  query INITIAL_STATE_ADMIN_QUERY {
    challengeCategories {
      id
      name
      description
      challenges {
        id
        name
      }
    }

    hints {
      id
      name
      description
      penalty
      challenge {
        id
      }
    }

    attachments {
      id
      name
      url
      challenge {
        id
      }
    }

    challenges {
      id
      name
      description
      points
      solves
      firstSubmissionBonus
      flag
      hints {
        id
        penalty
      }
      category {
        id
        name
      }
      submissions {
        id
        points
        correct
        user {
          id
        }
      }
    }

    submissions {
      id
      correct
      points
      user {
        id
      }
      challenge {
        id
      }
    }

    competitions {
      id
      name
      status
      visibility
      startTime
      endTime
      description
      pausedTime
    }

    userScores {
      id
      nickname
      score
    }

    # users {
    #   id
    #   nickname
    #   email
    #   score
    # }
  }
`
const STATE_QUERY = gql`
  query STATE_QUERY {
    challengeCategories {
      id
      name
      description
      challenges {
        id
        name
      }
    }

    hints {
      id
      name
      description
      penalty
      challenge {
        id
      }
    }

    attachments {
      id
      name
      url
      challenge {
        id
      }
    }

    challenges {
      id
      name
      description
      points
      solves
      firstSubmissionBonus
      hints {
        id
        penalty
      }
      category {
        id
      }
      submissions {
        correct
        user {
          id
        }
      }
    }

    submissions {
      id
      correct
      points
      user {
        id
      }
      challenge {
        id
      }
    }
  }
`

const initialState = {
  loaded: {admin: false, user: false},
  competitionInitialStatus: 'INACTIVE',
  competitionStatus: 'INACTIVE'
}

export default {
  ...initialState,
  // sub-models
  config,
  attachments,
  categories,
  challenges,
  competitions,
  submissions,
  auth,
  hints,
  users,
  settings,
  notifications,
  apollo,
  filters,
  // Global Actions
  setInitialCompetitionStatus: (state, payload) => {
    const activeCompetition = payload.competitions.find(
      competition => competition.id === payload.competition
    )
    state.competitionInitialStatus = activeCompetition.status
    state.competitionStatus = activeCompetition.status
  },
  setCompetitionStatus: (state, payload) => {
    state.competitionStatus = payload
  },
  setLoadedState: (state, payload) => {
    state.loaded[payload] = !state.loaded[payload]
  },
  fetchInitialState: thunk(async (actions, payload, store) => {
    try {
      const loggedinUser = store.getState().users.currentUser
      // PUBLIC STATE FETCHING
      if (!loggedinUser) {
        await store.dispatch.settings.fetch()
      } else {
        await store.dispatch.settings.fetch()
        // LOGGEDIN STATE FETCHING
        const initialState = await window.$ap.query({
          query: loggedinUser.isAdmin
            ? INITIAL_STATE_ADMIN_QUERY
            : INITIAL_STATE_USER_QUERY
        })
        await store.dispatch.categories.setInitialState(
          initialState.data.challengeCategories
        )
        await store.dispatch.challenges.setInitialState(
          initialState.data.challenges
        )
        await store.dispatch.hints.setInitialState(initialState.data.hints)
        await store.dispatch.attachments.setInitialState(
          initialState.data.attachments
        )
        await store.dispatch.submissions.setInitialState(
          initialState.data.submissions
        )
        await store.dispatch.competitions.setInitialState(
          initialState.data.competitions
        )
        // await store.dispatch.users.setInitialState(initialState.data.users)
        await store.dispatch.users.setScores(initialState.data.userScores)

        await store.dispatch.challenges.assignDifficulty()

        // SET active competition initial status
        const {settings, competitions} = store.getState()
        actions.setInitialCompetitionStatus({
          competition: settings.listAsObject.competition,
          competitions: competitions.list
        })
      }
    } catch (error) {
      console.error(error.message)
    }
  }),
  fetchState: thunk(async (actions, payload, store) => {
    const {competitionInitialStatus} = store.getState()
    const state = await window.$ap.query({
      query: STATE_QUERY,
      fetchPolicy:
        competitionInitialStatus === 'ACTIVE' ? 'cache-only' : 'network-only'
    })

    await store.dispatch.categories.setInitialState(
      state.data.challengeCategories
    )
    await store.dispatch.challenges.setInitialState(state.data.challenges)
    await store.dispatch.hints.setInitialState(state.data.hints)
    await store.dispatch.attachments.setInitialState(state.data.attachments)
    await store.dispatch.submissions.setInitialState(state.data.submissions)
  }),
  clear: thunk(async (actions, payload, store) => {
    await store.dispatch.challenges.clear()
    await store.dispatch.categories.clear()
    await store.dispatch.hints.clear()
    await store.dispatch.submissions.clear()
    await store.dispatch.attachments.clear()
    // reload page to clear network TAB
  })
}
