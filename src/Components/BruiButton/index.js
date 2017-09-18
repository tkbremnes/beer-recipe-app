import React, { Component } from "react";
import PropTypes from "prop-types";

import "./style.css";

class BruiButton extends Component {
    _handleClick = (ev) => {
        this._buttonElement.blur();
        this.props.onClick && this.props.onClick(ev);
    }
    _handleTouchStart = (ev) => {
        this._buttonElement.focus();
        this.props.onDown && this.props.onDown(ev);
    }
    _handleTouchEnd = (ev) => {
        this._buttonElement.blur();
        this.props.onUp && this.props.onUp(ev);
    }
    _handleOnContextMenu = (ev) => {
        ev.preventDefault();
    }

    createRef = (button) => {
        this._buttonElement = button;
    }

    render() {
        return (
            <button
                ref={this.createRef}
                className="brui-button"
                onClick={ this._handleClick }
                onTouchStart={ this._handleTouchStart }
                onTouchEnd={ this._handleTouchEnd }
                //onMouseDown={ this._handleTouchStart }
                //onMouseUp={ this._handleTouchEnd }
                onContextMenu={ this._handleOnContextMenu }
            >
                <div className="content-wrapper">{ this.props.children }</div>
            </button>
        )
    }
}

BruiButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    onDown: PropTypes.func,
    onUp: PropTypes.func,
}

export default BruiButton;
