import React, { Component } from "react";

import RecipeCollection from '../Components/RecipeCollection';
import RecipeImporter from '../Components/RecipeImporter';
import RecipeCreator from '../Components/RecipeCreator';

import {
  Route,
  Switch
} from 'react-router-dom';

class RecipeRoutes extends Component {
    render() {
        return (
            <Switch>

                <Route exact path="/recipes" component={ RecipeCollection } />
                <Route exact path="/recipes/import" component={ RecipeImporter } />
                <Route exact path="/recipes/new" component={ RecipeCreator } />

                <Route exact path="/recipes/:recipeId" component={ RecipeCollection } />

                <Route exact path="/recipes/:recipeId/edit" component={ RecipeCreator } />
                {/*
                <Route exact path="recipes/new/edit" component={ NoMatch } />
                */}
            </Switch>
        );
    }
}

export default RecipeRoutes;
