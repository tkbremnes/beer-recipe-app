import React from 'react';

import "./style.css";
import PropTypes from "prop-types";

import AdvancedGravityInput from "../../AdvancedGravityInput";
import Card from '../../BruiCard';

class GravityInput extends React.Component {
    componentWillMount() {
        this.setState({
            gravity: {
                final: this.props.fg || 1.000,
                original: this.props.og || 1.000,
                preboil: this.props.bg || 1.010,
            }
        });
    }

    _handleGravityChange(type, value) {
        const gravity = this.state.gravity;
        gravity[type] = parseFloat(value);
        this.setState({gravity});
        this.props.onChange(gravity);
    }

    render() {
        return (
            <div className="GravityInput">
                <Card
                    header="Gravity targets"
                >
                    <Card>
                        <AdvancedGravityInput
                            label="Preboil"
                            value={ this.state.gravity.preboil }
                            onChange={ this._handleGravityChange.bind(this, "preboil") }
                        />
                    </Card>

                    <Card>
                        <AdvancedGravityInput
                            label="Original gravity"
                            value={ this.state.gravity.original }
                            onChange={ this._handleGravityChange.bind(this, 'original') }
                        />
                    </Card>

                    <Card>
                        <AdvancedGravityInput
                            label="Final gravity"
                            value={ this.state.gravity.final }
                            onChange={ this._handleGravityChange.bind(this, 'final') }
                        />
                    </Card>
                </Card>
            </div>
        )
    }
}

GravityInput.propTypes = {
    og: PropTypes.number,
    fg: PropTypes.number,
    bg: PropTypes.number
}

export default GravityInput;
