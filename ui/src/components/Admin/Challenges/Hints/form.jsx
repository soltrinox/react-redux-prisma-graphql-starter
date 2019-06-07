import React from 'react'
import {Field, propTypes, reduxForm} from 'redux-form'
import {Form, Input, Button, notification, Row, Col} from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {useActions, useStore} from 'easy-peasy'

import Error from '../../../ErrorMessage'

const FormItem = Form.Item

const HintsForm = props => {
  const {handleSubmit} = props
  const {error, loading} = useStore(store => store.hints)
  const form = useStore(store => store.form)
  const createHint = useActions(actions => actions.hints.create)

  return (
    <FormStyles>
      <Row type="flex" justify="start" align="middle">
        <Col span={24}>
          <Form
            layout="inline"
            onSubmit={e => {
              e.preventDefault()
              createHint({
                ...form.createHint.values,
                challenge: props.challengeID
              })
            }}
          >
            <Error error={error} />
            <FormItem label="Name">
              <Field name="name" component="input" type="text" />
            </FormItem>

            <FormItem label="Description">
              <Field name="description" component="input" type="text" />
            </FormItem>

            <FormItem label="Penalty">
              <Field
                name="penalty"
                component="input"
                type="number"
                parse={value => Number(value)}
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
                Add
              </Button>

              {/* <Link to='/signin' className='already-have-account'>
                      Already have an account? Sign in
                    </Link> */}
            </FormItem>
          </Form>
        </Col>
      </Row>
    </FormStyles>
  )
}

HintsForm.propTypes = propTypes

export default reduxForm({
  form: 'createHint'
})(HintsForm)

const FormStyles = styled.div``
