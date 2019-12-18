import React from "react";
import { StyleSheet, css } from "aphrodite";

const style = StyleSheet.create({
  input: {
    border: "1px solid black"
  }
});

const Input = props => (
  <input
    className={css(style.input)}
    value={props.input}
    onChange={props.handleClick}
  ></input>
);
export default Input;
