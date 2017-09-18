import React from 'react';

class BreweryInventory extends React.Component {
    render() {
        return (
            <div className="card-container">
                <brui-card>
                    <brui-card-header>Malts</brui-card-header>
                    <p>You have no malts stored.</p>
                </brui-card>

                <brui-card>
                    <brui-card-header>Hops</brui-card-header>
                    <p>You have no hops stored.</p>
                </brui-card>

                <brui-card>
                    <brui-card-header>Yeasts</brui-card-header>
                    <p>You have no yeasts stored.</p>
                </brui-card>

                {/*<brui-floating-add-button></brui-floating-add-button>*/}
            </div>
        )
    }
}

BreweryInventory.propTypes = {

}

export default BreweryInventory;
