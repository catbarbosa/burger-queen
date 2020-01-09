import React from "react";
import { StyleSheet, css } from "aphrodite";

const style = StyleSheet.create({
  comandcard: {
    border: "1px solid black",
    backgroundColor: "#ccc",
    margin: "5px",
    flexBasis: "10%",
    flexShrink: "1",
    textAlign: "center"
  }
});
const ComandCard = props => (
  <div className={css(style.comandcard)}>
    <p>{props.name}</p>
    <p>{props.status}</p>
    <ul>
    {props.price.map((element, index) => {
      return (
        <li key={index}>
          <p>{element.product}</p>
          <p>{"R$" + element.price + ",00"}</p>
        </li>
      );
    })}
    </ul>
    <button onClick={props.handleClick}>{props.title}</button>
  </div>
);
export default ComandCard;
