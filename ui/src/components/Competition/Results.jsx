import React from 'react'
import styled from 'styled-components'
import {Col, Row} from 'antd'

import Scoreboard from '../Widgets/Scoreboard'

export default function Results() {
  return (
    <ResultsStyles>
      <h1>Results</h1>
      <Row justify="center" type="flex">
        <Col span={12}>
          <Scoreboard />
        </Col>
      </Row>
    </ResultsStyles>
  )
}

const ResultsStyles = styled.div`
  height: 100vh;

  h1 {
    margin-top: 0;
    padding-top: 50px;
    text-align: center;
    color: ${props => props.theme.gray_1};
  }
`
