import React, { Component } from 'react'
import Form from './components/Form/Form.js'
import Map from './components/Map/Map.js'
// import './App.scss'


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
  }

  render() {
    return (
      <>
      <div className="app p-6">
        <h1 className="text-3xl pb-4 text-center">BusApp</h1>
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