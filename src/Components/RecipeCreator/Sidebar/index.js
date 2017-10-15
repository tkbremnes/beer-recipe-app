import React, { Component } from "react";

import recipeUtils from "Utils/recipeValidator";

import Card from "../../BruiCard";
import Button from "../../BruiButton";

import "./style.css";

function formatAbv(abv) {
    return (abv * 100).toPrecision(2);
}

class Sidebar extends Component {
    render() {
        const {
            name,
            beerStyle,
            alcohol,
            color,
            bitterness,
            recipeValidity,
            recipe,
        } = this.props;

        const targetAbv = (beerStyle && beerStyle.stats.abv ) || {low: 0, high: 0};
        const hitAbvTarget = alcohol > targetAbv.low && alcohol < targetAbv.high;

        const targetColor = (beerStyle && beerStyle.stats.srm) ||  { low: 0, high: 0 };
        const hitColorTarget = color > targetColor.low && color < targetColor.high;

        const targetBitterness = (beerStyle && beerStyle.stats.ibu) || { low: 0, high: 0 };;
        const hitBitternessTarget = bitterness > targetBitterness.low && bitterness < targetBitterness.high;

        function formatColor(color) {
            if (!color) {
                return 0;
            }
            return color.toPrecision(2)
        }

        return (
            <aside className="RecipeCreatorSidebar">
                <div>
                    <p>{name}</p>
                    <p>{beerStyle && beerStyle.name}</p>
                </div>

                <Card header="Alcohol">
                    <p>{ formatAbv(alcohol) }%</p>
                    <p>Target: { formatAbv(targetAbv.low) }% - { formatAbv(targetAbv.high) }%</p>

                    { hitAbvTarget ? <p>Nailed it!</p> : <p>Nope</p> }
                </Card>

                <Card header="Color">
                    <p>{ formatColor(color) } SRM</p>
                    <p>Target: {targetColor.low} - {targetColor.high}</p>
                    {hitColorTarget ? <p>Nailed it!</p> : <p>Nope</p>}
                </Card>

                <Card header="Bitterness">
                    <p>{ bitterness } IBU</p>
                    <p>Target: {targetBitterness.low} - {targetBitterness.high}</p>
                    {hitBitternessTarget ? <p>Nailed it!</p> : <p>Nope</p>}
                </Card>

                <Card header="Brewery settings">
                    <p>Brewhouse efficiency: 76%</p>
                    <p>Extract efficiency: 65%</p>
                    <p>Hop utilization: 25%</p>
                    <p>Boil off rate: 4L/hour</p>

                    <div className="float-right">
                        <Button onClick={()=>{}}>Change</Button>
                    </div>
                </Card>

                <Card>
                    <table>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                {recipeValidity.name ? <td><span role="img" aria-label="fulfilled">✅</span></td> : <td><span role="img" aria-label="unfulfilled">❌</span></td>}
                            </tr>
                            <tr>
                                <td>Style</td>
                                {recipeValidity.style ? <td><span role="img" aria-label="fulfilled">✅</span></td> : <td><span role="img" aria-label="unfulfilled">❌</span></td>}
                            </tr>
                            <tr>
                                <td>Batch volume</td>
                                {recipeValidity.batch_volume ? <td><span role="img" aria-label="fulfilled">✅</span></td> : <td><span role="img" aria-label="unfulfilled">❌</span></td>}
                            </tr>

                            <tr>
                                <td>Fermentables</td>
                                {recipeValidity.fermentables ? <td><span role="img" aria-label="fulfilled">✅</span></td> : <td><span role="img" aria-label="unfulfilled">❌</span></td>}
                            </tr>

                            <tr>
                                <td>Hops</td>
                                {recipeValidity.hops ? <td><span role="img" aria-label="fulfilled">✅</span></td> : <td><span role="img" aria-label="unfulfilled">❌</span></td>}
                            </tr>

                            <tr>
                                <td>Yeasts</td>
                                {recipeValidity.yeasts ? <td><span role="img" aria-label="fulfilled">✅</span></td> : <td><span role="img" aria-label="unfulfilled">❌</span></td>}
                            </tr>

                        </tbody>
                    </table>
                </Card>

                <Card>
                    <Button
                        onClick={() => {console.log(recipe)}}
                    >Print internal</Button>
                    <Button
                        onClick={() => {console.log(recipeUtils.normalize(recipe))}}
                    >Print stored</Button>
                </Card>
            </aside>
        )
    }
}

export default Sidebar;
