import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function SidebarDivider() {
    return <div className="SidebarDivider" />;
}

function ApplicationNavigation({onLinkClicked}) {
    return (
        <main className="main">
            <Link className="link" to="/inventory" onClick={onLinkClicked}>
                Inventory
            </Link>

            <SidebarDivider />

            <Link className="link" to="/recipes" onClick={onLinkClicked}>
                Recipes
            </Link>

            <Link className="link" to="/recipes/new" onClick={onLinkClicked}>
                Recipe Creator
            </Link>

            <SidebarDivider />

            <Link className="link" to="/calculators" onClick={onLinkClicked}>
                Calculators
            </Link>
            <Link className="link" title="About" to="/about" onClick={onLinkClicked}>
                About
            </Link>
            <Link className="link" title="User Settings" to="/user" onClick={onLinkClicked}>
                User Settings
            </Link>
        </main>
    )
}
ApplicationNavigation.propTypes = {
    onLinkClicked: PropTypes.func.isRequired,
}

export default ApplicationNavigation;
