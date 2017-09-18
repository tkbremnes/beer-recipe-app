import React from 'react';

function getLogoPath(_filename, relativeLogoPath) {
    function processFilename(string) {
        return string.substring(0, string.lastIndexOf('/'));
    }

    return processFilename(_filename) + relativeLogoPath;
}

// TODO: This feels clumsy
// TODO: make and replace logo
const logoPath = getLogoPath(__filename, '/assets/logo.png');

const styles = {
    imageRendering: 'pixelated',

    backgroundColor: {
        backgroundColor: '#333333'
    }
}

class Logo extends React.Component {
    render() {
        return (
            <div style={ styles.backgroundColor }>
                <img
                    src={ logoPath }
                    height={ this.props.height }
                    width={ this.props.width }
                    style={ styles }
                />
            </div>
        )
    }
}

export default Logo;
