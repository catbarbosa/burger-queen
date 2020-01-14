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
  const getTotalTime = id => {
    const totalTime = new Date().toLocaleDateString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    firebase
      .firestore()
      .collection("comands")
      .doc(id)
      .update({
        totalTime: totalTime,
        status: "delivered"
      });
  };
  return (
    <>
      <h1> Comandas - Garçom</h1>
      <section className={css(style.comandArea)}>
        {comands
          .filter(item => item.status === "finished")
          .map((item, index) => {
            return (
              <ComandCard
                key={index}
                name={"Cliente: " + item.name}
                status={item.status}
                table={"Mesa: " + item.table}
                itens={item.itens}
                priceTotal={"Total: R$" + item.priceTotal + ",00"}
                handleClick={() => getTotalTime(item.id)}
              />
            );
          })}
      </section>
      <h2>Histórico de Pedidos</h2>
      <section className={css(style.comandArea)}>
        {comands.map((item, index) => {
          return (
            <ComandCard
              key={index}
              name={"Cliente: " + item.name}
              status={ item.status}
              table={"Mesa: " + item.table}
              itens={item.itens}
              priceTotal={"Total: R$" + item.priceTotal + ",00"}
            />
          );
        })}
      </section>
    </>
  );
}
export default Waiter;
