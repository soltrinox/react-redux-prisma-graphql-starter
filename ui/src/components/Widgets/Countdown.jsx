import React, {useRef, useEffect, useState} from 'react'
import {useStore} from 'easy-peasy'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import * as FlipClock from 'flipclock'
import './flipclock.css'

const propTypes = {
  duration: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired
}

function Countdown({duration, status}) {
  const placeholder = useRef(null)
  const [clock, setClock] = useState(null)
  const {competitionStatus} = useStore(store => store)

  useEffect(() => {
    let flipClock = $('.clock').FlipClock(duration, {
      clockFace: 'HourlyCounter',
      clockFaceOptions: {
        countdown: true,
        showSeconds: true
      }
    })
    setClock(flipClock)
  }, [])

  if (clock && competitionStatus !== 'ACTIVE') {
    clock.stop()
  } else if (clock) {
    clock.start()
  }

  return (
    <CountdownStyles>
      <div id="clock" className="clock" ref={placeholder} />
    </CountdownStyles>
  )
}
Countdown.propTypes = propTypes

export default Countdown
const CountdownStyles = styled.div`
  height: 80px;
  margin-top: 50px;

  .flipclock-wrapper {
    background-color: transparent;
    height: 64px;
    margin: 0;

    .flipclock-divider {
      height: 50px;
    }

    .flipclock-divider .flipclock-label {
      right: -68px;
      color: ${props => props.theme.gray_1};
    }
    .flipclock-dot {
      &.top {
        top: 19px;
        background: ${props => props.theme.gray_1};
      }
      &.bottom {
        top: 36px;
        background: ${props => props.theme.gray_1};
      }
    }

    ul {
      line-height: 52px;
      height: 52px;
      padding: 0;
      width: 39px;

      li {
        line-height: unset;
      }

      .inn {
        font-size: 30px;
      }
    }
  }
`
