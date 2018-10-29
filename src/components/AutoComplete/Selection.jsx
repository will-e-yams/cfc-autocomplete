import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

const AutoCompleteSelection = props => {
  if (props.selection) {
    const { html, id } = props.selection;
    const displayText = props.selection !== null ? `${html}, ${id}` : "";
    return (
      <p>
        <span className="badge badge-primary">{displayText}</span>
      </p>
    );
  }
  return "";
};

export default AutoCompleteSelection;
