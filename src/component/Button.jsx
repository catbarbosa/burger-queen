import React from "react";
import { StyleSheet, css } from 'aphrodite';


const style = StyleSheet.create({
    button:{
        color:'pink',
       },
})
const Button = props => (
    <button className={css(style.button)} onClick={props.handleClick}>{props.title}</button>
)
export default Button