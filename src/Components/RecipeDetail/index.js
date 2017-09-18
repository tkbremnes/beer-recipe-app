import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';

import FermentablesComposite from '../FermentablesComposite/index.jsx';
import HopsComposite from '../Hops';
import YeastsComposite from '../YeastsComposite/index.jsx';
import RecipeHeader from '../RecipeHeader/RecipeHeader.jsx';

import BruiCard from "../BruiCard";
import BruiButton from "../BruiButton";

import GravityTargets from "./GravityTargets";
import FermentationSchedule from "./FermentationSchedule";
import BoilSchedule from "./BoilSchedule";
import MashSchedule from "./MashSchedule";

const BrewerySettings = {
    batchSize: 19,
};

class Recipe extends Component {
    render() {
        const recipe = this.props.recipe;

        const fermentables = recipe.fermentables;
        const hops = recipe.hops;
        const yeasts = recipe.yeasts;

        function renderLastBrewed(beerArray) {
            if (!beerArray || beerArray.length === 0) {
                return;
            }

            function renderBrewedBeers() {
                return beerArray.map((beer) => {
                    return <li key={ beer.timestamp }>
                        { moment.unix(beer.timestamp / 1000).format('YYYY-MM-DD') }
                    </li>
                });
            }

            return <BruiCard header="Last brewed">
                <ul>{ renderBrewedBeers() }</ul>
            </BruiCard>
        }

        const SourceLink = styled.a`
            color: #000;
            cursor: pointer;
        `;

        const RecipeGrid = styled.div`
            padding: 8px;
            ${''/* max-width: 500px; */}
            margin: auto;
            ${''/* display: grid; */}
            ${''/* grid-template-columns: 30% 30% auto; */}
            grid-gap: 0px 8px;
        `;

        function renderRecipeSource(string) {
            if (!string) {
                return;
            }

            if (string.indexOf('http') === 0) {
                return <SourceLink href={string} target="_blank">{string}</SourceLink>
            }
            return string;
        }

        return (
            <div>

            <RecipeGrid>
                <BruiCard>
                    <p className="readable-text">This recipe makes { BrewerySettings.batchSize } liters of beer.</p>

                    {/* <p className="readable-text quote">{ recipe.meta.comment && recipe.comment.body }</p> */}
                    {/* <p className="readable-text quote">{ recipe.description }</p> */}

                    { recipe.notes && recipe.notes[0] ?
                        <p className="readable-text quote"> {recipe.notes[0].body }</p>
                        :
                        <span></span>
                    }

                    <GravityTargets
                        preboilGravity={recipe.meta.preboil_gravity}
                        originalGravity={recipe.meta.original_gravity}
                        finalGravity={recipe.meta.final_gravity}
                    />

                    <p
                        style={{
                            marginTop: '2em',
                            textAlign: 'right',
                            opacity: '.54',
                            fontStyle: 'italic',
                        }}
                        ><span style={{
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            color: 'rgba(0, 0, 0, .54)',
                        }}>Source</span> <span
                            style={{
                                textDecoration: 'underline',
                                whiteSpace: 'nowrap',
                                maxWidth: '320px',
                                overflow: 'hidden',
                                display: 'block',
                                textOverflow: 'ellipsis',
                                marginLeft: 'auto',
                            }}
                            >{ renderRecipeSource(recipe.meta.source) }</span>
                    </p>
                </BruiCard>

                <FermentablesComposite
                    fermentables={ fermentables }
                />

                <HopsComposite
                    hops={ hops }
                    batchSize={ BrewerySettings.batchSize }
                />

                <YeastsComposite
                    yeasts={ yeasts }
                />

                <MashSchedule
                    schedule={recipe.mash_schedule}
                />

                <FermentationSchedule
                    schedule={recipe.fermentation_schedule}
                />

                <BoilSchedule
                    boilTime={recipe.meta.boil_time}
                />

                <div>
                { renderLastBrewed(this.props.recipe.beer) }

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                    <div>
                        <BruiButton
                            onClick={() => {}}
                        >Edit</BruiButton>
                    </div>

                    <div>
                        <BruiButton onClick={ this.props.onDelete }>Delete</BruiButton>
                    </div>
                </div>
                </div>

            </RecipeGrid>
        </div>
        )
    }
}

export default Recipe;
