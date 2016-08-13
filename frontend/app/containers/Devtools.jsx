import React, {Component, PropTypes} from "react";
import {createDevTools} from "redux-devtools";
import LogMonitor from "redux-devtools-log-monitor";
import DockMonitor from "redux-devtools-dock-monitor";
// Exported from redux-devtools

// Monitors are separate packages, and you can make a custom one

// createDevTools takes a monitor and produces a DevTools component
const DevTools = createDevTools(
  // Monitors are individually adjustable with props.
  // Consult their repositories to learn about those props.
  // Here, we put LogMonitor inside a DockMonitor.
  <DockMonitor toggleVisibilityKey='alt-q'
               changePositionKey='alt-a'
               fluid={false}
               defaultIsVisible={false}
               defaultSize={250}>
    <LogMonitor theme='tomorrow' select={state => state.general.projects}/>
  </DockMonitor>
)

export default DevTools