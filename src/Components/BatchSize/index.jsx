import React from 'react';

let batchSizeValue = 0;
class BatchSize extends React.Component {
    constructor(props) {
        super(props);
        this.onBatchSizeChange = this.onBatchSizeChange.bind(this);
    }

    onKeyDown(event) {
        console.log('triggered');
        function isANumber(keyCode) {
            return (keyCode - 48) > 0 || (keyCode - 48) < 9;
        }
        if (!isANumber(event.which)) {
            event.preventDefault();
        }
    }

    onBatchSizeChange(event) {
        console.log(event);
        batchSizeValue = event.target.value;
    }

    componentWillMount() {

    }

    render() {
        return (
            <div>
                <span>Batch size: </span>
                <input
                    type="number"
                    value={ batchSizeValue }
                    onChange={ this.onBatchSizeChange }
                />
                <span>L</span>
            </div>
        )
    }
}

BatchSize.propTypes = {

}

export default BatchSize;
