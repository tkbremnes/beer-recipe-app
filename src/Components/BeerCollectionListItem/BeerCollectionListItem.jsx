import React from 'react';
import moment from 'moment';

const Style = {
    timestamp: {
        fontStyle: 'italic',
        color: 'rgba(0, 0, 0, .54)',
    },

    container: {
        display: 'flex',
        alignItems: 'center',
    },

    name: {
        fontSize: '16px',
        margin: '0',
    },
    style: {
        fontSize: '11px',
        margin: '0',
        color: 'rgba(0, 0, 0, .56)',
        fontStyle: 'italic',
    },

    nameWrapper: {
        flexGrow: '1',
    },

    url: {
        marginLeft: '8px',
    },

}

class BeerCollectionListItem extends React.Component {
    getRelativeTime(timestamp) {
        // return moment(moment.now()).diff(moment(parseInt(timestamp)), 'days');

        return moment(moment.now()).diff(moment(timestamp), 'days') + ' days';
        // return moment(parseInt(timestamp)).fromNow();
    }

    render() {
        if(!this.props) {
            return <brui-loader></brui-loader>
        }

        return (
          <article style={Style.container}>
              <div style={Style.nameWrapper}>
                  <p style={Style.name}>{ this.props.name }</p>
                  <p style={Style.style}>{ this.props.beerStyle }</p>
              </div>
              <p style={Style.timestamp}>{ this.getRelativeTime(this.props.timestamp) }</p>
              <brui-button onClick={ this.props.onGoToBeer.bind(this, this.props.id) } style={Style.url}>🍺</brui-button>
          </article>
        )
    }
}

BeerCollectionListItem.propTypes = {
}

export default BeerCollectionListItem;
