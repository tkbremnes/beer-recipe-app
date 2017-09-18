import React, { Component } from "react";

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
            styleGuidelines,
            recipeValidity
        } = this.props;

        const targetAbv = styleGuidelines.abv;
        const hitAbvTarget = alcohol.abv > targetAbv[0] && alcohol.abv < targetAbv[1];

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
                    <p>{beerStyle}</p>
                </div>

                <Card header="Alcohol">
                    <p>ABV: { formatAbv(alcohol.abv) }%</p>
                    <p>Target: { formatAbv(targetAbv[0]) }% - { formatAbv(targetAbv[1]) }%</p>

                    { hitAbvTarget ? <p>Nailed it!</p> : <p>Nope</p> }
                </Card>

                <Card header="Color">
                    <p>{ formatColor(color.ebc) } EBC [{styleGuidelines.ebc[0]} - {styleGuidelines.ebc[1]}]</p>
                    <p>{ formatColor(color.srm) } SRM [{styleGuidelines.srm[0]} - {styleGuidelines.srm[1]}]</p>

                </Card>

                <Card header="Bitterness">
                    <p>{ bitterness.ibu } IBU</p>
                    <p>Target: {styleGuidelines.ibu[0]} - {styleGuidelines.ibu[1]}</p>
                </Card>

                <Card header="Brewery settings">
                    <p>Brewhouse efficiency: 76%</p>
                    <p>Extract efficiency: 65%</p>
                    <p>Hop utilization: 25%</p>
                    <p>Boil off rate: 4L/hour</p>

                    <div className="float-right">
                        <Button>Change</Button>
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
            </aside>
        )
    }
}

export default Sidebar;
