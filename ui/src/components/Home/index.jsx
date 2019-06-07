import React from 'react'
import {Row, Col} from 'antd'
import styled from 'styled-components'
import {Scrollbars} from 'react-custom-scrollbars'

import useWindowResize from '../../hooks/windowResize'
import Categories from './Categories'
import SideBar from './SideBar'
import Filters from './Filters'

export default function Home() {
  const {width, height} = useWindowResize()

  return (
    <HomeStyles>
      <div className="left-side">
        <Filters />
        <Scrollbars
          style={{width: 'calc(100vw - 400px)'}}
          autoHeight
          autoHeightMin={300}
          autoHeightMax={window.innerHeight - 140}
        >
          <Categories />
        </Scrollbars>
      </div>
      <SideBar />
    </HomeStyles>
  )
}

const HomeStyles = styled.div`
  display: flex;

  .left-side {
    display: flex;
    flex-direction: column;
  }
`
