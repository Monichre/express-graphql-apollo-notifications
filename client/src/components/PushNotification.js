import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const POST_MUTATION = gql`
  mutation PushNotificationMutation($label: String!) {
    pushNotification(label: $label) {
      label
    }
  }

`

class PushNotification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: ''
    }
  
  }

  componentDidMount() {
    console.log(this.props)
  }

  push = async (e) => {
    e.preventDefault()
    const { label } = this.state
    const data = await this.props.pushNotificationMutation({
      variables: {
        label
      }
    })
    console.log(data)
    // this.setState({ label: '' });
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ label: e.target.value })
  }
  render () {
    return (
      <div>
      <input
        value={this.state.label}
        onChange={this.handleChange}
        type="text"
        placeholder="A label"
      />
      <button onClick={this.push}>Submit</button>
    </div>
    )
  }
}
export default graphql(POST_MUTATION, {name: 'pushNotificationMutation'})(PushNotification)