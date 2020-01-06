import React from "react";
import { StyleSheet, css } from 'aphrodite';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Nav from "./component/Nav.js"
import ComandPerson from "./pages/Salao";
import Kitchen from "./pages/Cozinha";

const style = StyleSheet.create({
  body:{
    background:'black',
  },
})


function App() {
   return(
    <Router>
  <div>
    <Nav />
    <Switch>
      <Route exact path="/salao" component={ComandPerson}/>
      <Route path="/cozinha" component ={Kitchen}/>
    </Switch>
  </div>
</Router>
)
}

export default App;
