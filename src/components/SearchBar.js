import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchMovies } from '../actions/index';

function mapDispatchToProps(dispatch) {
    return {
        searchMovies: searchData => dispatch(searchMovies(searchData))
    };
}

export class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            movieTitle: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.searchTimeout = 0;
    }

    handleChange(event) {
        const movieTitle = event.target.value;
        this.setState({ [event.target.id]: movieTitle });

        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        this.searchTimeout = setTimeout(() => this.searchMovies(movieTitle), 300);
    }

    searchMovies(movieTitle) {
        if (movieTitle.length >= 3) {
            this.props.searchMovies({ movieTitle });
        }
    }

    render() {
        const { title } = this.state;
        return (
            <div className="search-bar">
                <input
                    type="text"
                    className="search-bar__input"
                    id="movieTitle"
                    placeholder="type movie title..."
                    value={title}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
};

SearchBar.propTypes = {
    searchMovies: PropTypes.func
};

export default connect(null, mapDispatchToProps)(SearchBar);
