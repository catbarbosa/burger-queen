import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import "firebase/firestore";
import ComandCard from "../component/ComandCard.js";
import { StyleSheet, css } from "aphrodite";

const style = StyleSheet.create({
  comandArea: {
    display: "flex",
    flexWrap: "wrap"
  },
  containerHistoric: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "5px",
    margin: "3px"
  }
});

const Kitchen = () => {
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
    <div>
      <h1> Comandas - Cozinha</h1>
      <section className={css(style.comandArea)}>
        {comands
          .filter(item => item.status === "pending")
          .map((item, index) => {
            return (
              <ComandCard
                key={index}
                name={"Cliente: " + item.name}
                status={item.status}
                table={"Mesa: " + item.table}
                itens={item.itens}
                handleClick={() => getEndtime(item.id)}
              />
            );
          })}
      </section>
      <div className={css(style.containerHistoric)}>
        <h2>Histórico de Pedidos</h2>
        <section className={css(style.comandArea)}>
          {comands
            .filter(item => item.status !== "pending")
            .map((item, index) => (
              <ComandCard
                key={index}
                name={"Cliente: " + item.name}
                status={item.status}
                table={"Mesa: " + item.table}
                itens={item.itens}
                priceTotal={"Total: R$" + item.priceTotal + ",00"}
              />
            ))}
        </section>
      </div>
    </div>
  );
};
export default Kitchen;
