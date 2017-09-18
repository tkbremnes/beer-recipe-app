import React from 'react';

import FermentablesComposite from '../FermentablesComposite/index.jsx';
import HopsComposite from '../HopsComposite/index.jsx';
import YeastsComposite from '../YeastsComposite/index.jsx';
import BatchSize from '../BatchSize/index.jsx';

import Header from '../Header/index.jsx';
import RecipeHeader from '../RecipeHeader/RecipeHeader.jsx';
import Loader from '../Loader/index.jsx';
import Link from '../Link/index.jsx';
import Temperature from '../Temperature/index.jsx';

const Styles ={
    outerContainer: {
    },
    innerContainer: {
        maxWidth: "640px",
        margin: "auto",
        padding: "0 10px"
    }
}

class Recipe extends React.Component {
    constructor(props) {
      super(props);
    //   this.onFermentableAdded = this.onFermentableAdded.bind(this);
    }

    onFermentableAdded(fermentable) {
        // this.props.dispatch({type: 'add_fermentable', fermentable});
    }

    render() {
        if(!this.props.recipe) {
            return (<Loader />);
        }

        console.log(this.props.recipe);

        function collectionToArray(collection) {
            return Object.keys(collection).map((key) => {
                return collection[key]
            })[0];
        }
        // const recipe = collectionToArray(this.props.recipe.entities.recipe);

        // const fermentables = this.props.recipe.entities.fermentables;
        // const hops = this.props.recipe.entities.hops;
        // const yeasts = this.props.recipe.entities.yeasts;

        const recipe = this.props.recipe;
        const fermentables = recipe.fermentables;
        const hops = recipe.hops;
        const yeasts = recipe.yeasts;

        return (
            <div style={ Styles.outerContainer } >
                <RecipeHeader
                    name={ recipe.name }
                    abv={ recipe.abv }
                    ibu={ recipe.ibu }
                    og={ recipe.og }
                />

            <div style={ Styles.innerContainer }>
                {/*<Header
                    level={ 2 }
                    text="Ingredients"
                    uppercase={ true }
                    impact={ true }
                />*/}

                <FermentablesComposite
                    onFermentableAdded={ this.onFermentableAdded }
                    fermentables={ fermentables }
                />

                <HopsComposite
                    hops={ hops }
                />

                <YeastsComposite
                    yeasts={ yeasts }
                />

                <div style={ { display: 'none' } }>

                    <BatchSize
                        value={ 20 }
                    />

                    {/*<p>Source: <Link href={ recipe.source } text={ "BYO" } /></p>*/}
                    <p>Mash temp: <Temperature value={ 67 } /></p>
                    <p>Fermentation temp: <Temperature value={ 19 } /></p>
                    <p>Total boil time: 90 min</p>
                    <p>Style: { recipe.style }</p>
                    <p>Carb level: {recipe.carbonation.from} - {recipe.carbonation.to}</p>
                </div>
            </div>
            </div>
        )
    }
}
Recipe.propTypes = {
    // recipe: React.PropTypes.object.isRequired
}

export default Recipe;
