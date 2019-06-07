import React, {useState} from 'react'
import styled from 'styled-components'
import {useActions} from 'easy-peasy'
import {Row, Col} from 'antd'
import Signup from '../components/Auth/Signup'
import {SpinUI} from '../components/UI'

export default function ScreensSignin() {
  return (
    <SignStyles>
      <Row type="flex" justify="center" align="middle">
        <Signup />
      </Row>
    </SignStyles>
  )
}

const SignStyles = styled.div`
  height: 100vh;

  .ant-row-flex {
    height: 100vh;
  }
`
