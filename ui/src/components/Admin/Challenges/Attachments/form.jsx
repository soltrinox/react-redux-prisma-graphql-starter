import React from 'react'
import {Field, propTypes, reduxForm} from 'redux-form'
import {Form, Input, Button, notification, Row, Col} from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {useActions, useStore} from 'easy-peasy'

import Error from '../../../ErrorMessage'

const FormItem = Form.Item

const CreateAttachmentForm = props => {
  const {handleSubmit} = props
  const {error, loading} = useStore(store => store.attachments)
  const form = useStore(store => store.form)
  const createAttachment = useActions(actions => actions.attachments.create)

  return (
    <CreateAttachmentFormStyles>
      <Row type="flex" justify="start" align="middle">
        <Col span={24}>
          <Form
            layout="inline"
            onSubmit={e => {
              e.preventDefault()
              createAttachment({
                challenge: props.challengeID,
                ...form.createAttachment.values
              })
            }}
          >
            <Error error={error} />

            <FormItem label="Name">
              <Field name="name" component="input" type="text" />
            </FormItem>

            <FormItem label="URL">
              <Field name="url" component="input" type="text" />
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
            </FormItem>
          </Form>
        </Col>
      </Row>
    </CreateAttachmentFormStyles>
  )
}

CreateAttachmentForm.propTypes = propTypes

export default reduxForm({
  form: 'createAttachment'
})(CreateAttachmentForm)

const CreateAttachmentFormStyles = styled.div``
