import React from 'react';

class WeightInput extends React.Component {
    componentDidMount() {
        const $element = this._element;
        this._element.addEventListener('change', this.props.onChange);
    }

    render() {
        return (
            <brui-weight-input
                label={ this.props.label }
                value={ this.props.value }
                ref={(element) => this._element = element}
            ></brui-weight-input>
        )
    }
}

WeightInput.propTypes = {

}

export default WeightInput;
