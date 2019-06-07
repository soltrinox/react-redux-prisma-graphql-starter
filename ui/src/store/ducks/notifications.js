import {log} from '../helpers'

// sample notification API
// message: 'Welcome',
// description: 'You are now registered',
// showButton: false,
// buttonText: 'FETCH',
// duration: 0,
// type: 'info',
// action: 'resetApolloStore'

const notifications = {
  WELCOME: {
    message: 'Welcome',
    description: 'You are now registered',
    showButton: false,
    duration: 3,
    type: 'success'
  },
  BYE: {
    message: 'Bye',
    description: 'You are now signed out',
    showButton: false,
    duration: 3,
    type: 'info'
  },
  ADMIN_ACCESS_ONLY: {
    message: 'Unauthorized access',
    description: 'You are not authorised to access this page.',
    showButton: false,
    duration: 3,
    type: 'info'
  },
  UPDATED_CHALLENGE: {
    message: 'Success',
    description: 'Challenge updated.',
    showButton: false,
    duration: 3,
    type: 'success'
  },
  UPDATED_SETTINGS: {
    message: 'Success',
    description: 'Settings updated.',
    showButton: false,
    duration: 3,
    type: 'success'
  }
}

export default {
  // STATE
  BUS: [],
  // ACTIONS & THUNKS
  show: (state, payload) => {
    const notification = Object.assign({}, notifications[payload], {
      key: `open-${Date.now()}`
    })

    state.BUS.push(notification)
  },
  remove: (state, payload) => {
    state.BUS = [
      ...state.BUS.filter(notification => notification.key !== payload)
    ]
  }
}
