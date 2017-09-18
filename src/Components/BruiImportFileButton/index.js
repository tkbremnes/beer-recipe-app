import React, { Component } from "react";

import "./style.css";

import BruiButton from '../BruiButton';

class BruiImportFileButton extends Component {
    _handleFileSubmitted(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = ((theFile) => {
        return (e) => {
            const recipe = JSON.parse(e.target.result);

            this.props.onFileSubmitted(recipe);
        };
        })(file);

        reader.readAsText(file);
    }

    render() {
        return (
            <div className="BruiImportFileButton">
                <BruiButton>
                    Select recipe file
                    <input
                        type="file"
                        onChange={ this._handleFileSubmitted.bind(this) }
                        className="fileinput"
                    />
                </BruiButton>
            </div>
        );
    }
}

export default BruiImportFileButton;
