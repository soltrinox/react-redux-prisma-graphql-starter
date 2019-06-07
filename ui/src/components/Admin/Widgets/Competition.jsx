import React, {useState} from 'react'
import {useStore, useActions} from 'easy-peasy'
import {Button} from 'antd'
import {WidgetUI} from '../../UI'
import CountdownTimer from '../../Widgets/CountdownText'
import moment from 'moment'

import Error from '../../ErrorMessage'

export default function Competition() {
  const {list, error, loading} = useStore(store => store.competitions)
  const {update} = useActions(actions => actions.competitions)
  const {
    listAsObject: {competition: competitionID}
  } = useStore(store => store.settings)
  const competition = list.find(competition => competition.id === competitionID)
  return (
    <WidgetUI>
      {competition && (
        <div>
          <h3>Active competition</h3>
          <p>
            Name: <span style={{fontWeight: 'bold'}}>{competition.name}</span>
          </p>
          <p>
            Status:{' '}
            <span style={{fontWeight: 'bold'}}>{competition.status}</span>
          </p>

          {competition.status === 'ACTIVE' && (
            <CountdownTimer eventTime={competition.startTime} />
          )}
          <p
            style={{
              borderTop: '1px solid #efefef',
              marginTop: 10,
              paddingTop: 10
            }}
          >
            <span>Actions</span>{' '}
            <Button
              loading={loading}
              disabled={loading}
              onClick={() =>
                update({
                  ...competition,
                  status: competition.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE'
                })
              }
            >
              {competition.status === 'ACTIVE' ? 'Pause' : 'Activate'}
            </Button>
            <Button
              loading={loading}
              disabled={loading}
              onClick={() =>
                update({
                  ...competition,
                  status: 'INACTIVE'
                })
              }
            >
              Deactivate
            </Button>
            <Button
              loading={loading}
              disabled={loading}
              onClick={() =>
                update({
                  ...competition,
                  status: 'COMPLETED'
                })
              }
            >
              Mark as complete
            </Button>
          </p>
        </div>
      )}
      {!competition && <p>Please set an active competition in settings</p>}
    </WidgetUI>
  )
}
