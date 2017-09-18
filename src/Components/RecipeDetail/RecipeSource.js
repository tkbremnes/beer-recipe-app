import React from "react";
import PropTypes from "prop-types";

function RecipeSource({source}) {
    return (
        <p
            style={{
                marginTop: '2em',
                textAlign: 'right',
                opacity: '.54',
                fontStyle: 'italic',
            }}
        ><span style={{
            textTransform: 'uppercase',
            fontWeight: 600,
            color: 'rgba(0, 0, 0, .54)',
        }}>Source</span> <span
            style={{
                textDecoration: 'underline',
                whiteSpace: 'nowrap',
                maxWidth: '320px',
                overflow: 'hidden',
                display: 'block',
                textOverflow: 'ellipsis',
                marginLeft: 'auto',
            }}
        >{source}</span>
        </p>
    );
}

RecipeSource.propTypes = {
    source: PropTypes.string.isRequired,
}

export default RecipeSource;
