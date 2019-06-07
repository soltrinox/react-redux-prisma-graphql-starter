import React from 'react'
import styled from 'styled-components'
import {Icon, Tooltip} from 'antd'

import Challenges from '../Challenges'

export default function Category({category}) {
  return (
    <CategoryStyles>
      <h3>
        <span className="category-name">{category.name} </span>
        <Tooltip placement="right" title={category.description}>
          <Icon type="question-circle" style={{fontSize: 20}} />
        </Tooltip>
      </h3>
      <hr />
      <div className="challenges">
        <Challenges categoryID={category.id} />
      </div>
    </CategoryStyles>
  )
}

const CategoryStyles = styled.div`
  padding: 20px;
  width: 100%;

  h3 {
    color: ${props => props.theme.gray_1};

    .category-name {
      font-size: 24px;
    }
  }

  hr {
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
`
