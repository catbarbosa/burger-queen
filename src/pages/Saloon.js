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
  const date = new Date().getTime();
  const [name, setName] = useState("");
  const [table, setTable] = useState("");
  const [itens, setItens] = useState([]);
  const [menu, setMenu] = useState([]);
  const [breakfast, setBreakfast] = useState(true);
  const [modal, setModal] = useState({ status: false });
  const [option, setOption] = useState("");
  const [extras, setExtras] = useState("");

  const filterBreakfast = () => {
    return menu.filter(item => item.breakfast === breakfast);
  };

  const setComandItem = (menuItem, quantity) => {
    const index = itens.findIndex(item => item.product === menuItem.product);
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

  const verifyOptions = menuItem => {
    if (menuItem.option && menuItem.extras !== -1) {
      setModal({ status: true, item: menuItem });
    } else {
      setComandItem(menuItem, 1);
    }
  };

  const addOptionExtras = () => {
    const updatedItem = {
      ...modal.item,
      product: `${modal.item.product} de ${option} com ${extras}`
    };
    setComandItem(updatedItem);
    setModal({status: false})
  };

  // const STATUS = {
  //   "pending": "Pendente"
  // }

  // STATUS[item.status]
  // Object.keys(STATUS)[0]

  const addComand = e => {
    e.preventDefault();
    const comand = {
      name,
      table,
      itens,
      status: "pending",
      startTime: date,
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
            handleClick={() => verifyOptions(menuItem)}
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
      {modal.status ? (
        <div>
          <h3>Opções</h3>
          {modal.item.option.map((element, index) => (
            <div key={index}>
              <input
                onChange={() => setOption(element)}
                type="radio"
                name="option"
                value={element}
              />
              <label>{element}</label>
            </div>
          ))}  
          <h3>Extras</h3>
          {modal.item.extras.map((element, index) => (
            <div key={index}>
              <input
                onChange={() => setExtras(element)}
                type="radio"
                name="extras"
                value={element}
              />
              <label>{element}</label>
            </div>
          ))}
          <Button handleClick={addOptionExtras} title={"Adicionar"} />
        </div>
      ) : (
        false
      )}
      <div>
        {itens.map((item, index) => (
          <section key={index}>
            <p>{item.product}</p>
            <p>
              <Button handleClick={() => setComandItem(item, -1)} title={"-"} />
              {item.quantity}
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
