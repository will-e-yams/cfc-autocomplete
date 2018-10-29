import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import spin from "./spinner.gif";

const Spinner = props => {
  const { text } = props;
  return (
    <div>
      <span>{text}</span>
      <img src={spin} alt="loading..." />
    </div>
  );
};

export default Spinner;
