import React, { Component } from 'react';
import PropTypes from "prop-types";

import Card from "../../BruiCard";
import Button from "../../BruiButton";

class YeastRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
        }
    }
    handleNameChange = (event) => {
        this.props.yeast.name = event.target.value;
        this.props.onChange(this.props.yeast);
    }
    render() {
        const { name } = this.state;

        return <tr className="input-row">
            <td className="input-cell">
                <div className="input-wrapper">
                    <input
                        placeholder="WLP 001"
                        type="text"
                        value={name}
                        onChange={this.handleNameChange}
                    />
                </div>
            </td>
        </tr>;
    }
}
YeastRow.propTypes = {
    yeast: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
}

class Yeasts extends Component {
    constructor(props) {
        super(props);

        const yeasts = props.yeasts.slice(0);
        if (yeasts.length === 0) {
            yeasts.push({});
        }

        this.state = {yeasts: yeasts};
    }

    handleYeastChange = (yeast) => {
        const yeasts = this.state.yeasts;

        const position = yeasts.findIndex((_yeast) => {
            return _yeast.id === yeast.id;
        });

        yeasts[position] = yeast;
        this.setState({yeasts});
        this.props.onChange(yeasts);
    }

    addYeast = () => {
        const yeasts = this.state.yeasts.slice(0);
        yeasts.push({});

        this.setState({yeasts});
    }

    render() {
        const yeasts = this.state.yeasts;

        return (
            <Card
                header="Yeasts"
            >

                <table className="InputTable">
                    <thead className="input-row">
                        <tr>
                            <td className="name">Name</td>
                        </tr>
                    </thead>
                    <tbody>

                        { yeasts.map((_yeast) => {
                            return (
                                <YeastRow
                                    yeast={_yeast}
                                    onChange={this.handleYeastChange}
                                    key={_yeast.id}
                                />
                            )
                        }) }
                    </tbody>
                </table>

                <div className="add-button">
                    <Button onClick={this.addYeast}>
                        Add yeast
                    </Button>
                </div>
            </Card>
        )
    }
}

Yeasts.propTypes = {
    yeasts: PropTypes.array.isRequired,
}

export default Yeasts;
