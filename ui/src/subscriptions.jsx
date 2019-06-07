import React, {useEffect, useState} from 'react'
import {Subscription, withApollo} from 'react-apollo'
import {useActions, useStore} from 'easy-peasy'
import gql from 'graphql-tag'

const SCORE_UPDATES_SUBSCRIPTION = gql`
  subscription SCORE_UPDATES_SUBSCRIPTION {
    scoreUpdates {
      id
      challenge {
        id
      }
      score
      nickname
    }
  }
`

const COMPETITION_UPDATES_SUBSCRIPTION = gql`
  subscription COMPETITION_UPDATES_SUBSCRIPTION {
    competitionUpdates
  }
`

const ScoreUpdatesSubscription = ({client}) => {
  const {updateScore} = useActions(actions => actions.users)
  const {updateSolves} = useActions(actions => actions.challenges)

  useEffect(() => {
    const subscriptionObserver = client.subscribe({
      query: SCORE_UPDATES_SUBSCRIPTION
    })

    subscriptionObserver.subscribe({
      next(data) {
        updateScore({...data.data.scoreUpdates})
        updateSolves({...data.data.scoreUpdates})
      },
      error(err) {
        console.error('SCORE UPDATES SUBSCRIPTION', err)
      }
    })
    return undefined
  }, [])

  return null
}

const CompetitionUpdatesSubscription = ({client}) => {
  const {listAsObject} = useStore(store => store.settings)
  const {list} = useStore(store => store.competitions)
  const {edit} = useActions(actions => actions.competitions)
  const competition = list.find(
    competition => competition.id === listAsObject.competition
  )
  const {clear, fetchState, setCompetitionStatus} = useActions(
    actions => actions
  )
  useEffect(() => {
    const subscriptionObserver = client.subscribe({
      query: COMPETITION_UPDATES_SUBSCRIPTION
    })

    subscriptionObserver.subscribe({
      next(data) {
        edit({...competition, status: data.data.competitionUpdates})
        if (data.data.competitionUpdates !== 'ACTIVE') {
          clear()
        } else {
          fetchState()
        }
        setCompetitionStatus(data.data.competitionUpdates)
      },
      error(err) {
        console.error('COMPETITION UPDATES SUBSCRIPTION', err)
      }
    })
    return undefined
  }, [])

  return null
}

const Subscriptions = ({client}) => {
  return (
    <>
      <ScoreUpdatesSubscription client={client} />
      <CompetitionUpdatesSubscription client={client} />
    </>
  )
}

export default withApollo(Subscriptions)
