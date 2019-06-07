import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Link, Location} from '@reach/router'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import {Layout, Menu, Icon} from 'antd'
import logo from '../../../assets/images/logo.png'
import moment from 'moment'
import version from '../../../../version'
import PlatformLogo from '../PlatformLogo'

const {Sider} = Layout

const propTypes = {
  collapsed: PropTypes.bool
}

const navButtons = [
  {
    icon: 'home',
    path: '/admin',
    name: 'Home'
  },
  {
    icon: 'crown',
    path: '/admin/competitions',
    name: 'Competitions'
  },
  {
    icon: 'pie-chart',
    path: '/admin/categories',
    name: 'Categories'
  },
  {
    icon: 'share-alt',
    path: '/admin/challenges',
    name: 'Challenges'
  },
  {
    icon: 'setting',
    path: '/admin/settings',
    name: 'Settings'
  }
]

export default function AdminDashboardSideNav({collapsed}) {
  return (
    <Location>
      {({location}) => {
        return (
          <AdminDashboardSideNavStyles>
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <PlatformLogo />

              <nav>
                <Menu
                  theme="dark"
                  mode="inline"
                  defaultSelectedKeys={[location.pathname]}
                >
                  {navButtons.map((button, index) => (
                    <Menu.Item key={button.path}>
                      <NavLink to={button.path} activeClassName="active">
                        <Icon type={button.icon} />
                        <span>{button.name}</span>
                      </NavLink>
                    </Menu.Item>
                  ))}
                </Menu>

                {process.env.NODE_ENV === 'development' && (
                  <Menu theme="dark" className="secondary-menu">
                    <Menu.Item>
                      <Icon
                        type="question-circle"
                        style={{fontSize: '24px'}}
                        className="disabled"
                      />
                      <span>{moment(version).format('lll')}</span>
                    </Menu.Item>
                  </Menu>
                )}
              </nav>
            </Sider>
          </AdminDashboardSideNavStyles>
        )
      }}
    </Location>
  )
}

AdminDashboardSideNav.propTypes = propTypes

const AdminDashboardSideNavStyles = styled.div`
  .active {
    &::after {
      position: absolute;
      background-color: red;
    }
    color: white !important;
  }

  .ant-layout-sider {
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;

    .ant-menu-inline-collapsed > .ant-menu-item {
      padding: 0 28px !important;
      text-align: center;
    }
  }

  nav {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 100px);
    justify-content: space-between;
    align-items: center;

    .secondary-menu {
      .ant-menu-item-selected {
        background-color: #001528;
      }
    }
  }
`
