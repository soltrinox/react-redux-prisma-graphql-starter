import React, {useState} from 'react'
import styled from 'styled-components'
import {useActions, useStore} from 'easy-peasy'

import CompetitionResults from '../components/Competition/Results'
import SpinUI from '../components/UI/Spin'

export default function ScreensResults() {
  const [loading, setLoading] = useState(false)
  const {scores} = useStore(store => store.users)
  const {authenticate} = useActions(actions => actions.auth)
  const {fetchScores} = useActions(actions => actions.users)

  if (!scores.length && !loading) {
    waitForScoresFetch()
  }

  async function waitForScoresFetch() {
    setLoading(true)
    await fetchScores()
    await authenticate()
    setLoading(false)
  }

  if (loading) {
    return <SpinUI tip="Calculating scores" size="large" />
  }

  return <CompetitionResults />
}
