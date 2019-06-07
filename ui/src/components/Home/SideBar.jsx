import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import {Layout, Menu, Icon} from 'antd'
import logo from '../../../assets/images/logo.png'
import moment from 'moment'
import {useStore} from 'easy-peasy'
import version from '../../../../version'

import Countdown from '../Widgets/Countdown'
import Scoreboard from '../Widgets/Scoreboard'

const {Sider} = Layout

export default function SideBar({collapsed}) {
  const {listAsObject: settings} = useStore(store => store.settings)
  const {list: competitions} = useStore(store => store.competitions)

  const competition = competitions.find(
    competition => competition.id === settings.competition
  )
  let duration = (moment(competition.endTime) - moment()) / 1000
  duration = duration < 0 ? 0 : duration
  return (
    <SideBarStyles>
      <div className="widgets">
        {competition && (
          <div className="competition-widget">
            <Countdown duration={duration} status={competition.status} />
          </div>
        )}
        <Scoreboard />
      </div>
    </SideBarStyles>
  )
}

const SideBarStyles = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 72px);
  width: 400px;

  .widgets {
    // padding left/right needs to remain at least 15px due to virtual scrollbar styles
    padding: 10px 25px;
    height: 100%;
    background-color: ${props => props.theme.dark_gray_1};
  }
`
