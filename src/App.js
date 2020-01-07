import React from "react";
import { StyleSheet, css } from "aphrodite";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./component/Nav.js";
import ComandPerson from "./pages/Saloon";
import Kitchen from "./pages/Kitchen";
import Waiter from "./pages/Waiter"

const style = StyleSheet.create({
  link: {
    margin: "5px"
  }
});

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route
            className={css(style.link)}
            exact
            path="/saloon"
            component={ComandPerson}
          />
          <Route
            className={css(style.link)}
            exact
            path="/kitchen"
            component={Kitchen}
          />
          <Route
          className ={css(style.link)}
          path="/waiter"
          component={Waiter}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
