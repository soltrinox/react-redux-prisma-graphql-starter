import React, {useState} from 'react'
import {useActions, useStore} from 'easy-peasy'
import {Layout} from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Notifications from '../../components/Notifications'
import Subscriptions from '../../subscriptions'
import LockModal from '../../LockModal'
import SpinUI from '../../components/UI/Spin'

import DashboardHeader from './Header'

const {Content} = Layout

const propTypes = {
  children: PropTypes.node.isRequired
}

export default function DashboardLayout({children}) {
  const [loading, setLoading] = useState(false)
  const {
    loaded: {user: stateFetchedAlready}
  } = useStore(store => store)
  const {fetchInitialState, setLoadedState} = useActions(actions => actions)

  if (!stateFetchedAlready && !loading) {
    waitForFetchInitialState()
  }

  async function waitForFetchInitialState() {
    setLoading(true)
    await fetchInitialState()
    setLoadedState('user')
    setLoading(false)
  }

  if (loading) {
    return <SpinUI tip="Making sure everything is setup" size="large" />
  }

  return (
    <DashboardLayoutStyles>
      <Notifications />
      <Subscriptions />
      <LockModal />
      <Layout style={{minHeight: '100vh'}}>
        <DashboardHeader />
        <Content>{children}</Content>
      </Layout>
    </DashboardLayoutStyles>
  )
}

DashboardLayout.propTypes = propTypes

const DashboardLayoutStyles = styled.div`
  .ant-layout-content {
    background-color: ${props => props.theme.dark_gray_2};
  }
`
