import React from "react";
import {Link} from "react-router-dom";
function Nav(){
    return(
        <nav>
              <Link to="/cozinha">Cozinha</Link>
              <Link to="/salao">Salão</Link>
        </nav>
    )
}
export default Nav