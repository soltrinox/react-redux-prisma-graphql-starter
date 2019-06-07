import React from 'react'
import styled from 'styled-components'

import NotFoundImage from '../../assets/images/404.jpg'

export default function Error404() {
  return (
    <Error404Styles>
      <h1>Get in line buddy, we got here first.</h1>
      <small>For the uninitiated - page not found</small>
      <div className="image" />
    </Error404Styles>
  )
}

const Error404Styles = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    text-align: center;
    margin-top: 40px;
    margin-bottom: 10px;
    color: ${props => props.theme.gray_1};
  }

  small {
    opacity: 0.5;
    color: ${props => props.theme.gray_1};
    margin-bottom: 20px;
  }

  .image {
    background-image: url(${NotFoundImage});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    max-width: 1000px;
    height: 100%;
    max-height: 600px;
    border-radius: 20px;
  }
`
