import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

export class MusicCard extends Component {
  handleCheckBoxChange = async ({ target: { checked } }) => {
    const { loadingUpdate } = this.props;
    loadingUpdate(true);
    if (checked) {
      await addSong({ ...this.props });
    } else await removeSong({ ...this.props });
    loadingUpdate(false);
  };

  render() {
    const { trackName, artworkUrl100, previewUrl, trackId, checked } = this.props;
    return (
      <div>
        <p>{trackName}</p>
        <img src={ artworkUrl100 } alt={ trackName } />
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label
          data-testid={ `checkbox-music-${trackId}` }
          htmlFor={ `favorite${trackId}` }
        >
          Favorita
          <input
            id={ `favorite${trackId}` }
            type="checkbox"
            checked={ checked }
            onChange={ this.handleCheckBoxChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  artworkUrl100: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  loadingUpdate: PropTypes.func.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
};
