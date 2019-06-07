import React, {useState} from 'react'
import {Modal, Form, Alert, Icon} from 'antd'
import {useStore, useActions} from 'easy-peasy'
import styled from 'styled-components'

import Hints from './Hints'
import SubmissionForm from './SubmissionForm'
import {MoneySnow} from './Money'

export default function ChallengeModal() {
  const {visible, challenge} = useStore(store => store.challenges.modal)
  const attachmentsList = useStore(store => store.attachments.list)
  const {result, correct} = useStore(store => store.submissions)
  const {currentUser} = useStore(store => store.users)
  const {toggleModal} = useActions(actions => actions.challenges)

  if (challenge) {
    var attachments = attachmentsList.filter(
      attachment => attachment.challenge.id === challenge.id
    )
    var completed = challenge.submissions.find(
      submission => submission.correct && submission.user.id === currentUser.id
    )
  } else {
    return null
  }

  return (
    <Modal
      title={null}
      visible={visible}
      onOk={() => {
        toggleModal()
      }}
      onCancel={() => toggleModal()}
      footer={null}
      maskClosable
      centered
      className={challenge.id}
    >
      {challenge && (
        <ModalStyles>
          <h3 className="challenge">Challenge: {challenge.name}</h3>
          <p>
            <span className="header">Description: </span>{' '}
            {challenge.description}
          </p>
          {!completed && (
            <>
              {!!challenge.hints.length && (
                <p>
                  <span className="header">Points: </span>
                  <span
                    className={`actual-points ${
                      challenge.actualPoints !== challenge.points
                        ? 'highlight'
                        : null
                    }`}
                  >
                    {challenge.actualPoints}
                  </span>{' '}
                  / {challenge.points}
                </p>
              )}
              {!challenge.hints.length && (
                <p>
                  <span className="header">Points: </span>
                  {challenge.points}
                </p>
              )}
            </>
          )}
          {!completed && !!attachments.length && (
            <div className="attachments">
              <span className="header">Attachments: </span>
              {attachments.map(attachment => (
                <div className="attachment" key={attachment.id}>
                  <Icon type="link" />
                  <a
                    style={{marginRight: 10}}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={attachment.url}
                  >
                    {attachment.name}
                  </a>
                </div>
              ))}
            </div>
          )}
          {result && (
            <Alert message={result} type={correct ? 'success' : 'warning'} />
          )}

          {result && correct && <MoneySnow />}

          {!completed && <SubmissionForm challenge={challenge} />}
          {!completed && <Hints challenge={challenge} />}
          {completed && !result && <Alert message="COMPLETED" type="warning" />}
        </ModalStyles>
      )}
    </Modal>
  )
}

const ModalStyles = styled.div`
  .challenge {
    font-size: 24px;
    color: rgba(0, 0, 0, 0.75);
    margin-bottom: 20px;
  }
  .header {
    font-weight: bold;
  }

  .attachments {
    display: flex;
    margin-bottom: 10px;

    .attachment:first-of-type {
      margin-left: 10px;
    }
  }

  .actual-points.highlight {
    color: ${props => props.theme.red};
  }
`
