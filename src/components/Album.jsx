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
    this.fetchFavorites();
  }

  loadingUpdate = (value) => {
    this.setState({ loading: value });
  };

  fetchFavorites = async () => {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs, loading: false });
  };

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musicList = await getMusics(id);
    this.setState({ musicList });
  };

  render() {
    const { state: { loading, musicList, favoriteSongs } } = this;
    const [collectionInfo, ...musics] = musicList;
    return (
      <section className="main-section">
        <div data-testid="page-album">
          <Header />
          <div className="alternatives-container">
            {loading ? <Loading />
              : (
                <div>
                  <h3 data-testid="artist-name">{collectionInfo.artistName}</h3>
                  <p data-testid="album-name">{collectionInfo.collectionName}</p>
                </div>)}

            {!loading && musics.map((music) => (
              <div key={ music.trackId }>
                <MusicCard
                  { ...music }
                  loadingUpdate={ this.loadingUpdate }
                  fetchFavorites={ this.fetchFavorites }
                  checked={
                    favoriteSongs.some(({ trackId }) => trackId === music.trackId)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>
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
