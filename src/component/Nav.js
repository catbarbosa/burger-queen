import React from "react";
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";

const style = StyleSheet.create({
  link: {
    border: "1px solid gray",
    margin: "5px"
  }
});

function Nav() {
  return (
    <nav>
      <Link className={css(style.link)} to="/kitchen">
        Cozinha
      </Link>
      <Link className={css(style.link)} to="/saloon">
        Salão
      </Link>
      <Link className={css(style.link)} to="/waiter">
        Garçom
      </Link>
    </nav>
  );
}
export default Nav;
