import React from 'react'
import {Form} from 'antd'
import {useStore, useActions} from 'easy-peasy'
import {reduxForm, Field} from 'redux-form'
import Error from '../../ErrorMessage'
import {ButtonUI} from '../../UI'

const FormItem = Form.Item

const SubmissionForm = ({challenge}) => {
  const {error, loading} = useStore(store => store.submissions)
  const {create} = useActions(actions => actions.submissions)
  const form = useStore(store => store.form)
  return (
    <Form
      layout="inline"
      onSubmit={e => {
        e.preventDefault()
        create({
          challenge: challenge.id,
          content: form.createSubmission.values.flag
        })
      }}
    >
      <Error error={error} />
      <FormItem label="Flag" required>
        <Field name="flag" component="input" type="text" />
      </FormItem>

      <FormItem>
        <ButtonUI
          loading={loading}
          disabled={
            loading ||
            !(
              form &&
              form.createSubmission &&
              form.createSubmission.hasOwnProperty('values')
            )
          }
          icon="flag"
          type="primary"
          htmlType="submit"
          className="submit-btn"
        >
          Submit flag
        </ButtonUI>
      </FormItem>
    </Form>
  )
}

export default reduxForm({
  form: 'createSubmission',
  enableReinitialize: true
})(SubmissionForm)
