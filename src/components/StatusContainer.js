import React, { Component } from 'react';
import store from '../store/index';

export class Status extends Component {

    renderInitial() {
        return <div className="state initial">Start typing to find your desired movies</div>;
    }

    renderLoading() {
        return <div className="state loading">Loading...</div>;
    }

    renderError() {
        return <div className="state error">No movies found! Please try again.</div>;
    }

    renderSuccess() {
        return <div className="state success">Results</div>;
    }

    render() {
        if (this.props.status === 'initial') {
            return this.renderInitial();
        } else if (this.props.status === 'loading') {
            return this.renderLoading();
        } else if (this.props.status === 'error') {
            return this.renderError();
        } else {
            return this.renderSuccess();
        }
    }
};

export class StatusContainer extends Component {

    constructor() {
        super();
        this.state = {
            status: 'initial'
        };
        store.subscribe(() => {
            this.setState({
                status: store.getState().status
            });
        });
    }

    render() {
        return <Status {...this.state} />;
    }
}

export default StatusContainer;
