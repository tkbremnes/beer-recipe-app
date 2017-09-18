import React, { Component } from "react";

import "./style.css";

import Page from "../Page";
import Card from "../BruiCard";

class About extends Component {
    render() {
        return (
            <Page>
                <Card header="About">
                    <p>brau.beer</p>
                    <p>A beer recipe tool created by <a href="https://twitter.com/kartoffelmos" target="_blank" rel="noopener noreferrer">@kartoffelmos</a></p>
                </Card>
            </Page>
        )
    }
}

export default About;
