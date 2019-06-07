import React from 'react'
import styled from 'styled-components'
import {useStore} from 'easy-peasy'
import {Row, Col, Icon} from 'antd'
import {Scrollbars} from 'react-custom-scrollbars'
import useWindowResize from '../../hooks/windowResize'

export default function Scoreboard() {
  const {width, height} = useWindowResize()
  const {scores} = useStore(store => store.users)
  const {currentUser} = useStore(store => store.users)
  const USERS = scores.sort((a, b) => b.score - a.score)
  return (
    <ScoreboardStyles>
      <ul>
        <Row className="headers">
          <Col span={8}>
            <span>Position</span>
          </Col>
          <Col span={8}>
            <span>Player</span>
          </Col>
          <Col span={8}>
            <span>Score</span>
          </Col>
        </Row>
        <hr />
        <div className="players-score">
          <Scrollbars style={{height: height - 300}}>
            {USERS.map((user, index) => (
              <Row
                key={user.id}
                className={`row ${
                  currentUser && user.id === currentUser.id ? 'highlight' : null
                }`}
              >
                <Col span={8}>
                  <span className="position">
                    {index < 3 && (
                      <Icon
                        type="trophy"
                        className={`trophy-place-${index + 1}`}
                      />
                    )}
                    {index + 1}
                  </span>
                </Col>
                <Col span={8}>
                  <span className="nickname">{user.nickname}</span>
                </Col>
                <Col span={8}>
                  <span className="points">{user.score}</span>
                </Col>
              </Row>
            ))}
          </Scrollbars>
        </div>
      </ul>
    </ScoreboardStyles>
  )
}

const ScoreboardStyles = styled.div`
  color: ${props => props.theme.gray_1};

  hr {
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }

  ul {
    list-style: none;
    padding: 0;

    .headers {
      span {
        display: block;
        font-size: 16px;
        padding: 10px 0;
        text-align: center;
      }
    }

    .players-score {
      height: 100%;
      overflow-y: auto;

      span {
        text-align: center;
        display: block;

        &.position {
          font-weight: bold;
          font-size: 14px;
          color: ${props => props.theme.orange};
        }
      }

      .row {
        padding: 10px 0;

        &.highlight {
          border-radius: 6px;
          box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.8);
          background-color: ${props => props.theme.red_2};

          .position {
            color: ${props => props.theme.gray_1};
          }
        }
      }
    }

    .position {
      text-align: center;
      display: block;

      .trophy-place-1 {
        position: absolute;
        left: 24px;
        top: 0px;
        font-size: 22px;
        color: gold;
      }

      .trophy-place-2 {
        position: absolute;
        left: 25px;
        top: 1px;
        font-size: 20px;
        color: #d0cece;
      }
      .trophy-place-3 {
        position: absolute;
        left: 26px;
        top: 2px;
        font-size: 18px;
        color: #cd7f32;
      }
    }
  }
`
