import { Outlet } from 'react-router-dom'

export const ProtectRouterAdmin = () => {
  let authToken = localStorage.getItem('admin')

  return authToken ? <Outlet /> : window.location.assign('/login')
}

export const ProtectRouterUser = () => {
  let authToken = localStorage.getItem('user')
  return authToken ? <Outlet /> : window.location.assign('/login')
}
