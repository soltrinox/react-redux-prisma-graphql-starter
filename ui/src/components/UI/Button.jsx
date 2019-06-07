import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Button} from 'antd'

const propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string
}

const ButtonUI = ({children, ...props}) => {
  return (
    <ButtonStyles>
      <Button {...props}>{children}</Button>
    </ButtonStyles>
  )
}

ButtonUI.propTypes = propTypes

export default ButtonUI

const ButtonStyles = styled.div`
  .ant-btn {
    background-color: #f96f1d;
    border-color: #f96f1d;
    color: #fff;

    &:hover,
    &:focus {
      background-color: #f96f1d;
      border-color: #f96f1d;
      color: #ffffff;
    }

    &:disabled {
      background-color: #38424b;
      border-color: #38424b;
      color: #e0e0e0;

      &:hover {
        background-color: #38424b;
        border-color: #38424b;
        color: #e0e0e0;
      }
    }
  }

  .ant-btn-primary {
    background-color: #323a43;
    border-color: #323a43;
    color: #e0e0e0;
  }
  .ant-btn-primary:hover,
  .ant-btn-primary:focus {
    background-color: #293037;
    border-color: #293037;
  }
  .ant-btn-primary:disabled {
    color: rgba(0, 0, 0, 0.25);
    background-color: #f5f5f5;
    border-color: #d9d9d9;
  }
`
