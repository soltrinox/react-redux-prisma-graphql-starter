import React from 'react'
import CreateChallengeForm from './form'
import {Field, propTypes, reduxForm} from 'redux-form'
import {Form, Input, Row, Col, Table, Divider, Popconfirm} from 'antd'
import {useStore, useActions} from 'easy-peasy'
import styled from 'styled-components'

const {Column} = Table

export default function Categories() {
  const {list, loading} = useStore(store => store.challenges)
  const {view, delete: challengeDelete} = useActions(
    actions => actions.challenges
  )

  return (
    <ChallengesStyles>
      <h3>Challenges</h3>
      <hr />
      <CreateChallengeForm />
      <hr />
      <Row>
        <Col>
          <Table
            dataSource={list}
            scroll={{y: 400}}
            loading={loading}
            className={list.length ? 'non-empty' : null}
            rowKey="id"
          >
            <Column title="Name" dataIndex="name" key="name" />
            <Column
              title="Description"
              dataIndex="description"
              key="description"
            />

            <Column
              title="Action"
              key="action"
              render={(text, record) => {
                return (
                  <div>
                    <a onClick={() => view(record.id)}>View</a>{' '}
                    <a onClick={() => challengeDelete({id: record.id})}>
                      Delete
                    </a>
                  </div>
                )
              }}
            />
          </Table>
        </Col>
      </Row>
    </ChallengesStyles>
  )
}

const ChallengesStyles = styled.div`
  .non-empty {
    .ant-table-body {
      max-height: unset !important;
      height: calc(100vh - 380px) !important;
    }
  }
`
