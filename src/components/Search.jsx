import React, { Component } from 'react';
import { Header } from './Header';

export class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        Search
      </div>
    );
  }
}
