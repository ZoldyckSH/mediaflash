import React from 'react';
import Pokedex from './components/Pokedex';
import Pokemon from './components/Pokemon';
import { Route, Switch, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory()
const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={(props: any) => <Pokedex {...props} />} />
      <Route
        exact
        path="/:pokemonId"
        render={(props: any) => <Pokemon {...props} />}
      />
    </Switch>
  </Router>
);

export default App;
