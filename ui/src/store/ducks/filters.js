const initialState = {
  showOnlyChallengesWithBonus: false,
  showAlreadySolvedChallenges: true
}

const Filters = {
  ...initialState,
  change: (state, payload) => {
    state[payload.filter] = payload.value
  }
}

export default Filters
