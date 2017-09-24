import React from 'react';
import PropTypes from "prop-types";

import "./style.css";

function Stat({ desc, value }) {
    return (
        <div className="stat">
            <div className="desc">{desc}</div>
            <div className="value">{value}</div>
        </div>
    )
}
Stat.propTypes = {
    desc: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
}

function Stats({
    abv,
    ibu,
    color,
}) {
    return (
        <div className="statsWrapper">
            <Stat desc="ABV" value={`${abv}%`} />
            <Stat desc="IBU" value={`${ibu}`} />
            <Stat desc="SRM" value={`${color}`} />
        </div>
    );
}
Stats.propTypes = {
    abv: PropTypes.string.isRequired,
    ibu: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
}

export default Stats;
