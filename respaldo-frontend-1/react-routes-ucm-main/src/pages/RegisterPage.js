import React, { useState } from "react";
import { createUserAccount } from "../services/api"; // Asumiendo que tienes un servicio para crear usuarios
import "./style.css"; // Importa los estilos

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null); // Estado para el mensaje de error
  const [success, setSuccess] = useState(null); // Estado para el mensaje de éxito

  const register = async () => {
    if (!username || !password || !email || !fullName) {
      setError("Por favor complete todos los campos.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Por favor ingrese un correo electrónico válido.");
      return;
    }

    const transformedFullName = capitalizeFullName(fullName);

    const resp = await createUserAccount({
      username,
      password,
      email,
      fullName: transformedFullName,
      locked: false,
      disabled: false,
    });

    if (resp && resp.message === "Usuario agregado correctamente") {
      setSuccess("Usuario agregado correctamente");
      setError(null);
    } else {
      setError("No se pudo agregar el usuario.");
      setSuccess(null);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const capitalizeFullName = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="login-container">
      <h1>Registro</h1>

      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Usuario"
        className="login-input"
      />

      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        className="login-input"
      />

      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo Electrónico"
        className="login-input"
      />

      <input
        type="text"
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Nombre Apellido"
        className="login-input"
      />

      <button onClick={register} className="login-button">Registrar</button>

      {error && <p className="login-error">{error}</p>}
      {success && <p className="login-success">{success}</p>}
    </div>
  );
}

export { RegisterPage };
