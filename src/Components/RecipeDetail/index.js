import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';

import FermentablesComposite from '../FermentablesComposite/index.jsx';
import HopsComposite from '../HopsComposite/index.jsx';
import YeastsComposite from '../YeastsComposite/index.jsx';
import RecipeHeader from '../RecipeHeader/RecipeHeader.jsx';

import BruiCard from "../BruiCard";
import BruiButton from "../BruiButton";

class GravityTarget extends Component {
    render() {
        return (
            <div className="test-outer">
                <p className="test-inner upper">{this.props.label}</p>
                <p className="test-inner lower">{this.props.value.toPrecision(4)}</p>
            </div>
        )
    }
}
class GravityTargets extends Component {
    render() {
        return (
            <div className="recipe-detail-gravity">
                {
                    this.props.preboilGravity ?
                    <GravityTarget
                        label="Preboil Gravity"
                        value={ this.props.preboilGravity }
                    /> : <span></span>
                }

                {
                    this.props.originalGravity ?
                    <GravityTarget
                        label="Original Gravity"
                        value={ this.props.originalGravity }
                    /> : <span></span>
                }

                {
                    this.props.finalGravity ?
                    <GravityTarget
                        label="Final Gravity"
                        value={ this.props.finalGravity }
                    /> : <span></span>
                }
            </div>
        )
    }
}

class Recipe extends Component {
    renderBoilSchedele(boilTime) {
        if (!boilTime) {
            return;
        }

        return (
            <BruiCard header="Boil schedule">
                <p>Total boil time is { boilTime } minutes</p>
            </BruiCard>
        );
    }

    renderFermentationSchedule(fermentationSchedule) {
        if (!fermentationSchedule) {
            return;
        }

        function renderTemperatureRange(range) {
            if (!range || !range[1]) {
                if (typeof range !== 'object') {
                    // is this a good way of handling it? Or be stricter?
                    return `${ range }°C`;
                }

                return `${ range[0] }°C`;
            }
            return `${ range[0] }–${ range[1] }°C`;
        }

        function renderFermentationLength(length) {
            if (!length) {
                return;
            }

             return ` for ${ length } days`
        }

        return (
            <BruiCard header="Fermentation schedule">
                <p>
                    { renderTemperatureRange(fermentationSchedule[0].temperature) }
                    { renderFermentationLength(fermentationSchedule[0].time) }
                </p>
            </BruiCard>
        )
    }

    renderMashSchedule(mashSchedule) {
        if (!mashSchedule) {
            return;
        }

        return (
            <BruiCard header="Mashing">
                { mashSchedule.map((_step) => {
                    return <p key={ _step.temperature + '' + _step.time }>{ _step.temperature }°C for { _step.time } minutes.</p>
                }) }
            </BruiCard>
        )
    }

    editRecipe = () => {
        console.log("edit recipe");
    }

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

        const Hurk = styled.div`
            ${''/* grid-column-start: 1; */}
            ${''/* grid-column-end: 3; */}
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
                <Hurk>
                    <BruiCard>
                        <p className="readable-text">This recipe makes { recipe.meta.batch_volume } liters of beer.</p>

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
                </Hurk>

                <FermentablesComposite
                    fermentables={ fermentables }
                />

                <HopsComposite
                    hops={ hops }
                />

                <YeastsComposite
                    yeasts={ yeasts }
                />

                { this.renderMashSchedule.call(this, recipe.mash_schedule) }

                { this.renderFermentationSchedule.call(this, recipe.fermentation_schedule) }

                { this.renderBoilSchedele.call(this, recipe.meta.boil_time) }

                <div>
                { renderLastBrewed(this.props.recipe.beer) }

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                    <div>
                        <BruiButton
                            onClick={this.editRecipe}
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
