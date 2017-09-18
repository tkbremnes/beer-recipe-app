import React, { Component } from 'react';

import "./style.css";

class AppHeader extends Component {
    render() {
        // TODO: fix this mess
        function onHamburgerClick() {
            this.props.onHamburgerClick && this.props.onHamburgerClick();
        }
        return (
            <header
                className="AppHeader"
            >
                <button onClick={ onHamburgerClick.bind(this) } className="hamburger">
                    <svg fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                    </svg>
                </button>

                <p className="text">{ this.props.text }</p>

            </header>
        )
    }
}

export default AppHeader;
