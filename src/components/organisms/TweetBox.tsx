import React, { useState } from 'react'
import styled from 'styled-components'
import { Avatar } from '@mui/material'
import { Button } from '@mui/material'

export const TweetBox: React.FC = () => {
  const [tweetMessage, setTweetMessage] = useState('')
  const [tweetImage, setTweetImage] = useState<File | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setTweetImage(file)
    } else {
      alert('画像形式は PNG または JPEG のみ投稿できます')
      e.target.value = ''
    }
  }

    if (tweetMessage === '') return

    e.preventDefault()
    // TODO: ツイートを送信する処理

    setTweetMessage('')
    setTweetImage('')
  }

  return (
    <StyledTweetBox>
      <div className="tweetBox">
        <form>
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
      </div>
    </StyledTweetBox>
  )
}

const StyledTweetBox = styled.div`
  .tweetBox {
    padding-bottom: 10px;
    border-bottom: 8px solid var(--twitter-background);
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
