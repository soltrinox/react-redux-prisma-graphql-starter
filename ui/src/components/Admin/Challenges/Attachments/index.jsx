import React from 'react'
import {Field, propTypes, reduxForm} from 'redux-form'
import {Form, Input, Row, Col, Table, Divider, Popconfirm} from 'antd'
import {useStore, useActions} from 'easy-peasy'
import styled from 'styled-components'
import CreateAttachmentForm from './form'

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

export default function Attachments({challenge}) {
  const {list, editingKey, editMode, loading} = useStore(
    store => store.attachments
  )
  const {toggleEditMode, update, delete: attachmentDelete} = useActions(
    actions => actions.attachments
  )

  const attachments = list.filter(
    attachment => attachment.challenge.id === challenge.id
  )

  const components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell
    }
  }

  return (
    <AttachmentsStyles>
      <CreateAttachmentForm challengeID={challenge.id} />
      <hr />
      <Row>
        <Col>
          <Table
            dataSource={attachments}
            scroll={{y: 400}}
            components={components}
            loading={loading}
            className={list.length ? 'non-empty' : null}
            rowKey="id"
          >
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
              title="URL"
              dataIndex="url"
              key="url"
              onCell={record => ({
                record,
                field: 'url',
                editing: record.id === editingKey
              })}
            />

            <Column
              title="Actions"
              key="actions"
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
                                  id: editingKey,
                                  challenge: challenge.id
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
                        <a onClick={() => attachmentDelete({id: record.id})}>
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
    </AttachmentsStyles>
  )
}

const AttachmentsStyles = styled.div`
  .non-empty {
    .ant-table-body {
      max-height: unset !important;
      height: calc(100vh - 380px) !important;
    }
  }
`
