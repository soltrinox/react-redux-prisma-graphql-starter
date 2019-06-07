import React from 'react'
import {Row, Col, Tabs} from 'antd'
import {withRouter} from 'react-router-dom'
import {useActions, useStore} from 'easy-peasy'

import Submissions from './Submissions'
import Hints from './Hints'
import Attachments from './Attachments'
import Form from './ChallengeForm'

const TabPane = Tabs.TabPane

const Challenge = props => {
  const {list} = useStore(store => store.challenges)
  const challenge = list.find(
    challenge => challenge.id === props.match.params.id
  )

  const initialValues = Object.assign({}, challenge, {
    category: challenge.category.id
  })

  return (
    <Row>
      <Col span={12}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Hints" key="1">
            <Hints challenge={challenge} />
          </TabPane>
          <TabPane tab="Attachments" key="2">
            <Attachments challenge={challenge} />
          </TabPane>
          <TabPane tab="Submissions" key="3">
            <Submissions challenge={challenge} />
          </TabPane>
        </Tabs>
      </Col>
      <Col span={12}>
        <Form initialValues={initialValues} />
      </Col>
    </Row>
  )
}

export default withRouter(Challenge)
