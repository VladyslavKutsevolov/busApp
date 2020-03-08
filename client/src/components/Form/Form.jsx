import React from "react";
import AutoComplete from "./AutoComplete";
import FormModal from "./FormModal";
// import './Form.scss'

const Form = ({ handleChange, route, allRoutes }) => (
  <>
    <h2>Feedback about whom?</h2>
    <AutoComplete handleChange={handleChange} suggestions={allRoutes} />
    <FormModal route={route} />
  </>
);

export default Form;
