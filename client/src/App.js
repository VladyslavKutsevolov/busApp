import React, { Component } from 'react'
import Form from './components/Form/Form.js'
import Map from './components/Map/Map.js'
import './App.scss'


class App extends Component {
  constructor() {
    super()
    this.state = {
      route: '',
      busNumber: '',
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
    // const num = parseInt(value)
    // this.setState(() => ({
    //   [name]: num
    // }))
  }

  render() {
    return (
      <>
      <div className="app">
        <h1 class="main-title">Hello React; it's been nearly a year!!</h1>
        <Form {...this.state} handleChange={this.handleChange}/>
      </div>
      <div>
        <Map />
      </div>
      </>
    )
  }
}

export default App