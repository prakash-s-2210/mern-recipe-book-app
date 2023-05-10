import React from 'react';
import "../customInput/Input.scss";
import { useField } from "formik";

/**
 * A custom input component that uses Formik hooks to handle form input and validation.
 * 
 * @param {string} label - The label for the input.
 * @param {object} props - Additional props to pass to the input element.
 * @returns A custom input element with validation and error handling.
 */
const Input = ({label, ...props}) => {
    const [field, meta] = useField(props);
  return (
    <div className='input-container'>
      <input 
      autoComplete='off'
        {...field}
        {...props}  
        className = {meta.touched && meta.error ? "input-error":""}
        
      />
      <label className = { !field.value ?  'label' : 'hide-label'} >{label}</label>
      {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
    </div>
  )
}

export default Input;