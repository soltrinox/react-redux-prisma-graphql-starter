import React from 'react'
import {Field, FieldArray, propTypes, reduxForm} from 'redux-form'
import {Select, Form, Input, Button, notification, Row, Col} from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {useActions, useStore} from 'easy-peasy'

import Error from '../../ErrorMessage'

const FormItem = Form.Item
const Option = Select.Option

const renderHints = ({fields, meta: {error, submitFailed}}) => (
  <ul>
    <Button icon="plus" type="primary" onClick={() => fields.push({})} />
    {submitFailed && error && <span>{error}</span>}

    {fields.map((member, index) => (
      <li key={index} style={{listStyle: 'none'}}>
        <Button icon="close" onClick={() => fields.remove(index)} />
        <FormItem label="Name">
          <Field name={`${member}.name`} type="text" component="input" />
        </FormItem>
        <FormItem label="Description">
          <Field name={`${member}.description`} type="text" component="input" />
        </FormItem>
        <FormItem label="Penalty">
          <Field
            name={`${member}.penalty`}
            type="number"
            component="input"
            parse={value => Number(value)}
          />
        </FormItem>
      </li>
    ))}
  </ul>
)

const ChallengeForm = props => {
  const {handleSubmit} = props
  const {error, loading} = useStore(store => store.challenges)
  const {list} = useStore(store => store.categories)

  const form = useStore(store => store.form)
  const createChallenge = useActions(actions => actions.challenges.create)

  return (
    <FormStyles>
      <Row type="flex" justify="start" align="middle">
        <Col span={24}>
          <Form
            layout="inline"
            onSubmit={e => {
              e.preventDefault()
              createChallenge(form.createChallenge.values)
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

            <FormItem label="category">
              <Field
                name="category"
                component={props => {
                  return (
                    <Select
                      defaultValue={props.input.value}
                      style={{width: 200}}
                      onChange={val => props.input.onChange(val)}
                      placeholder="Select a person"
                    >
                      {list.map(category => (
                        <Option key={category.id}>{category.name}</Option>
                      ))}
                    </Select>
                  )
                }}
              />
            </FormItem>

            <br />
            <FormItem label="Hints">
              <FieldArray name="hints" component={renderHints} />
            </FormItem>

            <br />
            <FormItem>
              <Button
                loading={loading}
                disabled={loading}
                type="primary"
                htmlType="submit"
                className="submit-btn"
              >
                Create Challenge
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
  form: 'createChallenge'
})(ChallengeForm)

const FormStyles = styled.div``
