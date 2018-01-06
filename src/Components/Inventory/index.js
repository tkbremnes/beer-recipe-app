import React, {Component} from "react";
import { connect } from "react-redux";

import {
    fetchInventory,
} from "Redux/Inventory/Actions";

import Page from "Components/Page";
import Card from "Components/BruiCard";

class InventoryItem extends Component {
    render() {
        const {
            name,
            amount
        } = this.props;

        return (
            <tr>
                <td>{name}</td>
                <td>{amount}g</td>
            </tr>
        );
    }
}

class Inventory extends Component {
    componentWillMount() {
        this.props.dispatch(fetchInventory());
    }

    render() {
        const {
            inventory,
        } = this.props

        const {
            hops,
        } = inventory;

        return (
            <Page>
                <Card>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                hops.map((hop, i) => {
                                    return (
                                        <InventoryItem key={i} name={hop.hop.name} amount={hop.amount} />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </Card>
            </Page>
        )
    }
}

function select(state) {
    return {
        inventory: state.inventory,
    }
}

export default connect(select)(Inventory);
