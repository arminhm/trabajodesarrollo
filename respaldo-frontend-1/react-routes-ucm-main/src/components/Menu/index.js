import React from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import "./menu.css";
import logo from "../../recursos/logo.jpg"; 

function Menu() {
  const { auth, logout } = React.useContext(AuthContext);
  const routes = [];

  if (auth.token) {
    if (auth.role === "ROLE_ADMIN") {
      routes.push({ to: "/", text: "Inicio" });
      routes.push({ to: "/coffees", text: "Coffees" });
      routes.push({ to: "/acerca", text: "Acerca de" });
      routes.push({ to: "/manage-coffee", text: "Gestión Coffee" });
      routes.push({ to: "/listuser", text: "Clientes" });
    } else if (auth.role === "ROLE_CLIENTE") {
      routes.push({ to: "/", text: "Inicio" });
      routes.push({ to: "/coffees", text: "Coffees" });
      routes.push({ to: "/acerca", text: "Acerca de" });
    }
    routes.push({ to: "/", text: "Salir", onClick: logout });
  } else {
    routes.push({ to: "/", text: "Inicio" });
    routes.push({ to: "/coffees", text: "Coffees" });
    routes.push({ to: "/acerca", text: "Acerca de" });
    routes.push({ to: "/login", text: "Iniciar Sesión" });
    routes.push({ to: "/register", text: "Registrarse" });
  }

  return (
    <div className="menu-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <ul className="menu">
        {routes.map((item, index) => (
          <li key={index}>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to={item.to}
              onClick={item.onClick ? item.onClick : null}
            >
              {item.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Menu };
