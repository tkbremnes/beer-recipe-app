import React, { Component } from "react";


class BruiWizardStep extends Component {
    render() {
        return (
            <div>
                { this.props.children }
            </div>
        )
    }
}

export default BruiWizardStep;
