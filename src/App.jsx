import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import OrderPizza from './pages/OrderPizza';
import Success from './pages/Success';

function App() {
  const [orderSummary, setOrderSummary] = useState(null);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route 
          path="/order" 
          render={() => <OrderPizza setOrderSummary={setOrderSummary} />} 
        />
        <Route 
          path="/success" 
          render={() => <Success orderSummary={orderSummary} />} 
        />
      </Switch>
    </Router>
  );
}

export default App;
