import client from './client'

export const getGroups = () => {
  return client.get(`groups`)
}
