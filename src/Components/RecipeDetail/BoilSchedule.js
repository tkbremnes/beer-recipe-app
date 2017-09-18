import React from "react";
import PropTypes from "prop-types";

import Card from "../BruiCard";

function BoilSchedule({boilTime}) {
    return (
        <Card header="Boil schedule">
            <p>Total boil time is {boilTime} minutes</p>
        </Card>
    );
}

BoilSchedule.propTypes = {
    boilTime: PropTypes.number.isRequired,
}

export default BoilSchedule;
