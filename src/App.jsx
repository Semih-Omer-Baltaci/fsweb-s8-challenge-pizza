import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import OrderPizza from './pages/OrderPizza';
import Success from './pages/Success';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/order" component={OrderPizza} />
        <Route path="/success" component={Success} />
      </Switch>
    </Router>
  );
}

export default App;
