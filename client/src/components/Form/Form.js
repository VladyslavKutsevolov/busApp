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
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="busNumber">
        Bus Number:
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="busNumber" name="busNumber" type="text" placeholder="1101" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="issue">
        Issue:
        </label>
        <div class="mb-4">
          <select class="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <label htmlFor="speed">Speed
            <input input="checkbox" id="speed" name="speed" value="Speed"/></label>
            <label htmlFor="unsafe">Rough/Unsafe<input input="checkbox" id="unsafe" name="unsafe" value="Rough/Unsafe"/></label>
            <label htmlFor="unprofessional">Unprofessional<input input="checkbox" id="unprofessional" name="unprofessional" value="Unprofessional"/></label>
          </select>
        </div>
      </div>
    </div>
  </>
)

export default Form