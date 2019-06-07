import React from 'react'
import {useStore} from 'easy-peasy'
import Notification from './Notification'

function Notifications() {
  const notifications = useStore(state => state.notifications.BUS)

  return (
    <>
      {notifications.map(notification => {
        return (
          <Notification key={notification.key} notification={notification} />
        )
      })}
    </>
  )
}

export default Notifications
