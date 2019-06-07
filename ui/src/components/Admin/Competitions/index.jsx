import React from 'react'
import CreateCompetitionForm from './form'
import {Field, propTypes, reduxForm} from 'redux-form'
import {Form, Input, Row, Col, Table, Divider, Popconfirm} from 'antd'
import {useStore, useActions} from 'easy-peasy'
import styled from 'styled-components'
import moment from 'moment'

const {Column} = Table

const FormItem = Form.Item
const EditableContext = React.createContext()

const EditableRow = ({form, ...props}) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

function EditableCell({editing, record, field, ...restProps}) {
  return (
    <EditableContext.Consumer>
      {form => {
        const {getFieldDecorator} = form

        return (
          <td {...restProps}>
            {editing ? (
              <FormItem style={{margin: 0}}>
                {getFieldDecorator(field, {
                  initialValue: record[field]
                })(<Input />)}
              </FormItem>
            ) : (
              restProps.children
            )}
          </td>
        )
      }}
    </EditableContext.Consumer>
  )
}

export default function Competitions() {
  const {list, editingKey, editMode, loading} = useStore(
    store => store.competitions
  )
  const {toggleEditMode, update, delete: competitionDelete} = useActions(
    actions => actions.competitions
  )

  const components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell
    }
  }

  return (
    <CompetitionsStyles>
      <h3>Competitions</h3>
      <hr />
      <CreateCompetitionForm initialValues={{dates: [moment(), moment()]}} />
      <hr />
      <Row>
        <Col>
          <Table
            dataSource={list}
            scroll={{y: 400}}
            components={components}
            loading={loading}
            className={list.length ? 'non-empty' : null}
            rowKey="id"
          >
            <Column
              title="ID"
              dataIndex="id"
              key="id"
              onCell={record => ({
                record,
                field: 'id',
                editing: record.id === editingKey
              })}
            />
            <Column
              title="Name"
              dataIndex="name"
              key="name"
              onCell={record => ({
                record,
                field: 'name',
                editing: record.id === editingKey
              })}
            />
            <Column
              title="Start time"
              dataIndex="startTime"
              key="startTime"
              onCell={record => ({
                record,
                field: 'startTime',
                editing: record.id === editingKey
              })}
            />
            <Column
              title="End time"
              dataIndex="endTime"
              key="endTime"
              onCell={record => ({
                record,
                field: 'endTime',
                editing: record.id === editingKey
              })}
            />
            <Column
              title="Status"
              dataIndex="status"
              key="status"
              onCell={record => ({
                record,
                field: 'status',
                editing: record.id === editingKey
              })}
            />
            <Column
              title="Visibility"
              dataIndex="visibility"
              key="visibility"
              onCell={record => ({
                record,
                field: 'visibility',
                editing: record.id === editingKey
              })}
            />
            <Column
              title="Description"
              dataIndex="description"
              key="description"
              onCell={record => ({
                record,
                field: 'description',
                editing: record.id === editingKey
              })}
            />

            <Column
              title="Action"
              key="action"
              render={(text, record) => {
                return (
                  <div>
                    {record.id === editingKey ? (
                      <span>
                        <EditableContext.Consumer>
                          {form => (
                            <a
                              href="javascript:;"
                              onClick={() =>
                                update({
                                  ...form.getFieldsValue(),
                                  id: editingKey
                                })
                              }
                              style={{marginRight: 8}}
                            >
                              Save
                            </a>
                          )}
                        </EditableContext.Consumer>
                        <Popconfirm
                          title="Sure to cancel?"
                          onConfirm={() => toggleEditMode(record.id)}
                        >
                          <a>Cancel</a>
                        </Popconfirm>
                      </span>
                    ) : (
                      <div>
                        <a onClick={() => toggleEditMode(record.id)}>Edit</a>{' '}
                        <a onClick={() => competitionDelete({id: record.id})}>
                          Delete
                        </a>
                      </div>
                    )}
                  </div>
                )
              }}
            />
          </Table>
        </Col>
      </Row>
    </CompetitionsStyles>
  )
}

const CompetitionsStyles = styled.div`
  .non-empty {
    .ant-table-body {
      max-height: unset !important;
      height: calc(100vh - 380px) !important;
    }
  }
`
