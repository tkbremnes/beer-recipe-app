import React, { Component } from 'react';

import PropTypes from "prop-types";

import "./styles.css";

class SidebarSlideIn extends Component {
    _start(e) {
        this._startPos = e.touches[0].clientX;

        this.movementHandler = (e) => {
            this.props.onMove(e.touches[0].clientX);
        }

        document.body.addEventListener("touchmove", this.movementHandler, false);

        this.props.onMoveStart(e.touches[0].clientX);
    }

    _stop() {
        document.body.removeEventListener("touchmove", this.movementHandler, false);
        this.movementHandler = null;
        this.props.onMoveEnd();
    }

    render() {
        return (
            <div
                className="navbar-slidein"
                onTouchStart={ this._start.bind(this) }
                onTouchEnd={ this._stop.bind(this) }
            ></div>
        )
    }
}

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMoving: false,
            position: 0,
            isVisible: this.props.isVisible,
        };
    }
    _resetNavbarPos(isVisible) {
        this.slider.style.transform = `translateX(${isVisible ? 0 : -this.sliderWidth}px)`;
        this.overlay.style.opacity = isVisible ? 1 : 0;
    }

    componentDidMount() {
        this.sliderWidth = this.slider.clientWidth + 4;
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.visible !== this.state.isVisible) {
            this._resetNavbarPos(nextProps.visible);

            this.setState({
                isVisible: nextProps.visible
            });
        }
    }

    _handleSlideInMoveStart = (position) => {
        this.navPos = position;
        this.setState({
            isMoving: true
        });
    }

    _handleSlideInMoveEnd = () => {
        const newState = {
            isMoving: false
        }
        if (this.navPos > (0.5 * this.sliderWidth)) {
            newState.isVisible = true;
        }
        else {
            newState.isVisible = false;
        }
        this._resetNavbarPos(newState.isVisible);
        this.setState(newState);
    }

    _handleSlideInMove = (xCoordinate) => {
        this.navPos = xCoordinate;

        if (xCoordinate > this.sliderWidth) {
            return;
        }

        const style = `translateX(${ xCoordinate - this.sliderWidth }px)`;
        this.slider.style.transform = style;

        const overlayOpacity = xCoordinate / this.sliderWidth;
        this.overlay.style.opacity = overlayOpacity;
    }

    render() {
        const isVisible = this.state.isMoving || this.state.isVisible || this.props.isVisible;
        return (
            <div className={`Sidebar ${isVisible ? "visible" : "invisible"} ${this.state.isMoving ? "isMoving" : ""}`}>
                <SidebarSlideIn
                    onMoveStart={this._handleSlideInMoveStart}
                    onMoveEnd={this._handleSlideInMoveEnd}
                    onMove={this._handleSlideInMove}
                />

                <div className="content">
                    <nav className="nav" ref={slider => {
                        this.slider = slider;
                    }}>

                    <header className="header" />

                    { this.props.children }
                </nav>

                <div className="overlay" ref={overlay => {
                    this.overlay = overlay;
                }} onClick={this.props.onClose} /></div>
            </div>
        );
    }
}

Sidebar.propTypes = {
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
}

export default Sidebar;
