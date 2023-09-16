import React, { useState } from 'react'
import styled from 'styled-components'
import { Avatar } from '@mui/material'
import { Button } from '@mui/material'
import { postTweet, postTweetImage } from '../../lib/api/tweet'
import { ErrorMessage } from './ErrorMessage'

export const TweetBox: React.FC = () => {
  const [tweetMessage, setTweetMessage] = useState('')
  const [tweetImage, setTweetImage] = useState<File | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setTweetImage(file)
    } else {
      alert('画像形式は PNG または JPEG のみ投稿できます')
      e.target.value = ''
    }
  }

  const handlePostTweet = (e: React.FormEvent) => {
    if (tweetMessage === '') return

    e.preventDefault()

    postTweet(tweetMessage)
      .then((res) => {
        if (res.status != 201) throw new Error('ツイート投稿に失敗しました')
        if (!res.data.tweet || !res.data.tweet.id)
          throw new Error('ツイート投稿に失敗しました')

        const tweetId: number = res.data.tweet.id
        if (tweetImage) {
          return postTweetImage(tweetId, tweetImage)
        }
        return Promise.resolve(res)
      })
      .then(() => {
        setTweetMessage('')
        setTweetImage(null)
        setErrorMessage('')
      })
      .catch((err) => {
        setErrorMessage((err.message || err) as string)
        console.log(err)
      })
  }

  return (
    <StyledTweetBox>
      <div className="tweetBox">
        <form onSubmit={handlePostTweet}>
          <div className="tweetBoxInput">
            <Avatar />
            <input
              value={tweetMessage}
              placeholder="いまどうしてる？"
              type="text"
              onChange={(e) => setTweetMessage(e.target.value)}
            />
          </div>
          <input
            className="tweetBoxImageInput"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
          />
          <Button className="tweetBoxTweetButton" type="submit">
            ツイートする
          </Button>
        </form>
        {errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
    </StyledTweetBox>
  )
}

const StyledTweetBox = styled.div`
  .tweetBox {
    padding-bottom: 10px;
    padding-right: 10px;
  }

  .tweetBox > form {
    display: flex;
    flex-direction: column;
  }

  .tweetBoxInput {
    padding: 20px;
    display: flex;
  }

  .tweetBoxInput > input {
    flex: 1;
    font-size: 20px;
    margin-left: 20px;
    border: none;
  }

  .tweetBoxImageInput {
    border: none;
    padding: 20px;
  }

  .tweetBoxTweetButton {
    background-color: var(--twitter-color) !important;
    color: white !important;
    font-weight: 900 !important;
    width: 130px !important;
    height: 40px !important;
    border-radius: 30px !important;
    margin-top: 20px !important;
    margin-left: auto !important;
  }
`
