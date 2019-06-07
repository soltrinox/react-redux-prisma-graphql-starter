import React from 'react'
import {Field, propTypes, reduxForm} from 'redux-form'
import {Form, Input, Button, notification, Row, Col} from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {useActions, useStore} from 'easy-peasy'

import Error from '../../ErrorMessage'

const FormItem = Form.Item

const CategoriesForm = props => {
  const {handleSubmit} = props
  const {error, loading} = useStore(store => store.categories)
  const form = useStore(store => store.form)
  const createCategory = useActions(actions => actions.categories.create)

  return (
    <FormStyles>
      <Row type="flex" justify="start" align="middle">
        <Col span={24}>
          <Form
            layout="inline"
            onSubmit={e => {
              e.preventDefault()
              createCategory(form.createCategory.values)
            }}
          >
            <Error error={error} />
            <FormItem label="Name">
              <Field name="name" component="input" type="text" />
            </FormItem>

            <FormItem label="Description">
              <Field name="description" component="input" type="text" />
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
    </FormStyles>
  )
}

CategoriesForm.propTypes = propTypes

export default reduxForm({
  form: 'createCategory'
})(CategoriesForm)

const FormStyles = styled.div``
