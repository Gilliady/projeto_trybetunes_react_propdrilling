import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

export class Login extends Component {
  render() {
    const { loginName, handleInputChange, history } = this.props;
    const minNameLegnth = 3;

    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            value={ loginName }
            name="loginName"
            onChange={ handleInputChange }
          />
          <button
            type="button"
            disabled={ loginName.length < minNameLegnth }
            data-testid="login-submit-button"
            onClick={ async () => {
              history.push('/loading');
              await createUser({ name: loginName });
              history.push('/search');
            } }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginName: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  history: PropTypes.shape(Object).isRequired,
};
