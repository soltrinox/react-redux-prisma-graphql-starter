import React from 'react'
import {Field, propTypes, reduxForm} from 'redux-form'
import {Form, Input, Button, notification, Row, Col, DatePicker} from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {useActions, useStore} from 'easy-peasy'
import moment from 'moment'

import Error from '../../ErrorMessage'

const FormItem = Form.Item
const {RangePicker} = DatePicker

const CategoriesForm = props => {
  const {handleSubmit} = props
  const {error, loading} = useStore(store => store.competitions)
  const form = useStore(store => store.form)
  const createCompetition = useActions(actions => actions.competitions.create)

  return (
    <FormStyles>
      <Row type="flex" justify="start" align="middle">
        <Col span={24}>
          <Form
            layout="inline"
            onSubmit={e => {
              e.preventDefault()
              createCompetition(form.createCompetition.values)
            }}
          >
            <Error error={error} />

            <FormItem label="Name">
              <Field name="name" component="input" type="text" />
            </FormItem>

            <FormItem label="Dates">
              <Field
                name="dates"
                component={props => {
                  return (
                    <RangePicker
                      showTime={{format: 'HH:mm'}}
                      format="YYYY-MM-DD HH:mm"
                      placeholder={['Start Time', 'End Time']}
                      style={{width: '380px'}}
                      value={
                        props.input.value
                          ? [
                              moment(props.input.value[0]),
                              moment(props.input.value[1])
                            ]
                          : [moment(), moment()]
                      }
                      onChange={dates => props.input.onChange(dates)}
                    />
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
  form: 'createCompetition'
})(CategoriesForm)

const FormStyles = styled.div``
