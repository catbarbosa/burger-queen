import React from "react";
import { StyleSheet, css } from "aphrodite";

const style = StyleSheet.create({
  comandcard: {
    border: "1px solid black",
    backgroundColor: "#ccc",
    margin:"5px",
    flexBasis: "10%",
    flexShrink: "1",
    textAlign: "center"
  }
});
const ComandCard = props => (
  <div className={css(style.comandcard)}>
    <p>{props.name}</p>
    {props.price.map(element => {
      return (
        <>
          <p>{element.product}</p>
          <p>{"R$" + element.price + ",00"}</p>
        </>
      );
    })}
    <p>{props.status}</p>
  </div>
);
export default ComandCard;
