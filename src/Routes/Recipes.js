import React from "react";

import RecipeCollection from '../Components/RecipeCollection';
import RecipeImporter from '../Components/RecipeImporter';
import RecipeCreator from '../Components/RecipeCreator';

import {
    Route,
    Switch
} from 'react-router-dom';

function RecipeRoutes() {
    return (
        <Switch>

            <Route exact path="/recipes" component={ RecipeCollection } />
            <Route exact path="/recipes/import" component={ RecipeImporter } />
            <Route exact path="/recipes/new" component={ RecipeCreator } />

            <Route exact path="/recipes/:recipeId" component={ RecipeCollection } />

            <Route exact path="/recipes/:recipeId/edit" component={ RecipeCreator } />
        </Switch>
    );
}

export default RecipeRoutes;
