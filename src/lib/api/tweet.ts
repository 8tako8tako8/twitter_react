import client from './client'

export const getPosts = () => {
  return client.get('tweets')
}

export const postTweet = (tweet: string) => {
  return client.post('tweets', { tweet: tweet })
}

export const postTweetImage = (tweetId: number, image: File) => {
  const formData = new FormData()
  formData.append('image', image)
  formData.append('tweet_id', tweetId.toString())

  return client.post(`images`, formData)
}
