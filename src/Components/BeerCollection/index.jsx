import React from 'react';

import { connect } from 'react-redux';

import moment from 'moment';

import {
    fetchBeerCollection,
    fetchUserData
} from '../../Utils/Actions';

import BeerCollectionListItem from '../BeerCollectionListItem/BeerCollectionListItem.jsx';

class BeerCollection extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchUserData()).then((res) => {
            return this.props.dispatch(fetchBeerCollection());
        });
    }

    goToRecipeCreator() {
        return this.props.history.push(`/recipes/new`);
    }

    goToBeerCreator() {
        return this.props.history.push(`/beers/new`);
    }

    goToBeer(id) {
        return this.props.history.push(`/beers/${ id }`);
    }

    render() {
        function renderBeerCollectionForStatus(_collection, _status) {
            function renderCollection () {
                return _collection.map((_beer) => {
                    if (!_beer.recipe) {
                        return;
                    }

                    return <BeerCollectionListItem
                        name={ _beer.recipe.name }
                        recipe={ _beer.recipe }
                        beerStyle={ _beer.recipe.style }
                        timestamp={ _beer.brewed }
                        id={ _beer.id }
                        key= { _beer.id }
                        onGoToBeer={ this.goToBeer.bind(this, _beer.id) }
                    ></BeerCollectionListItem>
                });
            }

            switch (_status) {
                case 'brewing': {
                    if (_collection.length === 0) {
                        return null;
                    }
                    return <brui-card>
                        <brui-card-header>Brewing now</brui-card-header>
                        { renderCollection.call(this) }
                    </brui-card>
                }
                case 'finished': {
                    if (_collection.length === 0) {
                        return null;
                    }
                    return <brui-card>
                        <brui-card-header>Previous brews</brui-card-header>
                        { renderCollection.call(this) }
                    </brui-card>
                }
                case 'fermenting': {
                    if (_collection.length === 0) {
                        return <brui-card>
                            <brui-card-header>Fermenting</brui-card-header>
                            <p>You don't have any fermenting beers.</p>
                        </brui-card>
                    }

                    return <brui-card>
                        <brui-card-header>Fermenting</brui-card-header>
                        { renderCollection.call(this) }
                    </brui-card>
                }
                case 'packaged': {
                    if (_collection.length === 0) {
                        return <brui-card>
                            <brui-card-header>On tap</brui-card-header>
                            <p>You don't have any beers on tap.</p>
                        </brui-card>
                    }
                    return <brui-card>
                        <brui-card-header>On tap</brui-card-header>
                        { renderCollection.call(this) }
                    </brui-card>
                }
            }
        }

        if (!this.props.beerCollection.beer) {
            return <brui-card-container>
                <brui-card>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        Loading beers. Please wait...
                        <brui-loader></brui-loader>
                    </div>
                </brui-card>
            </brui-card-container>
        }

        const beers = {
            fermenting: [],
            packaged: [],
            brewing: [],
            finished: [],
            packaging: [],
        }

        let lastBrewDate = 0;

        this.props.beerCollection.beer.forEach((beer) => {
            if (beer.brewed && beer.brewed > lastBrewDate) {
                lastBrewDate = beer.brewed;
            }

            if (beer.status) { // TODO: do a simple check here
                // const recipe = this.props.beerCollection.recipes.find((_r) => {
                //     return _r.id === beer.recipe;
                // });
                //
                // beer.recipe = recipe;

                beers[beer.status].push(beer);
            }
        });

        return <brui-card-container>
            {/* <brui-share-modal></brui-share-modal> */}

            <brui-card>
                <brui-card-header>Hello world</brui-card-header>
                <p style={{ marginBottom: '1.5em' }}>Hello and welcome to my brew tool pre-beta. This is a tool under heavy development at the moment.</p>
                <brui-button onClick={ this.goToRecipeCreator.bind(this) }>Add new recipe</brui-button>
                <brui-button onClick={ this.goToBeerCreator.bind(this) }>Go Brew!</brui-button>
            </brui-card>

            { renderBeerCollectionForStatus.call(this, beers.brewing, 'brewing') }
            { renderBeerCollectionForStatus.call(this, beers.packaged, 'packaged') }
            { renderBeerCollectionForStatus.call(this, beers.fermenting, 'fermenting') }
            { renderBeerCollectionForStatus.call(this, beers.finished, 'finished') }

            <brui-card>
                <p>{ moment(moment.now()).diff(moment(lastBrewDate), 'days') } days since last brewday.</p>
                <brui-button onClick={ this.goToBeerCreator.bind(this) }>Go Brew!</brui-button>
            </brui-card>

            <div style={{ opacity: '.3', pointerEvents: 'none' }}>
            <brui-card>
                <brui-card-header>Favorite recipes</brui-card-header>

                <div style={{
                    fontWeight: 'bold',
                    color: 'rgba(0, 0, 0, .34)',
                    borderBottom: '1px solid rgba(0, 0, 0, .12)',
                    padding: '16px 0 16px 222px',
                    marginBottom: '8px',
                }}>Last Brewed</div>

                <div>
                    <beer-list-item name="Gose" beer-style="Gose" timestamp="1467504000000" url="#"></beer-list-item>
                </div>
            </brui-card>
            </div>
        </brui-card-container>
    }
}

BeerCollection.propTypes = {

}

function select(state) {
    return {
        beerCollection: state.beerCollection,
        recipeCollection: state.recipeCollection
    }
}

export default connect(select)(BeerCollection);
