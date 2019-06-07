import React from 'react'
import {Field, FieldArray, propTypes, reduxForm} from 'redux-form'
import {Select, Form, Input, Button, notification, Row, Col} from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {useActions, useStore} from 'easy-peasy'

import Error from '../../ErrorMessage'

const FormItem = Form.Item
const Option = Select.Option

const ChallengeForm = props => {
  const {handleSubmit} = props
  const {error, loading} = useStore(store => store.challenges)
  const {list} = useStore(store => store.categories)
  const form = useStore(store => store.form)

  const updateChallenge = useActions(actions => actions.challenges.update)

  return (
    <FormStyles>
      <Row type="flex" justify="start" align="middle">
        <Col span={24}>
          <h2>Challenge</h2>
          <Form
            onSubmit={e => {
              e.preventDefault()
              updateChallenge(form.updateChallenge.values)
            }}
          >
            <Error error={error} />
            <FormItem label="Name">
              <Field name="name" component="input" type="text" />
            </FormItem>

            <FormItem label="Description">
              <Field name="description" component="input" type="text" />
            </FormItem>

            <FormItem label="Points">
              <Field
                name="points"
                component="input"
                type="number"
                parse={value => Number(value)}
              />
            </FormItem>

            <FormItem label="First submission bonus">
              <Field
                name="firstSubmissionBonus"
                component="input"
                type="number"
                parse={value => Number(value)}
              />
            </FormItem>

            <FormItem label="Flag">
              <Field name="flag" component="input" type="text" />
            </FormItem>

            <FormItem label="Category">
              <Field
                name="category"
                component={props => {
                  return (
                    <Select
                      value={props.input.value}
                      style={{width: 200}}
                      onChange={val => props.input.onChange(val)}
                    >
                      {list.map(category => (
                        <Option key={category.id}>{category.name}</Option>
                      ))}
                    </Select>
                  )
                }}
              />
            </FormItem>

            <FormItem>
              <Button
                loading={loading}
                disabled={loading}
                type="primary"
                htmlType="submit"
                className="submit-btn"
              >
                Update Challenge
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </FormStyles>
  )
}

ChallengeForm.propTypes = propTypes

export default reduxForm({
  form: 'updateChallenge'
})(ChallengeForm)

const FormStyles = styled.div`
  padding: 20px;
  margin-top: 20px;
`
