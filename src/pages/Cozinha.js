import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import "firebase/firestore";
import ComandCard from "../component/ComandCard.js";
// import Button from "../component/Button";
// import MenuCard from "../component/MenuCard";
// import Input from "../component/Input";
// import { StyleSheet, css } from "aphrodite";

function Kitchen() {
  const [comands, setComands] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("comands")
      .onSnapshot(querySnapshot => {
        const clientComands = querySnapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id };
        });
        setComands(clientComands);
      });
  }, []);
  return (
    <>
      <h1> Pedidos </h1>
      <section>
        {comands.map(item => {
          return <ComandCard key={item.id} product={item.product} price={item.price} />;
        })}
      </section>
    </>
  );
}
export default Kitchen;
