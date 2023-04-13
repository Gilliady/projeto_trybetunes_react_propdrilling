import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header } from './Header';

export class Search extends Component {
  render() {
    const { searchValue, handleInputChange } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        <form>

          <input
            name="searchValue"
            type="text"
            value={ searchValue }
            onChange={ handleInputChange }
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ searchValue.length < 2 }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  searchValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};
