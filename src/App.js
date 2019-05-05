import React, { Component } from 'react';
import GridConnected from './components/Grid';
import SearchBarConnected from './components/SearchBar';

class App extends Component {
    render() {
        return (
            <div className="container">
                <h2 className="title">Movies</h2>
                <div className="search-section">
                    <SearchBarConnected />
                </div>
                <GridConnected />
            </div>
        );
    }
}

export default App;
