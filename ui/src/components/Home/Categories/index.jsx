import React from 'react'
import styled from 'styled-components'
import {useStore} from 'easy-peasy'

import Category from './Category'

export default function index() {
  const {list: categories} = useStore(store => store.categories)

  return (
    <CategoriesStyles>
      {categories
        .filter(category => !!category.challenges.length)
        .map(category => (
          <Category category={category} key={category.id} />
        ))}
    </CategoriesStyles>
  )
}

const CategoriesStyles = styled.div``
