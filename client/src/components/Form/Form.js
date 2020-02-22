import React from 'react'
// import './Form.scss'

const Form = props => (
  <>
    <h2>Feedback about whom?</h2>
    <div className="form">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="route">
        Bus Route Numbers:
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="route" name="route" type="text" placeholder="104" />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="busNumber">
        Bus Number:
        </label>
        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="busNumber" name="busNumber" type="text" placeholder="1101" />
      </div>
    </div>
  </>
)

export default Form