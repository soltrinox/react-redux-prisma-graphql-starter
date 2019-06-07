import React from 'react'
import {Field, propTypes, reduxForm} from 'redux-form'
import {Form, Input, Button, notification, Row, Col, Switch} from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {useActions, useStore} from 'easy-peasy'

import Error from '../../ErrorMessage'

const FormItem = Form.Item

const SettingsForm = props => {
  const {handleSubmit} = props
  const {list, error, loading} = useStore(store => store.settings)
  const form = useStore(store => store.form)
  const updateSettings = useActions(actions => actions.settings.update)

  const camelToTitle = camelCase =>
    camelCase
      .replace(/([A-Z])/g, match => ` ${match}`)
      .replace(/^./, match => match.toUpperCase())
      .trim()

  return (
    <FormStyles>
      <Row type="flex" justify="start" align="middle">
        <Col span={24}>
          <Form
            onSubmit={e => {
              e.preventDefault()
              updateSettings(form.updateSettings.values)
            }}
          >
            <Error error={error} />
            {list.map(setting => (
              <FormItem label={camelToTitle(setting.key)} key={setting.id}>
                <Field
                  name={setting.key}
                  component={props => {
                    return setting.type === 'Boolean' ? (
                      <Switch
                        checked={props.input.value === 'true'}
                        onChange={val => props.input.onChange(val.toString())}
                      />
                    ) : (
                      <Input
                        value={props.input.value}
                        onChange={val => props.input.onChange(val)}
                      />
                    )
                  }}
                />
              </FormItem>
            ))}

            <FormItem>
              <Button
                loading={loading}
                disabled={loading}
                type="primary"
                htmlType="submit"
                className="submit-btn"
              >
                Update settings
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </FormStyles>
  )
}

SettingsForm.propTypes = propTypes

export default reduxForm({
  form: 'updateSettings'
})(SettingsForm)

const FormStyles = styled.div``
