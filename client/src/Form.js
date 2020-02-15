import React from 'react'

const Form = props => (
  <div>
    <label htmlFor="route">
      <input type="text" name="route" id="route" onChange={props.handleChange} value={props.route} />
    </label>
    <label htmlFor="busNumber">
      <input type="text" name="busNumber" id="busNumber" onChange={props.handleChange} value={props.busNumber} />
    </label>
  </div>
)

export default Form