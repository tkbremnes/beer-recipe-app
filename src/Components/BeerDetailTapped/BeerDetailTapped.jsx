import React from 'react';
import moment from 'moment';

import StarRating from '../StarRating/StarRating.jsx'
import NoteReview from '../NoteReview/NoteReview.jsx'
import RecipeHeader from '../RecipeHeader/RecipeHeader.jsx';

import abvCalculator from '../../Utils/abv_calculator.js';

import { setBeerStatus } from '../../Utils/Actions';

class BeerDetailTapped extends React.Component {
    componentWillMount() {
        this.setState({cheers: 0});
    }

    cheer() {
        this.setState({cheers: (this.state.cheers + 1)})
    }

    render() {
        if (!this.props.beer) {
            return <brui-loader></brui-loader>
        }

        // TODO: get this from where it is actually stored
        const notes = [
            {
                type: 'rating',
                value: 0.8,
                timestamp: '1469625555750'
            },
            {
                type: 'review',
                value: 'I hated it',
                timestamp: '1449424555750'
            },
            {
                type: 'review',
                value: 'I liked it',
                timestamp: '1429424555750'
            },
            {
                type: 'I am title',
                value: 'I am not special',
                timestamp: '1469625555750'
            },
            {
                type: 'review',
                value: 'I am indifferent',
                timestamp: '1469625555750'
            }
        ]

        const specialNotes = ['rating', 'review'];
        const notesObj = {};
        notes.forEach((_note) => {
            if (specialNotes.indexOf(_note.type) === -1) {
                // this should be handled somehow
                return;
            }

            if(!notesObj[_note.type]) {
                notesObj[_note.type] = [];
            }

            notesObj[_note.type].push(_note);
        });

        const recipe = this.props.beer.recipe;

        const brewedTimestamp = moment(this.props.beer.brewed).format('DD MMMM YYYY');
        const tappedTimestamp = moment(this.props.beer.tapped).format('DD MMMM YYYY');

        const rating = notesObj.rating[0].value || 0;

        const abv = abvCalculator.getAbv(this.props.beer.og, this.props.beer.fg);

        return (<div>
                <RecipeHeader
                    name={ recipe.name }
                    abv={ abv }
                    ibu={ recipe.ibu }
                    og={ recipe.og }
                    ebc={ recipe.ebc }
                    style={ recipe.style }
                />

                <brui-card-container>
                <div style={{ display: 'flex' }}>
                <brui-card style={{ marginRight: '8px', flexGrow: 1 }}>
                    <p>Brewed: { brewedTimestamp }</p>
                    <p>Tapped: { tappedTimestamp }</p>

                    <brui-button>See stats</brui-button>
                    <a href={ `/#/recipes/${recipe.id}` }><brui-button>See recipe</brui-button></a>
                </brui-card>

                <brui-card>
                    <brui-button onClick={ this.cheer.bind(this) }>
                        🍻
                     <span style={{ marginLeft: '8px' }}>{ this.state.cheers }</span></brui-button>
                </brui-card>
                </div>

                <brui-card>
                    <brui-card-header>Rate beer</brui-card-header>
                    <brui-button>1</brui-button>
                    <brui-button>2</brui-button>
                    <brui-button>3</brui-button>
                    <brui-button>4</brui-button>
                    <brui-button>5</brui-button>
                    {/* <StarRating rating={ rating } /> */}
                </brui-card>

                {/* <brui-card>
                    <brui-card-header>Tasting notes</brui-card-header>
                    <brui-card>
                        <p>A smooth tasting pale ale – full in body and a great long lasting head. Another great beer to stock – favorite with guests. Make's a great black and tan when combined with light bodied Irish stout.</p>

                        <p style={{ fontSize: '11px', fontStyle: 'italic', color: 'rgba(0, 0, 0, .54)', textAlign: 'right', marginTop: '8px' }}>14. December 2015</p>
                    </brui-card>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <brui-button>Add tasting notes</brui-button>
                    </div>
                </brui-card> */}

                {/* <brui-card>
                    <brui-card-header>Reviews</brui-card-header>
                    <div>
                        { notesObj.review.sort((a, b) => {
                            return parseInt(a.timestamp) > parseInt(b.timestamp)
                        }).map((_review) => {
                            return <NoteReview note={ _review } />
                        })}
                    </div>
                    <brui-button>Add review</brui-button>
                </brui-card> */}

                {/* <brui-card>
                    <brui-button>Add note</brui-button>
                </brui-card> */}

                {/* <brui-card>
                    <brui-button
                        onClick={ setBeerStatus.bind(this, this.props.beer.id, 'finished') }
                    >Empty</brui-button>
                </brui-card> */}
            </brui-card-container></div>
        )
    }
}

BeerDetailTapped.propTypes = {

}

export default BeerDetailTapped;
