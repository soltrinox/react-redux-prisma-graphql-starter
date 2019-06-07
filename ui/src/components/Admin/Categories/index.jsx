import React from 'react'
import CreateCategoryForm from './form'
import {Field, propTypes, reduxForm} from 'redux-form'
import {Form, Input, Row, Col, Table, Divider, Popconfirm} from 'antd'
import {useStore, useActions} from 'easy-peasy'
import styled from 'styled-components'

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

export default function Categories() {
  const {list, editingKey, editMode, loading} = useStore(
    store => store.categories
  )
  const {toggleEditMode, update, delete: categoryDelete} = useActions(
    actions => actions.categories
  )

  const components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell
    }
  }

  return (
    <CategoriesStyles>
      <h3>Categories</h3>
      <hr />
      <CreateCategoryForm />
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
                        <a onClick={() => categoryDelete({id: record.id})}>
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
    </CategoriesStyles>
  )
}

const CategoriesStyles = styled.div`
  .non-empty {
    .ant-table-body {
      max-height: unset !important;
      height: calc(100vh - 380px) !important;
    }
  }
`
