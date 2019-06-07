import React from 'react'
import {useStore} from 'easy-peasy'
import styled from 'styled-components'
import {Row, Col} from 'antd'

import Challenge from './Challenge'
import Modal from './ChallengeModal'

export default function index({categoryID}) {
  const {filteredList} = useStore(store => store.challenges)

  const challenges = filteredList.filter(
    challenge => challenge.category.id === categoryID
  )

  return (
    <ChallengesStyles>
      <Modal />
      <Row>
        {challenges.map(challenge => (
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={8}
            xll={6}
            key={challenge.id}
          >
            <Challenge challenge={challenge} />
          </Col>
        ))}
      </Row>
    </ChallengesStyles>
  )
}

const ChallengesStyles = styled.div`
  // display: flex;
`
