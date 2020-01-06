import React from "react";
import { StyleSheet, css } from "aphrodite";

const style = StyleSheet.create({
  menucard: {
    border: "1px solid black",
    backgroundColor: "gray",
    flexBasis: "15%",
    flexShrink: "1",
    textAlign: "center"
  }
});

const MenuCard = props => (
  <section className={css(style.menucard)} onClick={props.handleClick}>
    <p>{props.product}</p>
    <p>{props.price}</p>
  </section>
)
export default MenuCard;
