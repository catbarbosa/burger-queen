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
  const getEndtime = id => {
    const date = new Date().toTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

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
      <h1> Comandas - Cozinha</h1>
      <section className={css(style.comandArea)}>
        {comands
          .filter(item => item.status === "pending")
          .map((item, index) => (
            <ComandCard
              key={index}
              name={"Nome do Cliente: " + item.name}
              status={"Status: " + item.status}
              table={"Mesa: " + item.table}
              itens={item.itens}
              priceTotal={"Preço total: R$" + item.priceTotal + ",00"}
              handleClick={() => getEndtime(item.id)}
            />
          ))}
      </section>
      <h2>Histórico de Pedidos</h2>
      <section className={css(style.comandArea)}>
        {comands
          .map((item, index) => (
            <ComandCard
              key={index}
              name={"Nome do Cliente: " + item.name}
              status={"Status: " + item.status}
              table={"Mesa: " + item.table}
              itens={item.itens}
              priceTotal={"Preço total: R$" + item.priceTotal + ",00"}
            />
          ))}
      </section>
    </>
  );
}
export default Kitchen;
