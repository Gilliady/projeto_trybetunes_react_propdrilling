import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header } from './Header';
import { Loading } from './Loading';

export class Search extends Component {
  state = {
    carregando: false,
  };

  searchAlbum = async () => {
    /* const { searchValue, handleInputChange } = this.props;
    // const albums = await searchAlbumsAPI(searchValue);
    handleInputChange({ name: 'searchValue', value: '' }); */
  };

  render() {
    const { searchValue, handleInputChange } = this.props;
    const { carregando } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {carregando ? <Loading /> : (
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
              onClick={ this.searchAlbum }
            >
              Pesquisar
            </button>
          </form>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  searchValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};
