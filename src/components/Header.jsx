import React from "react";
import { NavLink } from "react-router-dom"

function Header() {
  return (
    <>
    <h1>BYDO Stats Page</h1>
    <nav>
      <ul>
        <li>
          <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/teamstats">Team Stats</NavLink>
        </li>
        <li>
          <NavLink to="/player/milkdrake">MilkDrake</NavLink>
        </li>

      </ul>
    </nav>
    </>
  );
}

export default Header;
