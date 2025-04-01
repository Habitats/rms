import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {createDevTools} from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='alt-q'
               changePositionKey='alt-a'
               fluid={false}
               defaultIsVisible={false}
               defaultSize={250}>
    <LogMonitor theme='tomorrow' select={state => state.general.projects}/>
  </DockMonitor>
)

export default DevTools