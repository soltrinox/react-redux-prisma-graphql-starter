import React from 'react'
import CreateChallengeForm from './form'
import {Field, propTypes, reduxForm} from 'redux-form'
import {Form, Input, Row, Col, Table, Divider, Popconfirm} from 'antd'
import {useStore, useActions} from 'easy-peasy'
import styled from 'styled-components'

const {Column} = Table

export default function Submissions({challenge}) {
  const submissions = useStore(store => store.submissions.list).filter(
    submission => submission.challenge.id === challenge.id
  )

  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: user => <span>{user.name}</span>
    },
    {
      title: 'Correct',
      dataIndex: 'correct',
      key: 'correct',
      render: text => <span>{text.toString()}</span>
    },
    {
      title: 'Points',
      dataIndex: 'points',
      key: 'points'
    }
  ]

  return (
    <SubmissionsStyles>
      <h3>Submissions</h3>
      <hr />
      <Row>
        <Col>
          <Table
            dataSource={submissions}
            scroll={{y: 400}}
            className={submissions.length ? 'non-empty' : null}
            rowKey="id"
            columns={columns}
          />
        </Col>
      </Row>
    </SubmissionsStyles>
  )
}

const SubmissionsStyles = styled.div`
  .non-empty {
    .ant-table-body {
      max-height: unset !important;
      height: calc(100vh - 380px) !important;
    }
  }
`
