import React, { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import axoisClient from '../axios-client'

export default function DefaultLayout() {
  const {user, token, setUser, setToken} = useStateContext()
  if(!token){
    return <Navigate to="/login" />
  }

  const onLogout = (ev) => {
    ev.preventDefault()

    axoisClient.post('/logout')
    .then(()=>{
      setUser({})
      setToken(null)
    })
  }

  useEffect(() => {
    axoisClient.get('/user')
    .then(({data})=>{
      setUser(data)
    })
  }, [])

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Welcome
          </div>
          <div>
            {user.name}
            <a href="#" className="btn-logout" onClick={onLogout}>Logout</a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
