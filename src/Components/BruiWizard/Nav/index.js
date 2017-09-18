import React, { Component } from "react";

class BruiWizardNav extends Component {
    _handlePreviousButtonClick() {
        this.props.onPrevious && this.props.onPrevious();
    }

    _handleNextButtonClick() {
        this.props.onNext && this.props.onNext();
    }

    render() {
        function renderSteps(_numberOfSteps, _currentStep) {
            const res = [];
            for (let i=0; i<_numberOfSteps; i++) {
                const className = (_currentStep === i+1) ? "active step" : "step";
                const element = <div className={ className } key={ `wizard-nav-step-${ i }` }/>;
                res.push(element);
            }
            return res;
        }

        return <nav className="nav">
            <button
                className="navbutton"
                onClick={ this._handlePreviousButtonClick.bind(this) }
                disabled={ this.props.currentStep <= 1 }
            >&lt; Back</button>

            <div className="steps">
                { renderSteps(this.props.numberOfSteps, this.props.currentStep) }
            </div>

            <button
                className="navbutton"
                onClick={ this._handleNextButtonClick.bind(this) }
                disabled={ this.props.currentStep >= this.props.numberOfSteps }
            >Next &gt;</button>
        </nav>
    }
}

export default BruiWizardNav;
