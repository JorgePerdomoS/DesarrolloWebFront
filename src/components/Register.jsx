import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Register() {

  const [employeename, setEmployeename] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();


  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:9090/api/v1/user/create", {
        employeename: employeename,
        email: email,
        password: password,
        role: role,
      });
      alert("Employee Registation Successfully");
      navigate('/');
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <h1>Registrar usuario</h1>

        <form>
          <div className="form-group">
            <label htmlFor="employeename">Nombre del empleado:</label>
            <input
              type="text"
              className="form-control"
              id="employeename"
              placeholder="Ingresa el nombre"
              value={employeename}
              onChange={(event) => setEmployeename(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Ingresa el correo electrónico"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ingresa la contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Rol:</label>
            <select
              id="role"
              className="form-control"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="empleado">Empleado</option>
              <option value="rh">RH</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary mt-4" onClick={save}>
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;