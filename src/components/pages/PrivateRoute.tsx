import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
  children: ReactNode
  isLogined: boolean
}

const homeUrl = process.env.PUBLIC_URL

export const PrivateRoute: React.FC<Props> = (props) => {
  const { children, isLogined } = props
  return isLogined ? <>{children}</> : <Navigate to={homeUrl + '/login'} />
}
