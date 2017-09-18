import React from 'react';
import moment from 'moment';

const Style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: '8px 0'
    },
    timestamp: {
        fontStyle: 'italic',
        color: 'rgba(0, 0, 0, .54)',
        fontSize: '11px',
        order: 2
    },
    comment: {
        order: 1,
    }
}

class NoteReview extends React.Component {
    render() {
        function formatTimestamp(timestamp) {
            return moment(parseInt(timestamp)).format('DD. MMMM YYYY')
        }

        if (!this.props.note) {
            return <brui-loader></brui-loader>
        }

        const comment = this.props.note.value;
        const timestamp = formatTimestamp(this.props.note.timestamp);

        return (
            <div style={ Style.container }>
                <p style={ Style.timestamp }>{ timestamp }</p>
                <p style={ Style.comment }>{ comment }</p>
            </div>
        )
    }
}

NoteReview.propTypes = {

}

export default NoteReview;
