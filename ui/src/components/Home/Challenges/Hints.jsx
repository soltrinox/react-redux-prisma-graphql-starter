import React from 'react'
import {useStore, useActions} from 'easy-peasy'
import styled from 'styled-components'

import Hint from './Hint'

export default function Hints({challenge}) {
  const hints = useStore(store => store.hints.list)
    .filter(hint => hint.challenge.id === challenge.id)
    .sort((a, b) => a.penalty - b.penalty)

  return (
    <>
      {!!hints.length && (
        <HintsStyles>
          <span className="header">Hints: </span>
          <section className="hints">
            {hints.map(hint => (
              <Hint hint={hint} key={hint.id} />
            ))}
          </section>
        </HintsStyles>
      )}
    </>
  )
}

const HintsStyles = styled.div`
  background-color: ${props => props.theme.dark_gray_3};
  padding: 10px;
  border-radius: 6px;
  margin-top: 10px;

  .header {
    color: ${props => props.theme.gray_1};
    font-weight: bold;
  }

  .hints {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: 10px;
  }
`
