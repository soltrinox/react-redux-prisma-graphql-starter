import React from 'react'
import {Button} from 'antd'
import {useStore, useActions} from 'easy-peasy'

export default function Signout() {
  const {loading} = useStore(store => store.auth)
  const {signout} = useActions(actions => actions.auth)

  return <a onClick={() => signout()}>Signout</a>
}
