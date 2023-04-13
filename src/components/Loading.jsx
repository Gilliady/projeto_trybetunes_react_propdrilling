import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

export class Loading extends Component {
  componentDidMount() {
    const { history, loginName } = this.props;
    const time = 300;
    createUser({ name: loginName });
    setTimeout(() => {
      history.push('/search');
    }, time);
  }

  render() {
    return (
      <div>Carregando...</div>

    );
  }
}

Loading.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  loginName: PropTypes.string.isRequired,
};

export default Loading;
