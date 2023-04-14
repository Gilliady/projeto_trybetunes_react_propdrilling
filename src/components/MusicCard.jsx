import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import { Loading } from './Loading';

export class MusicCard extends Component {
  state = {
    loading: false,
    checked: false,
  };

  handleCheckBoxChange = async ({ target: { checked } }) => {
    this.setState({ loading: true, checked });
    if (checked) {
      await addSong({ ...this.props });
    } else await removeSong({ ...this.props });
    this.setState({ loading: false });
  };

  render() {
    const { trackName, artworkUrl100, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
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
        {loading
          ? <Loading />
          : (
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
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  artworkUrl100: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
