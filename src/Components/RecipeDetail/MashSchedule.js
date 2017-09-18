import React from "react";
import PropTypes from "prop-types";

import Card from "../BruiCard";

function MashSchedule({schedule}) {
    return (
        <Card header="Mashing">
            {schedule.map((_step) => {
                return <p key={_step.temperature + '' + _step.time}>{_step.temperature}°C for {_step.time} minutes.</p>
            })}
        </Card>
    )
}

MashSchedule.propTypes = {
    schedule: PropTypes.array.isRequired,
}

export default MashSchedule;
