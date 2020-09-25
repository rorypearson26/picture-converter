import React from "react";

const Input = ({ name, label, error, type = "tel", ...rest }) => {
  //Modified from Mosh Hamedani React course source-code
  Input.defaultProps = { type: "tel" };
  return (
    <div className="form-group m-2">
      <small className="justify-content-center d-flex m-2" htmlFor={name}>
        {label}
      </small>
      <input
        className="form-control text-center"
        {...rest}
        name={name}
        id={name}
        type={type}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
