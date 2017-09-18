import React from 'react';

class CalculateTotalWeight extends React.Component{
    render() {
        return (
            <p>Total weight: { this.props.totalWeight }</p>
        )
    }
}
CalculateTotalWeight.propTypes = {
    totalWeight: React.PropTypes.number.isRequired
}

export default CalculateTotalWeight;
