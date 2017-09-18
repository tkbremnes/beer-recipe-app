import React from 'react';
import moment from 'moment';

import { connect } from 'react-redux';
import {
    createNewBeer,
    saveBeer,
    createNewBeerNote,
    fetchBrewerySettings,
} from '../../Utils/Actions';

import RecipeSelectorModal from '../RecipeSelectorModal/RecipeSelectorModal.jsx';
import RecipeItem from '../RecipeItem/RecipeItem.jsx';
import DateInput from '../DateInput/DateInput.jsx';

class BeerCreator extends React.Component {
    componentWillMount() {
        this.props.dispatch(createNewBeer());
        this.props.dispatch(fetchBrewerySettings());

        this.setState({
            brewDate: moment(moment.now()).format('YYYY-MM-DD')
        })
    }

    goToBeer(id) {
        return this.props.history.push(`/beers/${ id }`);
    }

    onDateChanged(newVal) {
        this.setState({
            brewDate: newVal
        });
    }

    saveBeer(beerData) {
        function validate(_data) {
            if (!_data || !_data.status || !_data.brewed || !_data.recipe_id) {
                throw new Error('missing data');
            }
        }
        validate(beerData);

        this.props.dispatch(saveBeer(beerData));
    }

    saveNote(note) {
        // this.props.dispatch(createNewBeerNote(note));
    }

    setRecipeId(recipeId) {
        this.setState({
            isRecipeSelectorModalOpen: false,
            selectedRecipeId: recipeId
        });
    }

    setRecipe(recipe) {
        this.setState({
            isRecipeSelectorModalOpen: false,
            selectedRecipe: recipe
        });
    }

    openRecipeSelectorModal() {
        this.setState({
            isRecipeSelectorModalOpen: true
        });
    }

    closeRecipeSelectorModal() {
        this.setState({
            isRecipeSelectorModalOpen: false
        });
    }

    startBrewing() {
        const beerStatus = 'brewing'; // TODO: move into constants
        this.saveBeer.call(this, {
           recipe_id: this.state.selectedRecipe.id,
           brewed: moment(this.state.brewDate).valueOf(),
           status: beerStatus
        });

    //     this.saveBeer.bind(this, {
    //    });

    //    this.goToBeer(this.state.selectedRecipe.id);
    }


    render() {
        const selectedRecipeId = this.state && this.state.selectedRecipeId;
        const selectedRecipe = (this.state && this.state.selectedRecipe) || {
            id: null,
            batchVolume: null
        };

        function renderRecipeSelectorModal() {
            if (!(this.state && this.state.isRecipeSelectorModalOpen)) {
                return;
            }

            return <RecipeSelectorModal
                recipes={ this.props.recipeCollection.recipes }
                onSelectRecipe={ this.setRecipe.bind(this) }
                onCancel={ this.closeRecipeSelectorModal.bind(this) }
            />
        }

        function renderRecipeSelector() {
            return (
                <brui-card>
                    { renderRecipeSelectorModal.call(this) }

                    <brui-card-header>Recipe</brui-card-header>

                    { renderSelectedRecipe.call(this) }

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <brui-button
                            onClick={ this.openRecipeSelectorModal.bind(this) }
                        >Select existing recipe</brui-button>
                        <brui-button disabled>New recipe</brui-button>
                    </div>
                </brui-card>
            );
        }

        function renderSelectedRecipe() {
            if (!(this.state && this.state.selectedRecipe)) {
                return <brui-card><div style={{
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                    onClick={ this.openRecipeSelectorModal.bind(this) }
                >
                    <p style={{
                        fontSize: '1.5em',
                        fontWeight: 'bold',
                    }}>No recipe selected</p>
                </div></brui-card>;
            }

            return <brui-card>
                    <RecipeItem recipe={ this.state.selectedRecipe } />
                </brui-card>
        }

        const brewerySettings = this.props.brewerySettings.settings || {};

        return (
            <brui-card-container>

                { renderRecipeSelector.call(this) }

                <brui-card
                    style={{
                        opacity: 0.20,
                        pointerEvents: 'none',
                        display: 'block'
                    }}
                >
                    <brui-card-header>Brew setup</brui-card-header>

                    <brui-volume-input
                        label="Recipe volume"
                        value={ selectedRecipe.batchVolume }
                    ></brui-volume-input>

                    <brui-volume-input
                        label="Equipment volume"
                        value={ brewerySettings.batch_volume }
                    ></brui-volume-input>

                    <label>
                        Scale recipe?
                        <input type="checkbox" checked></input>
                    </label>
                </brui-card>

                <brui-card>
                    <DateInput
                        onChange={ this.onDateChanged.bind(this) }
                        value={ this.state.brewDate }
                        label="Brew date"
                    ></DateInput>

                    <brui-button>Today</brui-button>
                </brui-card>

                <div className="button-group">
                    <brui-button
                        onClick={ this.startBrewing.bind(this) }
                        disabled={ !(this.state && this.state.selectedRecipe) }
                        className="save-button"
                    >Go forth and brew!</brui-button>
                </div>
          </brui-card-container>
        )
    }
}

BeerCreator.propTypes = {

}

function select(state) {
    return {
        beerDraft: state.beerDraft,
        recipeCollection: state.recipeCollection,
        brewerySettings: state.brewerySettings
    }
}

export default connect(select)(BeerCreator);
