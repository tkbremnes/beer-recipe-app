import React from 'react';

const Style = {
    container: {
        display: 'block'
    },
    name: {
        fontWeight: 'bold',
        fontSize: '18px',
        color: 'rgba(0, 0, 0, .87)'
    },
    metaWrapper: {
        display: 'flex'
    },
    type: {
        color: 'rgba(0, 0, 0, .54)',
        fontSize: '12px',
        marginTop: '4px',
        marginBottom: '8px',
        fontStyle: 'italic',
    },
    metaFirst: {
        color: 'rgba(0, 0, 0, .54)',
        fontSize: '14px',
        marginRight: '8px',
    },
    meta: {
        color: 'rgba(0, 0, 0, .54)',
        fontSize: '14px',
        marginRight: '8px',
        paddingLeft: '8px',
        borderLeft: '1px solid rgba(0, 0, 0, .12)',
    }
}

class RecipeListItem extends React.Component {
    render() {
        const recipe = this.props.recipe;
        const recipeUrl = `/recipes/${ recipe.id }`;

        // TODO: hide and show abv, ibu. Also do some light error handling
        let abv = '?';
        let ibu = '?';
        let ebc = '?';
        if (recipe.abv) {
            abv = (recipe.abv * 100).toPrecision(2);
        }

        if (recipe.ibu) {
            ibu = Math.round(recipe.ibu || 0);
        }

        if (recipe.ebc) {
            ebc = Math.round(recipe.ebc || 0);
        }

        return (
            <div style={ Style.container } tabIndex="0">
                <p style={ Style.name }>{ recipe.name }</p>
                <p style={ Style.type }>{ recipe.style }</p>
                <div style={ Style.metaWrapper }>
                    <p style={ Style.metaFirst }>ABV: { abv }%</p>
                    <p style={ Style.meta }>IBU: { ibu }</p>
                    <p style={ Style.meta }>EBC: { ebc }</p>
                </div>
            </div>
        )
    }
}

RecipeListItem.propTypes = {

}

export default RecipeListItem;
