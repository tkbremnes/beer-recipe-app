import React, { Component } from "react";

class GravityTarget extends Component {
    render() {
        return (
            <div className="test-outer">
                <p className="test-inner upper">{this.props.label}</p>
                <p className="test-inner lower">{this.props.value.toPrecision(4)}</p>
            </div>
        )
    }
}
class GravityTargets extends Component {
    render() {
        return (
            <div className="recipe-detail-gravity">
                {
                    this.props.preboilGravity ?
                        <GravityTarget
                            label="Preboil Gravity"
                            value={this.props.preboilGravity}
                        /> : <span></span>
                }

                {
                    this.props.originalGravity ?
                        <GravityTarget
                            label="Original Gravity"
                            value={this.props.originalGravity}
                        /> : <span></span>
                }

                {
                    this.props.finalGravity ?
                        <GravityTarget
                            label="Final Gravity"
                            value={this.props.finalGravity}
                        /> : <span></span>
                }
            </div>
        )
    }
}

export default GravityTargets;
