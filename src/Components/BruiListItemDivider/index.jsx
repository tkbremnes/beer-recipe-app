import React, { Component } from 'react';

import "./style.css";

class BruiListItemDivider extends Component {
    render() {
        return (
            <div className="BruiListItemDivider">
                <span>{ this.props.children }</span>
            </div>
        )
    }
}

export default BruiListItemDivider;