import React from 'react';

class SpecificGravityInput extends React.Component {
    componentDidMount() {
        const $element = this._element;
        this._element.addEventListener('change', (event) => {
            const newVal = event.target.value;
            const oldVal = undefined; // TODO

            this.props.onChange(newVal, oldVal, event);
        });
    }

    render() {
        return (
            <brui-labeled-date-input
                label={ this.props.label }
                value={ this.props.value }
                ref={(element) => this._element = element}
            ></brui-labeled-date-input>
        )
    }
}

export default SpecificGravityInput;
