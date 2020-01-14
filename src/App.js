import React from "react";
import { StyleSheet, css } from "aphrodite";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./component/Nav.js";
import ComandPerson from "./pages/Saloon";
import Kitchen from "./pages/Kitchen";
import Waiter from "./pages/Waiter";

const style = StyleSheet.create({
  main: {
    display: "flex",
    height: "100%"
  },
  content: {
    flex: 1,
    overflow: "auto"
  }
});

function App() {
  return (
    <Router>
      <div className={css(style.main)}>
        <Nav />
        <div className={css(style.content)}>
          <Switch>
            <Route exact path="/saloon" component={ComandPerson} />
            <Route path="/kitchen" component={Kitchen} />
            <Route path="/waiter" component={Waiter} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
