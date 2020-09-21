import React from 'react';
import Home from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PokemonDetail from './pages/pokemon-detail';
import MyPokemons from './pages/my-pokemons';

function App() {
  return (
    <div className="container-fluid pokemon">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/pokemon-detail/:name" children={<PokemonDetail />} />
          <Route path="/my-pokemons" children={<MyPokemons />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
