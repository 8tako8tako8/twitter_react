import client from './client'

export const getMessages = (groupId: number) => {
  return client.get(`groups/${groupId}/messages`)
}
