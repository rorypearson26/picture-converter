import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  //Modified from Mosh Hamedani React course source-code

  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  // handleSubmit = (e) => {
  //   e.preventDefault();

  //   const errors = this.validate();
  //   //If truthy return the errors object but if falsy return an empty object
  //   this.setState({ errors: errors || {} });
  //   if (errors) return;

  //   this.doSubmit();
  // };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
      data[input.name] = input.value;
    }
    this.setState({ data, errors });
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  renderInput = (options) => {
    const { errors } = this.state;
    const { name, ...rest } = options;

    return (
      <Input
        name={name}
        onChange={this.handleChange}
        error={errors[name]}
        {...rest}
      />
    );
  };
}

export default Form;