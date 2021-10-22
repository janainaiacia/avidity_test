import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState();

  if (!token || token.error) {
    return <Login setToken={setToken} />;
  }

  return (
    <React.Fragment>
      <h1>Avidity Test</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Dashboard
              access_token={token.access_token}
              token_type={token.token_type}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
