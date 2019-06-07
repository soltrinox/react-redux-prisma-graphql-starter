import React from 'react'
import {Alert, notification} from 'antd'
import PropTypes from 'prop-types'

const DisplayError = ({error, type = 'alert', message = ''}) => {
  if (!error || !error.message) return null

  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => {
      if (type === 'notification') {
        return notification['error']({
          message: 'Error',
          description: message,
          duration: 5
        })
      } else {
        return (
          <Alert
            message="Error"
            description={error.message.replace('GraphQL error: ', '')}
            type="error"
            showIcon
            key={i}
          />
        )
      }
    })
  }

  return type === 'notification' ? (
    notification['error']({
      message: 'Error',
      description: message || error.message.replace('GraphQL error: ', ''),
      duration: 5
    })
  ) : (
    <Alert
      style={{margin: '10px 0', width: '100%'}}
      message="Error"
      description={error.message.replace('GraphQL error: ', '')}
      type="error"
      showIcon
    />
  )
}

DisplayError.defaultProps = {
  error: {}
}

DisplayError.propTypes = {
  error: PropTypes.object,
  type: PropTypes.string,
  message: PropTypes.string
}

export default DisplayError
