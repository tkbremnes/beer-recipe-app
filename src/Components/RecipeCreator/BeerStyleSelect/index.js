import React, { Component } from "react";

import BeerStyle from '../../../Store/BeerStyles';

import Select from "Components/BruiSelect";

import "./style.css";

class BeerStyleSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _handleOnChange = (beerStyle) => {
        this.props.onChange(beerStyle)
        this.setState({
            selectedOption: beerStyle,
        });
    }

    render() {
        const bjcp = BeerStyle.get("bjcp");

        const styles = bjcp.getAll();
        return (
            <Select
                onChange={ this._handleOnChange }
                className="BeerStyleSelect"
                options={styles.sort((a, b) => {
                    if (a.name === b.name) {
                        return 0;
                    }
                    return a.name > b.name ? 1 : -1;
                })}
                title="Select beer style"
                name="name"
                selectedOption={this.state.selectedOption}
            />
        )
    }
}

export default BeerStyleSelect;
