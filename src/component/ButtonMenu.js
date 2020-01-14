import React from "react";
import { StyleSheet, css } from "aphrodite";

const style = StyleSheet.create({
  menucard: {
    border: "0 none",
    height: "50px",
    backgroundColor: "#ccc",
    textAlign: "center",
    flex: 1,
    boxShadow: "inset 0 -3px 5px #555"
  },
  menucardActive: {
    backgroundColor: "#e9ebee",
    boxShadow: "0 none"
  }
});

const ButtonMenu = props => (
  <button
    className={css(style.menucard, props.isActive && style.menucardActive)}
    onClick={props.handleClick}
  >
    {props.product}
  </button>
);
export default ButtonMenu;
