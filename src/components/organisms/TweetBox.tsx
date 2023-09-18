import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Avatar } from '@mui/material'
import { Button } from '@mui/material'
import { postTweet, postTweetImage } from '../../lib/api/tweet'
import { ErrorMessage } from './ErrorMessage'
import { useNavigate } from 'react-router-dom'
import { validateTweetMessage } from '../../validators/tweetValidator'

const homeUrl = process.env.PUBLIC_URL

type Props = {
  handleGetPosts: (page: number) => void
}

export const TweetBox: React.FC<Props> = ({ handleGetPosts }) => {
  const [tweetMessage, setTweetMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()
  const imageInputRef = useRef<HTMLInputElement>(null)

  const handlePostTweet = (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateTweetMessage(tweetMessage)
    if (validationError) {
      setErrorMessage(validationError)
      return
    }

    postTweet(tweetMessage)
      .then((res) => {
        if (res.status != 201) throw new Error('ツイート投稿に失敗しました')
        if (!res.data.tweet || !res.data.tweet.id)
          throw new Error('ツイート投稿に失敗しました')

        const tweetId: number = res.data.tweet.id
        const tweetImage = imageInputRef.current?.files?.[0]
        if (tweetImage) {
          return postTweetImage(tweetId, tweetImage)
        }
        return Promise.resolve(res)
      })
      .then(() => {
        setTweetMessage('')
        setErrorMessage('')

        // ツイート投稿後にツイート画像をリセットする
        if (imageInputRef.current) {
          imageInputRef.current.value = ''
        }

        // ツイート投稿後にホーム画面1ページ目に遷移させる
        const queryParams = new URLSearchParams(location.search)
        if (queryParams.get('page') === null) {
          // 元々1ページ目にいた場合はクエリパラメータがないので意図的に再取得させる
          handleGetPosts(1)
        } else {
          navigate(homeUrl)
        }
      })
      .catch((err) => {
        setErrorMessage((err.message || err) as string)
        console.error(err)
      })
  }

  return (
    <StyledTweetBox>
      <div className="tweetBox">
        <form onSubmit={handlePostTweet}>
          <div className="tweetBoxInput">
            <Avatar />
            <textarea
              value={tweetMessage}
              placeholder="いまどうしてる？"
              onChange={(e) => setTweetMessage(e.target.value)}
            />
          </div>
          <div className="tweetBoxImageAndButton">
            <input
              ref={imageInputRef}
              className="tweetBoxImageInput"
              type="file"
              accept="image/png, image/jpeg"
            />
            <Button className="tweetBoxTweetButton" type="submit">
              ツイートする
            </Button>
          </div>
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

  .tweetBoxInput > textarea {
    flex: 1;
    font-size: 20px;
    margin-left: 20px;
    border: none;
    resize: none;
    overflow: auto;
    min-width: 0;
  }

  .tweetBoxImageAndButton {
    display: flex;
    align-items: center;
    justify-content: center;
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
    margin-left: auto !important;
  }
`
