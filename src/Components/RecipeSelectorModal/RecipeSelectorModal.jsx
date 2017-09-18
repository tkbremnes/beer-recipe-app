import React from 'react';
import _ from 'underscore';

import RecipeItem from '../RecipeItem/RecipeItem.jsx';

const Style = {
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, .54)',
        zIndex: 99
    },
    listReset: {
        display: 'block',
        margin: 0,
        padding: 0
    },
    inputReset: {
        display: 'none'
    }

}

class RecipeSelectorModal extends React.Component {
    componentWillMount() {
        this.setState({ selectedRecipeId: null })
    }

    setRecipeId(recipeId) {
        this.setState({ selectedRecipeId: recipeId });
    }

    setRecipe(recipe) {
        this.setState({ selectedRecipe: recipe });
    }

    selectRecipe(recipeId) {
        this.props.onSelectRecipe(recipeId);
    }

    render() {
        function renderRecipes(recipesArray) {
            if(!recipesArray || recipesArray.length === 0) {
                return;
            }
            return recipesArray.map((recipe) => {
                const style = _.clone(Style.listReset);
                if (this.state.selectedRecipe && recipe.id === this.state.selectedRecipe.id) {
                    style.backgroundColor = 'rgba(0, 0, 0, .12)';
                }
                return <li
                    style={ style }
                    // key={ recipe.id } onClick={ this.setRecipeId.bind(this, recipe.id) }>
                    key={ recipe.id } onClick={ this.setRecipe.bind(this, recipe) }>
                        <RecipeItem
                            recipe={ recipe }
                        />
                </li>
            });
        }

        if (!this.props.recipes) {
            return (
                <div style={ Style.container }>
                    <brui-panel>
                        <brui-loader></brui-loader>
                    </brui-panel>
                </div>
            )
        }

        return (
            <div style={ Style.container }>
                <brui-panel>
                    <p>Select recipe</p>

                    <div>
                        <ul style={ Style.listReset }>
                            { renderRecipes.call(this, this.props.recipes) }
                        </ul>
                    </div>

                    <brui-button onClick={ this.props.onCancel } secondary>Cancel</brui-button>
                    <brui-button onClick={ this.selectRecipe.bind(this, this.state.selectedRecipe) }>Use this recipe</brui-button>
                </brui-panel>
            </div>
        )
    }
}

RecipeSelectorModal.propTypes = {

}

export default RecipeSelectorModal;
