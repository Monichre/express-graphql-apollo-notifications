import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { ToastContainer, toast } from 'react-toastify'
import PushNotification from './components/PushNotification'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

const SubNewNotification = gql`
  subscription {
    newNotification {
      label
    }
  }
`
class App extends Component {
  componentDidMount () {
    console.log(this.props)
  }
  componentDidUpdate (prevProps, prevState) {
    console.log(prevProps)
    console.log(this.props)
  }
  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    toast(nextProps)
  }
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        <div className='App-intro'>
          <PushNotification />
        </div>
        <ToastContainer />
      </div>
    )
  }
}

export default graphql(SubNewNotification)(App)
