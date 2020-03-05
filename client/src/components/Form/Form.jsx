import React from "react";
import AutoComplete from "./AutoComplete";
import FormModal from "./FormModal";
// import './Form.scss'

const Form = ({ handleChange, allRoutes }) => (
  <>
    <h2>Feedback about whom?</h2>
    <AutoComplete handleChange={handleChange} suggestions={allRoutes} />
    <FormModal />
  </>
);

export default Form;
