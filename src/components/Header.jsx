import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import { Loading } from './Loading';
import '../style/header.css';

export class Header extends Component {
  state = {
    content: <Loading />,
  };

  componentDidMount() {
    this.awaitGetUser();
  }

  awaitGetUser = async () => {
    const user = await getUser();
    const content = (
      <>
        <img
          className="logo-image"
          src="https://encurtador.com.br/bjAQW"
          alt="logoTrybeTunes"
        />
        <nav>
          <Link data-testid="link-to-search" to="/search">
            <img src="https://curt.link/6ilM40" alt="pesquisar" />
          </Link>
          <Link data-testid="link-to-favorites" to="/favorites">
            <img src="https://curt.link/v544EQ" alt="Favoritos" />
          </Link>
          <Link data-testid="link-to-profile" to="/profile">
            <img src="https://curt.link/1lphw7" alt="Perfil" />
          </Link>
        </nav>
        <h3 data-testid="header-user-name">{user.name}</h3>
      </>);
    this.setState({ content });
  };

  render() {
    const { content } = this.state;
    return (

      <header className="col" data-testid="header-component">{ content }</header>
    );
  }
}
