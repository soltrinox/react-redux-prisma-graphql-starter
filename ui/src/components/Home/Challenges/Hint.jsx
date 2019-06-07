import React from 'react'
import {useActions, useStore} from 'easy-peasy'
import {ButtonUI} from '../../UI'
import styled from 'styled-components'

export default function Hint({hint}) {
  const {loading} = useStore(store => store.hints)
  const disabled = useStore(store => store.users.currentUser.hintsUsed).find(
    hintUsed => hintUsed.id === hint.id
  )

  const {updateHintsUsed} = useActions(actions => actions.hints)
  return (
    <HintStyles>
      <ButtonUI
        loading={loading}
        disabled={loading || disabled}
        onClick={() => updateHintsUsed(hint)}
        type="default"
        icon="frown"
        className="button"
      >
        -{hint.penalty}&nbsp;points
      </ButtonUI>
      {disabled && <p>{hint.description}</p>}
      {!disabled && <p>Click the button to unlock</p>}
    </HintStyles>
  )
}

const HintStyles = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  .button {
    margin-right: 10px;
  }

  p {
    margin: 0;
    color: ${props => props.theme.gray_1};
  }
`
