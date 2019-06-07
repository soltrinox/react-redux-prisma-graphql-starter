import React from 'react'
import {Modal, Button, Form, Alert, Icon} from 'antd'
import {useStore, useActions} from 'easy-peasy'
import styled from 'styled-components'
import {withRouter} from 'react-router'

const LockModal = function LockModal({history}) {
  const {listAsObject} = useStore(store => store.settings)
  const {list: competitions} = useStore(store => store.competitions)
  const activeCompetition = competitions.find(
    competition => competition.id === listAsObject.competition
  )
  const {currentUser} = useStore(store => store.users)
  const visible =
    activeCompetition &&
    activeCompetition.status !== 'ACTIVE' &&
    !currentUser.isAdmin

  if (activeCompetition.status === 'COMPLETED') {
    setTimeout(() => history.push('/results'), 5000)
  }

  return (
    <LockModalStyles>
      <Modal
        title={null}
        visible={visible}
        footer={null}
        centered
        closable={false}
        className="lock-modal"
      >
        {activeCompetition.status === 'INACTIVE' && (
          <p style={{textAlign: 'center', margin: 0}}>
            Hold on, Competition is still inactive!
          </p>
        )}
        {activeCompetition.status === 'COMPLETED' && (
          <>
            <p style={{fontSize: 18}}>Competition completed</p>
            <p style={{margin: 0}}>
              <Icon type="loading" /> Redirecting
            </p>
          </>
        )}
        {activeCompetition.status === 'PAUSED' && (
          <p style={{textAlign: 'center', margin: 0}}>
            Competition is paused, we'll be back in a while!
          </p>
        )}
      </Modal>
    </LockModalStyles>
  )
}

export default withRouter(LockModal)

const LockModalStyles = styled.div`
  p {
    text-align: 'center';
  }
`
