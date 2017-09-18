import React, { Component } from "react";

import "./style.css";

import BruiWizardNav from "./Nav";

class BruiWizard extends Component {
    componentWillMount() {
        this.setState({
            currentStep: 1,
            numberOfSteps: this.props.children.length
        });
    }

    _handleNextStep() {
        this.setState({
            currentStep: this.state.currentStep + 1
        });
    }

    _handlePreviousStep() {
        this.setState({
            currentStep: this.state.currentStep - 1
        });
    }

    render() {
        return <div className="BruiWizard">
            <div className="scrollwrapper">

                <div
                    className="stepwrapper"
                    style={{
                        transform: `translateX(-${ (this.state.currentStep-1) * 100 }%)`
                    }}
                >
                    { this.props.children }
                </div>

                <BruiWizardNav
                    numberOfSteps={ this.state.numberOfSteps }
                    currentStep={ this.state.currentStep }
                    onNext={ this._handleNextStep.bind(this) }
                    onPrevious={ this._handlePreviousStep.bind(this) }
                />
            </div>
        </div>
    }
}

export default BruiWizard;
