import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import "firebase/firestore";
import ComandCard from "../component/ComandCard.js";
import Button from "../component/Button.js";
// import { StyleSheet, css } from "aphrodite";

function Waiter() {
    const [comands, setComands] = useState([]);
    const [status, setStatus] = useState("Pronto para entrega")
    useEffect(() => {
      firebase
        .firestore()
        .collection("comands")
        .orderBy('time', 'asc')
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
        <section>
          {comands.map(item => {
            return (
              <>
                <ComandCard key={item.id} name={item.name} price={item.itens} status={status}/>
                <Button
                  title={"Entregue"}
                  handleClick={()=>setStatus("Entregue")}
                />
              </>
            );
          })}
        </section>
      </>
    );
}
export default Waiter