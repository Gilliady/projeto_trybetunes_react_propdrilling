import React, { Component } from 'react';
import { Header } from './Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import { Loading } from './Loading';
import { MusicCard } from './MusicCard';

export class Favorites extends Component {
  state = {
    loading: true,
    favoriteSongs: [],
  };

  componentDidMount() {
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

  render() {
    const { state: { favoriteSongs, loading } } = this;
    return (
      <section className="main-section">
        <div data-testid="page-favorites">
          <Header />
          <div className="alternatives-container">
            {loading
              ? <Loading />
              : favoriteSongs.map((song) => (
                <MusicCard
                  key={ song.trackId }
                  loadingUpdate={ this.loadingUpdate }
                  fetchFavorites={ this.fetchFavorites }
                  { ...song }
                  checked={
                    favoriteSongs.some((music) => music.trackId === song.trackId)
                  }
                />))}
          </div>
        </div>
      </section>
    );
  }
}

export default Favorites;
