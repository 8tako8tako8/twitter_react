import client from './client'

const BOOKMARKS_PER_PAGE = 10

export const bookmark = (tweetId: number) => {
  return client.post(`bookmarks`, { tweet_id: tweetId })
}

export const cancelBookmark = (tweetId: number) => {
  return client.delete(`bookmarks`, { data: { tweet_id: tweetId } })
}

export const getBookmarks = (currentPage: number) => {
  return client.get(`bookmarks`, {
    params: {
      limit: BOOKMARKS_PER_PAGE,
      offset: currentPage,
    },
  })
}
