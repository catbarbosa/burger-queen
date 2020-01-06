import React from "react";
import { StyleSheet, css } from "aphrodite";

const style = StyleSheet.create({
  input: {
    border: "1px solid black",
    width: "140px",
    height: "30px"
  }
});

const Input = props => <input className={css(style.input)} {...props} />;

export default Input;
