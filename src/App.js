import React, { useState, useEffect } from "react";
import { StyleSheet, css } from 'aphrodite';
import "firebase/firestore";
import firebase from "./firebase";
import Button from "./component/Button"
import Input from "./component/Input"
const db = firebase.firestore();

const style = StyleSheet.create({
  body:{
    background:'black',
  },
  main:{
    display:'flex',
  },
  input:{
    height:'30px',
    width:'30px'
  },

  
})

const ComandPerson = () => {
  const [name, setName] = useState("");
  const [table, setTable] = useState("");
  const [itens, setItens] = useState("");

  function addComand(e) {
    const fieldValue = firebase.firestore.FieldValue;
    const comand = {
      name,
      table,
      itens,
      time: fieldValue.serverTimestamp()
    };
    db.collection("comands")
      .add(comand)
      .then(() => {
        setName("");
        setTable("");
        setItens("");
      });
  }
  return (
    <>
      <label>Comanda</label>
      <Input
        value={name}
        onChange={e => setName(e.currentTarget.value)}
      />
      <Input
        value={table}
        onChange={e => setTable(e.currentTarget.value)}
      />
      <Button onClick={addComand} title={"Enviar"}/>
    </>
  );
};
function GetProduct() {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    db.collection("menu")
      .get()
      .then(snap => {
        const menuTela = snap.docs.map(doc => ({...doc.data()}));
        setMenu(menuTela);
      });
  });
  return(
    menu.map((item)=> <Button key={item.product} value={item.product} title={item.product} />
  ))
}

function App() {
  return (
    <section className={css(style.main)}>
      <h1>Burger Queen</h1>
      <GetProduct />
      <div className={css(style.main)}>
      <ComandPerson />
      </div>
    </section>
  );
}

export default App;
