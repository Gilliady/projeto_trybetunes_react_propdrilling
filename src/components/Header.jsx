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
        <h3 data-testid="header-user-name">{user.name}</h3>
        <nav>
          <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>
      </>);
    this.setState({ content });
  };

  render() {
    const { content } = this.state;
    return (
      <header className="header" data-testid="header-component">{ content }</header>
    );
  }
}
