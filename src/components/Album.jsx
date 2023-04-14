import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from './Header';
import getMusics from '../services/musicsAPI';
import { Loading } from './Loading';
import { MusicCard } from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export class Album extends Component {
  state = {
    loading: true,
    musicList: [],
    favoriteSongs: [],
  };

  componentDidMount() {
    this.fetchMusics();
  }

  componentDidUpdate() {
    this.fetchMusics();
  }

  loadingUpdate = (value) => {
    this.setState({ loading: value });
  };

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musicList = await getMusics(id);
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ musicList, loading: false, favoriteSongs });
  };

  render() {
    const { state: { loading, musicList, favoriteSongs } } = this;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : (
          <div className="music-list">
            {musicList.map((music, index) => (
              index === 0
                ? (
                  <div key={ index }>
                    <h3 data-testid="artist-name">{music.artistName}</h3>
                    <p data-testid="album-name">{music.collectionName}</p>
                  </div>
                )
                : (
                  <MusicCard
                    checked={
                      favoriteSongs.some(({ trackId }) => trackId === music.trackId)
                    }
                    key={ music.trackId }
                    { ...music }
                    loadingUpdate={ this.loadingUpdate }
                  />)
            ))}
          </div>)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
