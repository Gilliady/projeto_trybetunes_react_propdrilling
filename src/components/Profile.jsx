import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Header } from './Header';
import { Loading } from './Loading';
import { getUser } from '../services/userAPI';

export class Profile extends Component {
  state = {
    loading: true,
    user: {},
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const user = await getUser();
    this.setState({ user, loading: false });
  };

  render() {
    const { state: { loading, user } } = this;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <img data-testid="profile-image" src={ user.image } alt={ user.name } />
            <h3>{ user.name }</h3>
            <p>{ user.email }</p>
            <p>{ user.description }</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}
