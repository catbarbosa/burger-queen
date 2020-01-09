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

  const filterBreakfast = () => {
    return menu.filter(item => item.breakfast === breakfast);
  };

  const setComandItem = (menuItem, quantity) => {
    const index = itens.findIndex(item => item.id === menuItem.id);
    if (index !== -1) {
      let item = itens[index];
      item.quantity += quantity;

      if (item.quantity > 0) {
        itens[index] = item;
      } else {
        itens.splice(index, 1);
      }

      setItens([...itens]);
    } else {
      menuItem.quantity = 1;
      setItens([...itens, menuItem]);
    }
  };

  const addComand = e => {
    e.preventDefault();
    const fieldValue = firebase.firestore.FieldValue;
    const comand = {
      name,
      table,
      itens,
      status: "",
      startTime: fieldValue.serverTimestamp(),
      endTime: null
    };
    db.collection("comands")
      .add(comand)
      .then(() => {
        setName("");
        setTable("");
        setItens([]);
      });
  };
  useEffect(() => {
    firebase
      .firestore()
      .collection("menu")
      .get()
      .then(snapshot =>
        snapshot.forEach(doc => {
          setMenu(currentState => [
            ...currentState,
            { ...doc.data(), id: doc.id }
          ]);
        })
      );
  }, []);
  const total = itens.reduce((accumulator, item) => {
    return accumulator + item.price;
  }, 0);

  return (
    <>
      <label htmlFor="name">Comanda</label>
      <div>
        <MenuCard
          product="Café da Manhã"
          handleClick={() => setBreakfast(true)}
        />
        <MenuCard product="Menu" handleClick={() => setBreakfast(false)} />
      </div>
      <div className={css(style.menuArea)}>
        {filterBreakfast().map((menuItem, index) => (
          <MenuCard
            key={index}
            product={menuItem.product}
            price={"R$ " + menuItem.price + ",00"}
            handleClick={() => setComandItem(menuItem, 1)}
          />
        ))}
      </div>
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
      <div>
        {itens.map((item, index) => (
          <section key={index}>
            <p>{item.product}</p>
            <p>
              {item.quantity}
              <Button handleClick={() => setComandItem(item, -1)} title={"-"} />
              <Button handleClick={() => setComandItem(item, 1)} title={"+"} />
            </p>
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
