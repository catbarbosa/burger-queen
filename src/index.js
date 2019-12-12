import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as firebase from "firebase";
import FirebaseConfig from "./firebase";

ReactDOM.render(<App />, document.getElementById("root"));

firebase.initializeApp(FirebaseConfig);
firebase.analytics();

const db = firebase.firestore();

const drinkColletion = db.collection('bebidas').get().then(data => useState(data.product));

