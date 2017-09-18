import React from "react";
import "./style.css";

export default class BruiCard extends React.Component {
  render() {
    function renderHeader(headerText) {
      if (!headerText) {
        return;
      }

      return <header>{ headerText }</header>
    }

    return (
      <div className="brui-card">
        { renderHeader(this.props.header) }
        { this.props.children }
      </div>
    )
  }
}
