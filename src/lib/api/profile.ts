import client from './client'

export const getProfile = (userId: number) => {
  return client.get(`users/${userId}`)
}
