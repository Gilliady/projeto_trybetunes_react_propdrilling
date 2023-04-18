import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Header } from './Header';
import { Loading } from './Loading';
import { getUser, updateUser } from '../services/userAPI';

export class ProfileEdit extends Component {
  state = {
    loading: true,
    user: {},
    name: '',
    image: '',
    email: '',
    description: '',
    disabledButton: true,
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const user = await getUser();
    this.setState({ user,
      loading: false,
      name: user.name,
      image: user.image,
      email: user.email,
      description: user.description,
      disabledButton: !(user.name.length > 0
        && user.image.length > 0
        && user.email.length > 0
        && user.description.length > 0),
    });
  };

  saveProfile = async () => {
    const { history } = this.props;
    this.setState({ loading: true });
    history.push('/profile');
    const { state: {
      name,
      image,
      email,
      description,
    },
    } = this;
    await updateUser({ name, image, email, description });
    this.setState({ loading: false });
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.setState(({ name: userName,
        image,
        email,
        description }) => ({
        disabledButton: !(userName.length > 0
              && image.length > 0
              && email.length > 0
              && description.length > 0),
      }));
    });
  };

  render() {
    const { state: {
      user,
      loading,
      image,
      name,
      email,
      description,
      disabledButton,
    },
    } = this;
    return (
      <section className="main-section">
        <div
          data-testid="page-profile-edit"
        >
          <Header />
          {
            loading
              ? <Loading />
              : (
                <div className="alternatives-container">
                  <form>
                    <label htmlFor="image">
                      Insira uma url para a a nova imagem
                      {' '}
                      <input
                        data-testid="edit-input-image"
                        id="image"
                        type="text"
                        value={ image }
                        placeholder={ user.image }
                        onChange={ this.handleInputChange }
                        name="image"
                      />
                    </label>
                    <label htmlFor="name">
                      Nome:
                      {' '}
                      <input
                        data-testid="edit-input-name"
                        id="name"
                        type="text"
                        name="name"
                        value={ name }
                        placeholder={ user.name }
                        onChange={ this.handleInputChange }
                      />
                    </label>
                    <label htmlFor="email">
                      Email:
                      {' '}
                      <input
                        data-testid="edit-input-email"
                        id="email"
                        type="text"
                        name="email"
                        value={ email }
                        placeholder={ user.email }
                        onChange={ this.handleInputChange }
                      />
                    </label>
                    <label htmlFor="description">
                      Descrição:
                      {' '}
                      <textarea
                        data-testid="edit-input-description"
                        id="description"
                        name="description"
                        value={ description }
                        placeholder={ user.description }
                        onChange={ this.handleInputChange }
                      />
                    </label>
                    <button
                      data-testid="edit-button-save"
                      onClick={ this.saveProfile }
                      disabled={ disabledButton }
                    >
                      Salvar
                    </button>
                  </form>
                </div>
              )
          }
        </div>
      </section>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
