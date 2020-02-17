import React from 'react'
import './Form.scss'

const Form = props => (
  <div className="form">
    <label htmlFor="route">Bus Route Numbers:
      <input type="text" name="route" id="route" onChange={props.handleChange} value={props.route} placeholder="104" />
    </label>
    <label htmlFor="busNumber">Bus Number:
      <input type="text" name="busNumber" id="busNumber" onChange={props.handleChange} value={props.busNumber} placeholder="1101"/>
    </label>
  </div>
)

export default Form