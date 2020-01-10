import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import "firebase/firestore";
import ComandCard from "../component/ComandCard.js";
// import { StyleSheet, css } from "aphrodite";

function Waiter() {
  const [comands, setComands] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("comands")
      .orderBy("startTime", "asc")
      .onSnapshot(querySnapshot => {
        const clientComands = querySnapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id };
        });
        setComands(clientComands);
      });
  }, []);
  // const totalTime = new Date(endTime - startTime)
  return (
    <>
      <h1> Comandas </h1>
      <section>
        
        {comands.filter((item)=> item.status === "finished").map((item, index) => {
          return (
            <ComandCard
              key={index}
              name={item.name}
              itens={item.itens}
              status={item.status}
              title={"Entregue"}
              handleClick={_ => _}
            />
          );
        })}
      </section>
    </>
  );
}
export default Waiter;
