import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Spin} from 'antd'

const propTypes = {}

const SpinUI = ({...props}) => {
  return (
    <SpinStyles>
      <Spin {...props} />
    </SpinStyles>
  )
}
SpinUI.propTypes = propTypes
export default SpinUI

const SpinStyles = styled.div`
width:100%
height: 100vh
display: flex;
  align-items: center;
  justify-content: center;
`
