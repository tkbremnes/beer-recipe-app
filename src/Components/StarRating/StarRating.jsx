import React from 'react';
import _ from 'underscore';

class StarRating extends React.Component {
    render() {
        if (!this.props.rating) {
            return <brui-loader></brui-loader>
        }

        const maxScore = 5;
        const score = this.props.rating * maxScore;

        function renderStars(_score, _max) {
            let res = [];

            const emptyStar = <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
            const fullStar = <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>

            for(let i=0; i<_score; i++) {
                res.push(fullStar);
            }

            for(let i=0; i<_max - _score; i++) {
                res.push(emptyStar);
            }

            return res;
        }

        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div>{ renderStars(score, maxScore) }</div>
            </div>
        )
    }
}

StarRating.propTypes = {

}

export default StarRating;
