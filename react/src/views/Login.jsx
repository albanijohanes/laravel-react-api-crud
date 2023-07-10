import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {createRef} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import { useState } from "react";

export default function Login() {
  const emailRef = createRef()
  const passwordRef = createRef()
  const { setUser, setToken } = useStateContext()
  const [message, setMessage] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
        }
      })
  }
    return (
        <form onSubmit={onSubmit}>
          <h1 className="title">Login</h1>
          {message &&
            <div className="alert">
              <p>{message}</p>
            </div>
          }
          <input ref={emailRef} type="text" placeholder="username or email" />
          <input ref={passwordRef} type="password" placeholder="password" />
          <button className="btn btn-block">
            Login
          </button>
          <p className="message">
            Tidak punya akun? <Link to="/register">Buat akun</Link>
          </p>
        </form>
    )
}

