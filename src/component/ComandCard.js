import React from "react";
import { StyleSheet, css } from "aphrodite";

const style = StyleSheet.create({
  comandcard: {
    border: "1px solid black",
    backgroundColor: "#ccc",
    margin: "2px",
    flexBasis: "10%",
    flexShrink: "1",
    textAlign: "center"
  }
});
const ComandCard = props => (
  <div className={css(style.comandcard)} onClick={props.handleClick}>
    <p>{props.name}</p>
    <p>{props.table}</p>
    <p>{props.status}</p>
    <ul>
      {props.itens.map((element, index) => {
        return (
          <li key={index}>
            <p>{element.product}: {element.quantity}</p>
          </li>
        );
      })}
    </ul>
    <p>{props.priceTotal}</p>
    <p>{props.product}</p>
  </div>
);
export default ComandCard;
