import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Spinner from "../Spinner/Spinner";

class AutoCompleteResultList extends Component {
  menuClassName = "ac-dropdown-menu";
  itemClassName = "ac-dropdown-item";

  /**
   * Shortens the result list to props.limit value
   *
   * @memberof AutoCompleteResultList
   */
  truncate = (results = [], limit = 10) => {
    return results.slice(0, limit);
  };

  /**
   * Converts search result item to ListItem props
   *
   * @memberof AutoCompleteResultList
   */
  makeListItem = searchResult => {
    return {
      id: searchResult.value,
      html: searchResult.label,
      className: this.itemClassName
    };
  };

  render() {
    const { loading, results, limit, onSelect } = this.props;
    let listItems = "";
    if (loading) {
      listItems = [
        <li className={this.itemClassName} key={-1}>
          <Spinner text="just a sec&nbsp;&nbsp;" />
        </li>
      ];
    } else if (results.length === 0) {
      listItems = [
        <li className={this.itemClassName} key={-1}>
          no results
        </li>
      ];
    } else {
      const shortList = this.truncate(results, limit);
      listItems = shortList.map(searchResult => {
        const item = this.makeListItem(searchResult);
        return <ListItem key={item.id} item={item} onSelect={onSelect} />;
      });
    }
    return (
      <div className={this.menuClassName}>
        <ul>{listItems}</ul>
      </div>
    );
  }
}

const ListItem = props => {
  if (props && props.item) {
    const { html, id, className } = props.item;
    return (
      <li
        className={className || "dropdown-item"}
        key={id}
        onClick={() => props.onSelect(props.item)}
      >
        {html}
      </li>
    );
  }

  return "";
};

export default AutoCompleteResultList;
