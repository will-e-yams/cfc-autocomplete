import "bootstrap/dist/css/bootstrap.min.css";
import "./AutoComplete.css";
import React, { Component } from "react";
import AutoCompleteInput from "./Input";
import AutoCompleteResultList from "./ResultList";
import AutoCompleteSelection from "./Selection";
import api from "../../api";

class AutoComplete extends Component {
  placeholder = {
    noSelection: "let's get searching",
    selection: "nice choice."
  };

  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      loading: false,
      placeholder: this.placeholder.noSelection,
      results: [],
      selection: null, // `entry` object
      showResults: false,
      inputValue: "de"
    };
    // bind `this`
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  /**
   * Performs initial search on component mount if
   * there is any initializing data
   *
   * @memberof AutoCompleteInput
   */
  componentDidMount = () => {
    // initial search if module came with value
    if (this.state.inputValue !== "") {
      this.search(this.state.inputValue);
      this.showResults(this.state.inputValue !== "");
    }
  };

  showResults = value => {
    this.setState({ showResults: value });
  };

  /**
   * Handles change event on the input field by
   * updating the state and performing the search
   *
   * @memberof AutoComplete
   */
  handleChange = e => {
    const value = e.target.value;
    this.setState({ inputValue: value, showResults: value.length > 0 });
    this.search(value);
  };

  /**
   * Handles selection of a result
   *
   * @memberof AutoComplete
   */
  handleSelect = selection => {
    console.log("sel", selection);
    this.setState({ inputValue: "", selection, showResults: false });
  };

  /**
   * Performs the search
   *
   * @memberof AutoComplete
   */
  search = q => {
    this.setState({ loading: true }, async () => {
      const results = await api.searchNames(q);
      this.setState({ results, loading: false });
    });
  };

  render() {
    const {
      loading,
      limit,
      selection,
      results,
      showResults,
      inputValue
    } = this.state;
    console.log(loading, limit, selection, results, showResults, inputValue);
    const resultList = showResults ? (
      <AutoCompleteResultList
        loading={loading}
        results={results}
        limit={limit}
        onSelect={this.handleSelect}
      />
    ) : (
      ""
    );

    return (
      <React.Fragment>
        <AutoCompleteInput
          onChange={this.handleChange}
          value={inputValue}
          placeholder={
            selection
              ? this.placeholder.selection
              : this.placeholder.noSelection
          }
        />
        {resultList}
        <AutoCompleteSelection selection={selection} />
      </React.Fragment>
    );
  }
}

export default AutoComplete;
