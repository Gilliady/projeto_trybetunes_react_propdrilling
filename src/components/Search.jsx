import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header } from './Header';
import { Loading } from './Loading';
import { AlbumCard } from './AlbumCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../style/search.css';

export class Search extends Component {
  state = {
    loading: false,
    search: false,
    albums: [],
    artist: '',
  };

  searchAlbum = async () => {
    const { searchValue, handleInputChange } = this.props;
    this.setState({ loading: true, artist: searchValue });
    const albums = await searchAlbumsAPI(searchValue);
    this.setState({ albums, loading: false, search: true });
    handleInputChange({ target: { name: 'searchValue', value: '' } });
  };

  render() {
    const { searchValue, handleInputChange } = this.props;
    const { loading, albums, search, artist } = this.state;
    const albumContent = (albums.length > 0
      ? (
        <>
          <p>{`Resultado de álbuns de: ${artist}`}</p>
          {albums.map((album) => (
            <AlbumCard
              key={ album.collectionId }
              album={ album }
            />
          ))}
        </>
      ) : search && <p>Nenhum Álbum foi encontrado</p>);
    return (
      <section className="main-section">
        <Header />
        <div data-testid="page-search" className="alternatives-container form-search">
          <form className="">
            <input
              className="form-input"
              name="searchValue"
              type="text"
              value={ searchValue }
              onChange={ handleInputChange }
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
            />
            <button
              className="btn btn-light"
              type="button"
              data-testid="search-artist-button"
              disabled={ searchValue.length < 2 }
              onClick={ this.searchAlbum }
            >
              Pesquisar
            </button>
          </form>
          { loading && <Loading /> }
          { (!loading && search) && (
            <div
              className=""
            >
              {albumContent}
            </div>)}
        </div>
      </section>
    );
  }
}

Search.propTypes = {
  searchValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};
