import React from 'react'
import {useStore, useActions} from 'easy-peasy'
import styled from 'styled-components'
import {Rate, Icon, Tooltip} from 'antd'

export default function Challenge({challenge}) {
  const {toggleModal} = useActions(actions => actions.challenges)
  const {currentUser} = useStore(store => store.users)
  const completed = challenge.submissions.find(submission => {
    return submission.correct && submission.user.id === currentUser.id
  })

  return (
    <ChallengeStyles
      onClick={() => toggleModal(challenge)}
      completed={completed}
    >
      <header>
        {challenge.difficulty > 0 && (
          <span>
            Difficulty:{' '}
            <Rate
              style={{fontSize: 12}}
              disabled
              defaultValue={challenge.difficulty}
              count={3}
            />
          </span>
        )}

        {!completed &&
          challenge.solves === 0 &&
          challenge.firstSubmissionBonus > 0 && (
            <Tooltip
              placement="bottomRight"
              title={`+${
                challenge.firstSubmissionBonus
              } points if you solve it first`}
            >
              <Icon type="crown" className="bonus-points-indicator" />
            </Tooltip>
          )}

        {completed && (
          <Icon type="check-circle" className="challenge-complete-indicator" />
        )}
      </header>
      <h3 className="challenge-name">{challenge.name}</h3>
      <div className="footer">
        <span>
          Solves: <span className="solves">{challenge.solves}</span>
        </span>{' '}
        <div className="points-container">
          <div className="points-wrapper">
            {!completed && (
              <span className="points">{challenge.points} pts</span>
            )}
            {completed && (
              <p className="completed-challenge-points-container">
                <span className="actual-points">
                  {challenge.actualPoints} /
                </span>
                <span className="points">{challenge.points} pts</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </ChallengeStyles>
  )
}

const ChallengeStyles = styled.div`
  margin: 10px;
  padding: 10px;
  background: ${props => props.theme.card_grey};
  border-radius: 0.25rem;
  border-color: #495762;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
  transition: opacity 200ms ease-in;
  will-change: opacity;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${props => props.theme.gray_1};
  opacity: ${props => (props.completed ? '0.6' : 1)}

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .challenge-complete-indicator {
      font-size: 24px;
      color: #5ddc1f;
    }

    .bonus-points-indicator {
      color: ${props => props.theme.orange};
      font-size: 24px;
    }
  }

  .challenge-name {
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    max-width: 200px;
    margin: auto;
    color: ${props => props.theme.gray_1};
  }

  span {
    font-size: 12px;
  }
  .solves {
    color: #13c2c2;
    font-weight: bold;
  }

  .points-container {
    border-top: 1px solid #38424b;
    border-left: 1px solid #38424b;
    border-radius: 99% 1% 0% 100% / 100% 0% 100% 0%;
    padding: 10px;
    height: 60px;
    width: 75px;
    background-color: #9560cadb;
    position: absolute;
    right: 10px;
    bottom: 10px;
    border-bottom-right-radius: 6px;

    span.points {
      position: absolute;
      bottom: 10px;
      left: 14px;
      font-size: 14px;
      font-weight: bold;
    }

    .completed-challenge-points-container {
      display: flex;
      flex-direction: column;
      position: absolute;
      align-items: flex-end;
      margin: 0;
      left: 15px;
      top: 13px;

      .points {
        position: unset;
        font-weight: 400;
      }

      .actual-points {
        font-size: 14px;
        line-height: 14px;
        font-weight: bold;
        color: ${props => props.theme.yellow};
      }
    }
  }
`
