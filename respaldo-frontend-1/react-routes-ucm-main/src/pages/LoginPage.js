import React from "react";
import { AuthContext } from "../auth/AuthContext";
import { loginAccount } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./style.css"; // Importa los estilos

function LoginPage() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null); // Estado para el mensaje de error
  const navigate = useNavigate(); // Hook para la navegación

  const { setToken } = React.useContext(AuthContext);

  const login = async () => {
    if (!username || !password) {
      setError("Por favor complete todos los campos.");
      return;
    }

    const resp = await loginAccount({ username, password });

    // resp = {"token" : "yasdadjasdadgfkadk..."}
    if (resp && resp.token) {
      // si me logeo tengo que setear token
      await setToken(resp.token);
      navigate("/");
    } else {
      setError("Acceso denegado, credenciales incorrectas.");
    }
  };

  return (
    <div className="login-container">
      <h1>Inicio de Sesion</h1>

      <input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="Usuario"
        className="login-input"
      />

      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Contraseña"
        className="login-input"
      />

      <button onClick={login} className="login-button">Entrar</button>

      {error && <p className="login-error">{error}</p>}
    </div>
  );
}

export { LoginPage };
