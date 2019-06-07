import React from 'react'
import styled from 'styled-components'

export default function Logo() {
  return (
    <LogoStyles>
      <div className="logo">
        <span className="logo-container">
          <span className="shape" />
        </span>
      </div>
    </LogoStyles>
  )
}

const LogoStyles = styled.div`
  .logo-container {
    display: flex;
    padding: 10px;
    justify-content: flex-start;
    height: 72px;
  }
  .shape {
    width: 120px;
    background-image: url('https://2019.pentestcyprus.org/images/pentest-logo.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`
