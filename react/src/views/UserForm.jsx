import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../axios-client'

export default function UserForm() {
  const {id} = useParams()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  if(id){
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/user/${id}`).then(({data}) =>{
        setLoading(false)
        setUser(data)
      }).catch(() => {
        setLoading(false)
      })
    }, [])
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
  }

  return (
    <>
      {user.id && <h1>Update user: {user.name}</h1>}
      {!user.id && <h1>new user</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading . . .
          </div>
        )}
        {errors && <div className="alert">
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
          </div>
          }
          {!loading && 
            <form onSubmit={onSubmit}>
              <input value={user.name} onChange={ev => setUser({...user,name: ev.target.value})} placeholder="name" />
              <input value={user.email} onChange={ev => setUser({...user,email: ev.target.value})} placeholder="email" />
              <input onChange={ev => setUser({...user,password: ev.target.value})} placeholder="password" />
              <input onChange={ev => setUser({...user,password_confirmation: ev.target.value})} placeholder="password confirmation" />
              <button className="btn">Update</button>
            </form>
          }
      </div>
    </>
  )
}
