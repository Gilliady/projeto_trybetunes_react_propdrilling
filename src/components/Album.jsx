import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from './Header';
import getMusics from '../services/musicsAPI';
import { Loading } from './Loading';
import { MusicCard } from './MusicCard';

export class Album extends Component {
  state = {
    loading: true,
    musicList: [],
  };

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musicList = await getMusics(id);
    this.setState({ musicList, loading: false });
  };

  render() {
    const { state: { loading, musicList } } = this;
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
                : <MusicCard key={ music.trackId } { ...music } />
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
