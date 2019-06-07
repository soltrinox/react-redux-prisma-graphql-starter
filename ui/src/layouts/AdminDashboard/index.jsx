import React, {useState} from 'react'
import {useActions, useStore} from 'easy-peasy'
import {Layout} from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Notifications from '../../components/Notifications'
import Subscriptions from '../../subscriptions'
import SpinUI from '../../components/UI/Spin'

import AdminDashboardHeader from './Header'
import AdminDashboardSideNav from './SideNav'

const {Content} = Layout

const propTypes = {
  children: PropTypes.node.isRequired
}

export default function AdminDashboardLayout({children}) {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [loading, setLoading] = useState(false)
  const {
    loaded: {admin: stateFetchedAlready}
  } = useStore(store => store)
  const {fetchInitialState, setLoadedState} = useActions(actions => actions)

  if (!stateFetchedAlready && !loading) {
    waitForFetchInitialState()
  }

  async function waitForFetchInitialState() {
    setLoading(true)
    await fetchInitialState()
    setLoadedState('admin')
    setLoading(false)
  }

  if (loading) {
    return <SpinUI tip="Making sure everything is setup" size="large" />
  }

  return (
    <AdminDashboardLayoutStyles>
      <Notifications />
      {/* <Subscriptions /> */}
      <Layout style={{minHeight: '100vh'}}>
        <AdminDashboardSideNav collapsed={isCollapsed} />
        <Layout
          style={{
            marginLeft: isCollapsed ? 80 : 200,
            width: 'calc(100vw - 200px)'
          }}
        >
          <AdminDashboardHeader onToggle={() => setIsCollapsed(!isCollapsed)} />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </AdminDashboardLayoutStyles>
  )
}

AdminDashboardLayout.propTypes = propTypes

const AdminDashboardLayoutStyles = styled.div``
