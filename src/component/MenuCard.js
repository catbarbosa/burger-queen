import React from "react";
import { StyleSheet, css } from "aphrodite";

const style = StyleSheet.create({
  menucard: {
    cursor: "pointer",
    margin: "5px",
    border: "0 none",
    height: "100px",
    flex: "2 1 auto",
    minWidth: 170,
    backgroundColor: "#8DBF41",
    textAlign: "center",
    verticalAlign: "middle"
  }
});

const MenuCard = props => (
  <button className={css(style.menucard)} onClick={props.handleClick}>
    {props.product}
    <br />
    {props.price}
  </button>
);
export default MenuCard;
