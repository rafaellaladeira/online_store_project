import React from 'react';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Details from './pages/Details';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/Cart" component={ Cart } />
        <Route path="/Details/:id" component={ Details } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
