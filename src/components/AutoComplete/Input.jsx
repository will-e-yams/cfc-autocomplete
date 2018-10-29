import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";

class AutoCompleteInput extends Component {
  render() {
    const { placeholder, value, onChange } = this.props;

    return (
      <input
        className="form-control"
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    );
  }
}

export default AutoCompleteInput;
