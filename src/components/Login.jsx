import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role] = useState("");
  const navigate = useNavigate();


  async function login(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:9090/api/v1/user/login", {
        email: email,
        password: password,
        role: role,
      }).then((res) => {
        console.log(res.data);

        if (res.data.message === "Email not exits") {
          alert("Email not exits");
        }
        else if (res.data.message === "Login success." && res.data.role === "rh") {
          navigate('/homeRh');
        }else if(res.data.message === "Login success."){
          navigate('/home');
        }
        else {
          alert("Incorrect Email and Password not match");
        }
      }, fail => {
        console.error(fail);
      });
    }


    catch (err) {
      alert(err);
    }

  }

  async function register(event) {
    event.preventDefault();
    await navigate('/register');

  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <hr />

        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button type="submit" className="btn" onClick={login}>
            Login
          </button>

          <button type="submit" className="btn" onClick={register}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;