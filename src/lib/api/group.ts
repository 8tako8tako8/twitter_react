import client from './client'

export const getGroups = () => {
  return client.get(`groups`)
}

export const findOrCreateGroup = (userId: number) => {
  return client.post(`groups`, { userId })
}
