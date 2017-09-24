import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    fetchRecipes,
} from "../../Redux/Recipes/Actions";

import Sidebar from '../Sidebar';
import AppHeader from '../AppHeader';
import ApplicationNavigation from '../ApplicationNavigation';

import {
    showAppSidebar,
    hideAppSidebar,
    setAppHeaderText
} from "../../Actions.js";

class Root extends Component {
    componentWillMount() {
        this.props.dispatch(fetchRecipes());
        this.props.dispatch(setAppHeaderText("brau.beer"));
    }

    _handleHamburgerClick() {
        this.props.dispatch(showAppSidebar());
    }

    _closeSidebar = () => {
        this.props.dispatch(hideAppSidebar());
    }

    render() {
        return (
            <div>
                <AppHeader
                    onHamburgerClick={ this._handleHamburgerClick.bind(this) }
                    text={ this.props.clientState.appHeaderText }
                />

                <Sidebar
                    visible={ this.props.clientState.isSidebarOpen }
                    onClose={ this._closeSidebar }
                >
                    <ApplicationNavigation
                        onLinkClicked={this._closeSidebar}
                    />
                </Sidebar>
            </div>
        )
    }
}

function select(state) {
    return {
        userData: state.userData,
        clientState: state.clientState
    }
}

export default connect(select)(Root);
