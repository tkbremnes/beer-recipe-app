import React from 'react';

let name = 'test';
let weight = 100;
let color = 5;

class CreateFermentable extends React.Component {
    constructor(props) {
        super(props);
        this.onNameChange = this.onNameChange.bind(this);
        this.onWeightChange = this.onWeightChange.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
    }

    onNameChange(event) {
        console.log(event.target.value);
        name = event.target.value
    }

    onWeightChange(event) {

    }

    onColorChange(event) {

    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={ name }
                    onChange={ this.onNameChange }
                />
                <input
                    type="text"
                    value={ weight }
                    onChange={ this.onWeightChange }
                />
                <input
                    type="text"
                    value={ color }
                    onChange={ this.onColorChange }
                />

                <button onClick={ this.props.onFermentableAdded.bind(null, {name, weight, color}) }>+</button>
            </div>
        )
    }
}

CreateFermentable.propTypes = {
    onFermentableAdded: React.PropTypes.func.isRequired
}

export default CreateFermentable;
