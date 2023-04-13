import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export class AlbumCard extends Component {
  render() {
    const { album } = this.props;
    return (
      <Link
        data-testid={ `link-to-album-${album
          .collectionId}` }
        to={ `/album/${album.collectionId}` }
      >
        <div>
          <h3>{album.collectionName}</h3>
          <img src={ album.artworkUrl100 } alt={ album.collectionName } />
        </div>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    artworkUrl100: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCount: PropTypes.number,
  }).isRequired,
};
