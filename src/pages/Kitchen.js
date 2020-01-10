import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import "firebase/firestore";
import ComandCard from "../component/ComandCard.js";
import { StyleSheet, css } from "aphrodite";

const style = StyleSheet.create({
  comandArea: {
    display: "flex",
    flexWrap: "wrap"
  }
});
function Kitchen() {
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
  const getEndtime = (id) => {
    const date = new Date().getTime();

    firebase
      .firestore()
      .collection("comands")
      .doc(id)
      .update({
        endTime: date,
        status: "finished"
      });
  };
  return (
    <>
      <h1> Comandas </h1>
      <section className={css(style.comandArea)}>
        {comands.map((item, index) => (
          <ComandCard
            key={index}
            name={item.name}
            itens={item.itens}
            status={item.status}
            title={"Concluido"}
            handleClick={() => getEndtime(item.id)}
          />
        ))}
      </section>
    </>
  );
}
export default Kitchen;
