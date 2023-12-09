import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../App'

type Props = {
  children: ReactNode
}

export const PrivateRoute: React.FC<Props> = (props) => {
  const { children } = props
  const isLogined = useAppSelector((state) => state.user.isLogined)
  return isLogined ? <>{children}</> : <Navigate to={'/login'} />
}
