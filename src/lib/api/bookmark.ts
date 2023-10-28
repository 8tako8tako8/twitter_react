import client from './client'

export const bookmark = (tweetId: number) => {
  return client.post(`bookmarks`, { tweet_id: tweetId })
}

export const cancelBookmark = (tweetId: number) => {
  return client.delete(`bookmarks`, { data: { tweet_id: tweetId } })
}
