import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StatusContainer from './StatusContainer';

const mapStateToProps = state => {
    return { movies: state.movies };
};

export class Grid extends Component {

    render() {
        const { movies } = this.props;
        return (
            <div className="result-section">
                <StatusContainer />
                <div className="grid">
                    {movies.map(movie => (
                        <div className="tile" key={movie.imdbID}>
                            <article className="tile__body">
                                <img alt={
                                        movie.Poster === 'N/A' ?
                                        'Missing poster' :
                                        movie.Title
                                    }
                                    src={
                                        movie.Poster === 'N/A' ?
                                        process.env.REACT_APP_MISSING_POSTER_PLACEHOLDER_IMG :
                                        movie.Poster
                                    }
                                />
                            </article>
                            <header className="tile__header">
                                {movie.Title}
                            </header>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

Grid.propTypes = {
    movies: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Grid);
