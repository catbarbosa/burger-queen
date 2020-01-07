import React from "react";
import {Link} from "react-router-dom";
function Nav(){
    return(
        <nav>
              <Link to="/kitchen">Cozinha</Link>
              <Link to="/saloon">Salão</Link>
              <Link to="/waiter">Garçom</Link>
        </nav>
    )
}
export default Nav