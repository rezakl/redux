import React from 'react'
import { connect } from 'react-redux'

const MainPanel = ({store}) => {
  var state = store.getState().last()
  var Component = require('./' + state.component).default
  return (
    <Component store={store} />
  )
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(MainPanel)
