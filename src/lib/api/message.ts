import client from './client'

export const getMessages = (groupId: number) => {
  return client.get(`groups/${groupId}/messages`)
}

export const sendMessage = (message: string, groupId: number) => {
  return client.post(`groups/${groupId}/messages`, { message })
}
