import React from "react";

import classes from "./Input.css";

const Input = (props) => {
  let inputEl = null;
  const inputClasses = [classes.InputEl];
  let validationError = null;

  if (props.invalid && props.touched) {
    validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
  }

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputEl = (
        <input
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputEl = (
        <textarea
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      inputEl = (
        <select
          onChange={props.changed}
          className={inputClasses.join(" ")}
          value={props.value}
        >
          {props.elementConfig.options.map((op) => (
            <option key={op.value} value={op.value}>
              {op.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputEl = (
        <input
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Lable}>{props.lable}</label>
      {inputEl}
      {validationError}
    </div>
  );
};

export default Input;
