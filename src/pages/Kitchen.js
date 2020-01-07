import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import "firebase/firestore";
import ComandCard from "../component/ComandCard.js";
import Button from "../component/Button.js";
import { StyleSheet, css } from "aphrodite";

const style = StyleSheet.create({
  comandArea: {
    display: "flex",
    flexWrap: "wrap"
  }
});
function Kitchen() {
  const [comands, setComands] = useState([]);
  const [status, setStatus] = useState("");
  useEffect(() => {
    firebase
      .firestore()
      .collection("comands")
      .orderBy("time", "asc")
      .onSnapshot(querySnapshot => {
        const clientComands = querySnapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id };
        });
        setComands(clientComands);
      });
  }, []);
  return (
    <>
      <h1> Comandas </h1>
      <section className={css(style.comandArea)}>
        {comands.map((item, index) => {
          return (
            <>
              <ComandCard
                key={item.id + index}
                name={item.name}
                price={item.itens}
                status={status}
              />
              <Button
                title={"Concluido"}
                handleClick={() => setStatus("Pronto para entrega")}
              />
            </>
          );
        })}
      </section>
    </>
  );
}
export default Kitchen;
