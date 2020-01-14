import React from "react";
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import "@fortawesome/fontawesome-free/css/all.css";

const style = StyleSheet.create({
  nav: {
    width: 100,
    background: "#8C0303"
  },
  link: {
    width: 100,
    padding: 20,
    display: "block",
    textAlign: "center",
    color: "#fff"
  },
  icon: {
    display: "block"
  }
});

const Nav = props => {
  return (
    <nav className={css(style.nav)} {...props}>
      <ul>
        <li>
          <Link className={css(style.link)} to="/saloon">
            <i className="fas fa-3x fa-person-booth"></i>
            Salão
          </Link>
        </li>
        <li>
          <Link className={css(style.link)} to="/kitchen">
            <i
              className="fas fa-3x fa-hamburger"
              style={{ display: "block" }}
            ></i>
            Cozinha
          </Link>
        </li>
        <li>
          <Link className={css(style.link)} to="/waiter">
            <i className="fas fa-3x fa-receipt"></i>
            Garçom
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
