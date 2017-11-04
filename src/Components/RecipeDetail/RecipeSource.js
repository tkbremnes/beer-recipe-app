import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

function RecipeSource({source}) {
    return (
        <div className="RecipeSource">
            <header className="header">Source</header>
            <p className="source">{source}</p>
        </div>
    );
}

RecipeSource.propTypes = {
    source: PropTypes.string.isRequired,
}

export default RecipeSource;
