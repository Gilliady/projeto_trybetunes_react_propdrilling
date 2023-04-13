import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export class Header extends Component {
  state = {
    content: <Loading />,
  };

  componentDidMount() {
    this.awaitGetUser();
  }

  awaitGetUser = async () => {
    const user = await getUser();
    const content = <h1 data-testid="header-user-name">{user.name}</h1>;
    this.setState({ content });
  };

  render() {
    const { content } = this.state;
    return (
      <header data-testid="header-component">{ content }</header>
    );
  }
}
