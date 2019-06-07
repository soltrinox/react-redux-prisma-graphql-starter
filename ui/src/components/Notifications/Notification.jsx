import React, {useLayoutEffect} from 'react'
import {useActions} from 'easy-peasy'
import {Button, notification} from 'antd'
import PropTypes from 'prop-types'

const propTypes = {
  notification: PropTypes.object.isRequired
}

const Notification = React.memo(
  ({
    notification: {
      message,
      description,
      type,
      buttonText,
      showButton,
      duration,
      action,
      key
    }
  }) => {
    const onButtonClick = useActions(actions => actions[action])
    const removeNotification = useActions(
      actions => actions.notifications.remove
    )

    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => {
          if (onButtonClick) onButtonClick()
          close()
        }}
      >
        {buttonText}
      </Button>
    )

    function close() {
      notification.close(key)
      removeNotification(key)
    }

    useLayoutEffect(() => {
      notification[type]({
        message,
        description,
        duration: duration || 0,
        btn: showButton ? btn : null,
        key,
        onClose: close
      })
      return undefined
    }, [])

    return null
  }
)

Notification.propTypes = propTypes

export default Notification
