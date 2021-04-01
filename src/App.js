import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  DxcHeader,
  DxcFooter,
  DxcApplicationLayout,
} from "@dxc-technology/halstack-react";

import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Test from "./pages/test/Test";
import Results from "./pages/results/Results";
import Finish from "./pages/finish/Finish";
import logo from "./images/logo.png";
import Start from "./pages/start/Start";

function App() {
  return (
    <DxcApplicationLayout>
      <DxcApplicationLayout.Header>
        <DxcHeader logoSrc={logo} underlined />
      </DxcApplicationLayout.Header>
      <DxcApplicationLayout.Main>
        <Router>
          <Switch>
            <Route path="/start">
              <Start />
            </Route>
            <Route path="/finish">
              <Finish />
            </Route>
            <Route path="/results">
              <Results />
            </Route>
            <Route path="/test">
              <Test />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </Router>
      </DxcApplicationLayout.Main>
      <DxcApplicationLayout.Footer>
        <DxcFooter
          logoSrc={logo}
          copyright="© Marcial F Parrilla 2021. Máster en ingeniería web."
        />
      </DxcApplicationLayout.Footer>
    </DxcApplicationLayout>
  );
}

export default App;
