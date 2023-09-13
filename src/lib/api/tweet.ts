import client from './client'

export const getPosts = () => {
  return client.get('tweets')
}
