import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'

const propTypes = {
  eventTime: PropTypes.string.isRequired
}

const CountdownText = ({eventTime}) => {
  const [timeLeft, setTimeLeft] = useState()
  const interval = 1000
  const [prefix, setPrefix] = useState()

  useEffect(() => {
    const timerID = setInterval(() => tick(), interval)

    return function cleanup() {
      clearInterval(timerID)
    }
  })

  function tick() {
    setPrefix(new Date(eventTime) > new Date() ? 'Starts in: ' : 'Elapsed: ')
    setTimeLeft(
      moment(eventTime)
        .countdown()
        .toString()
    )
  }

  return (
    <CountdownTextStyles>
      <span>{prefix}</span>
      <span style={{fontWeight: 'bold'}}>{timeLeft}</span>
    </CountdownTextStyles>
  )
}

CountdownText.propTypes = propTypes

export default CountdownText

const CountdownTextStyles = styled.div``
