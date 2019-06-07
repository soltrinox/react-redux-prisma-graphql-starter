import React from 'react'
import {Layout, Icon, Button} from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

import Signout from '../../components/Auth/Signout'

const {Header} = Layout

const propTypes = {
  collapsed: PropTypes.bool,
  onToggle: PropTypes.func
}

export default function AdminDashboardHeader({collapsed, onToggle}) {
  return (
    <AdminDashboardHeaderStyles>
      <Header style={{background: '#fff', padding: 0}}>
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={onToggle}
        />
        <Button>
          <NavLink to="/">Back to user dashboard</NavLink>
        </Button>
        <Signout />
      </Header>
    </AdminDashboardHeaderStyles>
  )
}

AdminDashboardHeader.propTypes = propTypes

const AdminDashboardHeaderStyles = styled.header`
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
`
