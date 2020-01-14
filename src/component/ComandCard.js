import React from "react";
import { StyleSheet, css } from "aphrodite";

const style = StyleSheet.create({
  comandcard: {
    cursor: "pointer",
    margin: "10px",
    padding: "10px",
    textAlign: "center",
    verticalAlign: "middle",
    flex: 1,
    minWidth: 170,
    maxWidth: 200
  },
  pBreadUp: {
    backgroundColor: "#C99855",
    borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
    margin: "1px",
    height: "35px",
    lineHeight: "35px",
    textAlign: "center",
    verticalAlign: "middle"
  },
  pCheese: {
    backgroundColor: "#D98E04",
    borderRadius: "5px",
    margin: "1px"
  },
  pOnion: {
    backgroundColor: "#F2F2F2",
    borderRadius: "10px",
    margin: "1px",
    padding: "2px"
  },
  containerUl: {
    margin: "0",
    padding: "0"
  },
  listComandCard: {
    listStyleType: "none",
    verticalAlign: "middle",
    textAlign: "center",
    margin: "1px",
    padding: "0 5px",
    backgroundColor: "#4A2508",
    borderRadius: "10px",
    color: "white"
  },
  pTomate: {
    backgroundColor: "#8C0303",
    borderRadius: "10px",
    margin: "1px",
    padding: "2px"
  },
  pLettuce: {
    backgroundColor: "#66A121",
    borderRadius: "10px",
    margin: "1px",
    padding: "2px"
  },
  pBreadDown: {
    backgroundColor: "#C99855",
    borderRadius: " 0 0 50% 50% / 0 0 100% 100%",
    height: "30px",
    margin: "1px"
  }
});

const ComandCard = props => (
  <div className={css(style.comandcard)} onClick={props.handleClick}>
    <p className={css(style.pBreadUp)}>{props.table}</p>
    <p className={css(style.pCheese)}>{props.name}</p>
    <ul className={css(style.containerUl)}>
      {props.itens.map((element, index) => (
        <li className={css(style.listComandCard)} key={index}>
          {element.product}: {element.quantity}
        </li>
      ))}
    </ul>
    <p
      className={css(
        props.status === "pending" && style.pCheese,
        props.status === "finished" && style.pLettuce,
        props.status === "delivered" && style.pTomate
      )}
    >
      {props.status}
    </p>
    {props.priceTotal && (
      <p className={css(style.pCheese)}>{props.priceTotal}</p>
    )}
    <p className={css(style.pBreadDown)}></p>
  </div>
);

export default ComandCard;
