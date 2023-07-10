import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

export default function Register(){
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState(null)
  const {setUser, setToken} = useStateContext()

  const onSubmit = ev => {
    ev.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    console.log(payload);
    axiosClient.post('/signup', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err => {
        const response = err.response;
        if(response && response.status == 422){
          setErrors(response.data.errors)
        }
      })
  }
    return (
        <form onSubmit={onSubmit}>
          <h1 className="title">
            Registerasi
          </h1>
          {errors && <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
          }
          <input ref={nameRef} type="text" placeholder="username" />
          <input ref={emailRef} type="email" placeholder="email" />
          <input ref={passwordRef} type="password" placeholder="password" />
          <input ref={passwordConfirmationRef} type="password" placeholder="konfimasi password anda" />
          <button className="btn btn-block">
            Registerasi
          </button>
          <p className="message">
            Sudah punya akun? <Link to="/login">Login</Link>
          </p>
        </form>
    )
}
