import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import "firebase/firestore";
import Button from "../component/Button.js";
import MenuCard from "../component/MenuCard.js";
import Input from "../component/Input.js";
import { StyleSheet, css } from "aphrodite";

const style = StyleSheet.create({
  menuArea: {
    display: "flex",
    flexWrap: "wrap"
  }
});

const ComandPerson = () => {
  const db = firebase.firestore();
  const [name, setName] = useState("");
  const [table, setTable] = useState("");
  const [itens, setItens] = useState([]);
  const [menu, setMenu] = useState([]);
  const [breakfast, setBreakfast] = useState(true);

  function filterBreakfast() {
    return menu.filter(item => item.breakfast === breakfast);
  }

  function addComand(e) {
    e.preventDefault();
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
        setItens([]);
      });
  }
  useEffect(() => {
    firebase
      .firestore()
      .collection("menu")
      .get()
      .then(snapshot =>
        snapshot.forEach(doc => {
          setMenu(currentState => [...currentState, doc.data()]);
        })
      );
  }, []);
  const total = itens.reduce((accumulator, itens) => {
    return accumulator + itens.price;
  }, 0);

  return (
    <>
      <label htmlFor="name">Comanda</label>
      <Input
        placeholder="Nome"
        defaultValue={name}
        onChange={e => setName(e.currentTarget.value)}
      />
      <Input
        placeholder="Mesa"
        type="number"
        defaultValue={table}
        onChange={e => setTable(e.currentTarget.value)}
      />
      <Button handleClick={addComand} title={"Enviar"} />
      <div></div>
      <div>
        <MenuCard
          product="Café da Manhã"
          handleClick={() => setBreakfast(true)}
        />
        <MenuCard product="Menu" handleClick={() => setBreakfast(false)} />
      </div>
      <div className={css(style.menuArea)}>
        {filterBreakfast().map(menuItem => (
          <MenuCard
            key={menuItem.product}
            product={menuItem.product}
            price={"R$ " + menuItem.price + ",00"}
            handleClick={() => setItens([...itens, menuItem])}
          />
        ))}
      </div>
      <div>
        {itens.map(item => (
          <section key={item.product}>
            <p>{item.product}</p>
            <p>{"R$" + item.price + ",00"}</p>
          </section>
        ))}
      </div>
      <div>
        <h4>Valor Total: {"R$ " + total + ",00"}</h4>
      </div>
    </>
  );
};

export default ComandPerson;
