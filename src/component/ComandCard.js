import React from "react";
import { StyleSheet, css } from "aphrodite";

const style = StyleSheet.create({
  comandcard: {
    border: "1px solid black",
    backgroundColor: "gray",
    width: "200px",
    height: "250px",
    flexBasis: "15%",
    flexShrink: "1",
    textAlign: "center"
  }
});
const ComandCard = props => (
  <div className ={css(style.comandcard)}>
    <p>{props.name}</p>
    {props.price.map(element => {
      return( 
        <>
        <p>{element.product}</p>
        <p>{element.price}</p>
        </>
        )
      ;
    })}
  </div>
);
export default ComandCard;
