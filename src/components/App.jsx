import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./Main";

const FourohFour = () => <h1>404 YO</h1>;

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route component={FourohFour} />
      </Switch>
    </div>
  );
};

export default App;
