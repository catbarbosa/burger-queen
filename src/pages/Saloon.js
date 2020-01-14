import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import "firebase/firestore";
import ButtonMenu from "../component/ButtonMenu.js";
import Button from "../component/Button.js";
import MenuCard from "../component/MenuCard.js";
import Input from "../component/Input.js";
import { StyleSheet, css } from "aphrodite";

const style = StyleSheet.create({
  containerSaloon: {
    display: "flex",
    height: "100%",
    flexWrap: "wrap",
    flexDirection: "column"
  },
  containerComand: {
    display: "block",
    padding: 20
  },
  containerComandItens: {
    border: "1px solid gray"
  },
  itensArea: {
    padding: 20,
    display: "flex",
    alignContent: "flex-start",
    flexWrap: "wrap",
    flexGrow: 1,
    flexShrink: 1
  },
  menuArea: {
    display: "flex"
  },
  bgModal: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)"
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    background: "#fff",
    width: 400,
    padding: 20
  },
  table: {
    width: "100%"
  },
  btnPlusMinus: {
    width: 50,
    margin: "0 5px"
  }
});

const ComandPerson = () => {
  const db = firebase.firestore();
  const date = new Date().toLocaleDateString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  const [name, setName] = useState("");
  const [table, setTable] = useState("");
  const [itens, setItens] = useState([]);
  const [menu, setMenu] = useState([]);
  const [breakfast, setBreakfast] = useState(true);
  const [modal, setModal] = useState({ status: false });
  const [option, setOption] = useState("");
  const [extras, setExtras] = useState("");

  const ButtonPlusMinus = props => (
    <button className={css(style.btnPlusMinus)} {...props} />
  );

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

  const addOptionExtras = item => {
    const updatedItem = { ...item };

    if (extras !== "Sem Extra") {
      updatedItem.price = modal.item.price + 1;
      updatedItem.product = `${modal.item.product} de ${option} com ${extras}`;
    } else {
      updatedItem.product = `${modal.item.product} de ${option} ${extras}`;
    }

    setComandItem(updatedItem, 1);
    setModal({ status: false });
    setOption("");
    setExtras("");
  };

  const addComand = e => {
    e.preventDefault();
    const comand = {
      name,
      table,
      itens,
      priceTotal: total,
      status: "pending",
      startTime: date,
      endTime: null
    };
    console.log(comand);
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
    return accumulator + item.price * item.quantity;
  }, 0);

  return (
    <div className={css(style.containerSaloon)}>
      <div className={css(style.menuArea)}>
        <ButtonMenu
          product="Café da Manhã"
          handleClick={() => setBreakfast(true)}
          isActive={breakfast}
        />
        <ButtonMenu
          product="Menu"
          handleClick={() => setBreakfast(false)}
          isActive={!breakfast}
        />
      </div>
      <div className={css(style.itensArea)}>
        {filterBreakfast().map((menuItem, index) => (
          <MenuCard
            key={index}
            product={menuItem.product}
            price={"R$ " + menuItem.price + ",00"}
            handleClick={() => verifyOptions(menuItem)}
          />
        ))}
      </div>
      <section className={css(style.containerComand)}>
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
        {modal.status && (
          <>
            <div className={css(style.bgModal)}></div>
            <div className={css(style.modal)}>
              <h3>Opções</h3>
              {modal.item.option.map((item, index) => (
                <div key={index}>
                  <input
                    onChange={() => setOption(item)}
                    type="radio"
                    name="option"
                    id={`opt${index}`}
                    checked={item === option}
                    value={item}
                  />
                  <label htmlFor={`opt${index}`}>{item}</label>
                </div>
              ))}
              <h3>Extras</h3>
              {modal.item.extras.map((item, index) => (
                <div key={index}>
                  <input
                    onChange={() => setExtras(item)}
                    type="radio"
                    name="extras"
                    id={`ext${index}`}
                    checked={item.extras}
                    value={item}
                  />
                  <label htmlFor={`ext${index}`}>{item}</label>
                </div>
              ))}
              <Button
                handleClick={() => addOptionExtras(modal.item)}
                title={"Adicionar"}
              />
              <Button
                handleClick={() => setModal({ status: false })}
                title={"Cancelar"}
              />
            </div>
          </>
        )}
        <section className={css(style.containerComandItens)}>
          {itens.length > 0 && (
            <table className={css(style.table)}>
              <thead>
                <tr>
                  <td>Item</td>
                  <td>Quantidade</td>
                  <td>Valor</td>
                </tr>
              </thead>
              <tbody>
                {itens.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product}</td>
                    <td>
                      <ButtonPlusMinus onClick={() => setComandItem(item, -1)}>
                        <i className="fas fa-minus" />
                      </ButtonPlusMinus>
                      {item.quantity}
                      <ButtonPlusMinus onClick={() => setComandItem(item, 1)}>
                        <i className="fas fa-plus" />
                      </ButtonPlusMinus>
                    </td>
                    <td>{"R$" + item.price * item.quantity + ",00"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
        <div>
          <h4>Valor Total: {"R$ " + total + ",00"}</h4>
        </div>
      </section>
    </div>
  );
};

export default ComandPerson;
