import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Login } from './components/Login';
import { Search } from './components/Search';
import { Favorites } from './components/Favorites';
import { Album } from './components/Album';
import { Profile } from './components/Profile';
import { ProfileEdit } from './components/ProfileEdit';
import { NotFound } from './components/NotFound';
import Loading from './components/Loading';

class App extends React.Component {
  state = {
    loginName: '',
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/loading"
          render={ (props) => <Loading { ...props } { ...this.state } /> }
        />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route exact path="/album/:id" render={ (props) => <Album { ...props } /> } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/search" component={ Search } />
        <Route
          exact
          path="/"
          render={ (props) => (<Login
            { ...props }
            { ...this.state }
            handleInputChange={ this.handleInputChange }
          />) }
        />
        <Route component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
