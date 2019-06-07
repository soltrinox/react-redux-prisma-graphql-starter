import React from 'react'
import {Layout, Icon, Button, Avatar, Menu, Dropdown} from 'antd'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {useStore} from 'easy-peasy'

import Logo from '../Logo'
import Signout from '../../components/Auth/Signout'

export default function DashboardHeader() {
  const user = useStore(store => store.users.currentUser)

  const menu = (
    <Menu>
      {user.isAdmin && (
        <Menu.Item key={0}>
          <NavLink to="/admin">Admin</NavLink>
        </Menu.Item>
      )}
      {user.isAdmin && <Menu.Divider />}
      <Menu.Item key={1}>
        <Signout />
      </Menu.Item>
    </Menu>
  )
  return (
    <DashboardHeaderStyles>
      <Logo />

      <div className="menu">
        <span className="user-nickname">{user.nickname} </span>
        <Dropdown overlay={menu} placement="bottomRight">
          <Avatar shape="square" size="large" icon="user" />
        </Dropdown>
      </div>
    </DashboardHeaderStyles>
  )
}

const DashboardHeaderStyles = styled.header`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: ${props => props.theme.dark_gray_2};
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 10;

  .user-nickname {
    color: ${props => props.theme.gray_1};
  }
`
