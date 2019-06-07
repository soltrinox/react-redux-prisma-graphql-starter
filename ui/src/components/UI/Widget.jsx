import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node.isRequired
}

const Widget = ({children}) => {
  return <WidgetStyles>{children}</WidgetStyles>
}

Widget.propTypes = propTypes

export default Widget

const WidgetStyles = styled.div`
  margin: 10px;
  padding: 10px;
  background: #ffffff;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
  transition: opacity 200ms ease-in;
  will-change: opacity;
`
