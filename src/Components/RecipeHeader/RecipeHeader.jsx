import React, { Component } from 'react';

import beerStyleUtils from '../../bjcp/style.js';

import "./style.css";

class Stat extends Component {
    render() {
        return (
            <div className="stat">
                <div className="desc">{this.props.desc}</div>
                <div className="value">{this.props.value}</div>
            </div>
        )
    }
}

class StatsWrapper extends Component {
    render() {
        return (
            <div className="statsWrapper">
                <Stat desc="ABV" value={`${this.props.abv}%`} />
                <Stat desc="IBU" value={`${this.props.ibu}`} />
                <Stat desc="EBC" value={`${this.props.ebc}`} />
            </div>
        );
    }
}

class RecipeHeader extends Component {
    render() {
        function formatAbv(abv) {
            if (!abv) {
                return 0;
            }
            return (abv * 100).toPrecision(2);
        }

        function formatIbu(ibu) {
            if (!ibu) {
                return 0;
            }
            return Math.round(ibu);
        }
        function formatEbc(ebc) {
            if (!ebc) {
                return 0;
            }
            return Math.round(ebc);
        }

        const {
            abv,
            ibu,
            name,
            ebc
        } = this.props;
        const beerStyle = this.props.style;

        const formattedAbv = formatAbv(abv);
        const formattedIbu = formatIbu(ibu);
        const formattedEbc = formatEbc(ebc);

        return (
            <div className="RecipeHeader">
                <div className="wrapperRapper">
                <div>
                  <div className="nameWrapper">
                    <h1 className="h1">
                        { name }
                    </h1>

                    <p className="style">{ beerStyle && beerStyleUtils.getStyle(beerStyle).name }</p>

                  </div>
                </div>

                <StatsWrapper
                    ibu={formattedIbu}
                    ebc={formattedEbc}
                    abv={formattedAbv}
                />

                </div>
            </div>
        )
    }
}

RecipeHeader.propTypes = {

}

export default RecipeHeader;
