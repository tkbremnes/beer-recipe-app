import React, {Component} from "react";
// import PropTypes from "prop-types";

import Page from "Components/Page";
import Card from "Components/BruiCard";

import "./styles.css";

class Ingredients extends Component {
    static propTypes = {

    }

    render() {
        return (
            <Page>
                <Card>
                    Ingredients
                </Card>
            </Page>
        );
    }
}

export default Ingredients;
