// Package import
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { List } from 'immutable'

// Material theme
import '../../theme/assets/css/bootstrap.min.css'
import '../../theme/assets/sass/material-dashboard.scss'
import '../index.html'

// Components
import Sidebar from './Sidebar.jsx'
import MainPanel from './MainPanel.jsx'

// API services
const API_HOST    = '<set your api hostname here>'
const API_ROOT = '/api/v1'
const API_URL     = {
  'USER'      : 'https://' + API_HOST + ':1025' + API_ROOT,
  'CATALOG'   : 'http://' + API_HOST + ':1026' + API_ROOT,
  'ORDER'     : 'http://' + API_HOST + ':1027' + API_ROOT,
  'MESSAGING' : 'http://' + API_HOST + ':1028' + API_ROOT,
  'FILE'      : 'http://' + API_HOST + ':1029' + API_ROOT
}

// Define actions
function actions(state = List(), action) {
  if (action.type == '@@redux/INIT') return state
  console.log('ACTION REQUEST: ' + JSON.stringify(action))
  switch (action.type) {
    case 'NEW':
      state = state.push({ component: action.component })
      console.log('STATE:' + JSON.stringify(state))
      return state
    case 'POP':
      state = state.pop()
      console.log('STATE:' + JSON.stringify(state))
      return state
    case 'API':
      jQuery(function ($) {
        $.ajax({
          url: API_URL[action.service.name] + action.service.request.endpoint,
          type: action.service.request.method,
          data: action.service.request.data,
          dataType: 'json',
          success: function (data) {
            const currentState = state.last()
            action.service.response = data
            if (currentState['service'])
              currentState['service'].push(action.service)
            else
              currentState['service'] = [action.service]
            state = state.pop()
            state = state.push(currentState)
            console.log('STATE:' + JSON.stringify(state))
            return state
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log('API REQUEST ERROR: ' + JSON.stringify(action.service))
          }
        })
      })
      return state
    default:
      return state
  }
}

// Define store
const AppStore = createStore(actions)

// Set initial component
AppStore.dispatch({ type: 'NEW', component: 'Dashboard.jsx' })

// Render application
render(
  <Provider store={AppStore}>
    <div className="wrapper">
      <Sidebar store={AppStore} />
      <MainPanel store={AppStore} />
    </div>
  </Provider>,
  document.getElementById('react')
)
