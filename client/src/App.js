import React, { Component } from 'react'
import Form from './Form.js'


class App extends Component {
  constructor() {
    super()
    this.state = {
      route: null,
      busNumber: null,
      timestamp: Date.now()
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    if(isNaN(value)) {
      this.setState(() => ({
        [name]: 0
      }))
      return
    }
    const num = parseInt(value)
    this.setState(() => ({
      [name]: num
    }))
  }

  render() {
    return (
      <div>
        <h1>Hello React; it's been nearly a year!!</h1>
        <Form {...this.state} handleChange={this.handleChange}/>
      </div>
    )
  }
}

export default App