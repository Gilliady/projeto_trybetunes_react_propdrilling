import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Login } from './components/Login';
import { Search } from './components/Search';
import { Favorites } from './components/Favorites';
import { Album } from './components/Album';
import { Profile } from './components/Profile';
import { ProfileEdit } from './components/ProfileEdit';
import { NotFound } from './components/NotFound';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route exact path="/album/:id" render={ (props) => <Album { ...props } /> } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/search" component={ Search } />
        <Route exact path="/" component={ Login } />
        <Route component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
