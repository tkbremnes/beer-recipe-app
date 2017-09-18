import React from 'react';

class Temperature extends React.Component {
    render() {
        return (
            <span>{ this.props.value }° C</span>
        )
    }
}

Temperature.propTypes = {
    value: React.PropTypes.number.isRequired
}

export default Temperature;
