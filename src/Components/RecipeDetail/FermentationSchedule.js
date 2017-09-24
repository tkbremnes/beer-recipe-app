import React from "react";
import PropTypes from "prop-types";

import BruiCard from "../BruiCard";

function FermentationScheduleStep({step}) {
    function rangeToString(range) {
        if (range.length === 1) {
            return range[0];
        }

        return `${range[0]}-${range[1]}`;
    }

    return (
        <p>
            {rangeToString(step.temperature)}°C for { step.time } days
        </p>
    )
}

FermentationScheduleStep.propTypes = {
    step: PropTypes.object.isRequired,
}

function FermentationSchedule({schedule}) {
    return (
        <BruiCard header="Fermentation schedule">
            {
                schedule.map((step, i) => {
                    return <FermentationScheduleStep step={step} key={i} />
                })
            }
        </BruiCard>
    )
}

FermentationSchedule.propTypes = {
    schedule: PropTypes.array.isRequired,
}

export default FermentationSchedule;
