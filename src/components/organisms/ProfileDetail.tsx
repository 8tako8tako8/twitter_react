import { LocationOn, VerifiedUser } from '@mui/icons-material'
import LinkIcon from '@mui/icons-material/Link'
import CakeIcon from '@mui/icons-material/Cake'
import { Avatar, Button, Modal, TextField } from '@mui/material'
import React, { useState } from 'react'
import { styled } from 'styled-components'

type User = {
  id: number
  name: string
  nickname: string
  birthDate: string
  location: string
  websiteUrl: string
  introduction: string
  avatarUrl: string
  headerUrl: string
}

// TODO: リツイート、いいね機能、アバター画像後に削除する
const initialUser: User = {
  id: 1,
  name: 'aliiiiii1',
  nickname: 'Alice',
  birthDate: '2000-01-01',
  location: 'Tokyo',
  websiteUrl: 'https://example.com',
  introduction: 'よろしくお願いします！',
  avatarUrl: 'https://source.unsplash.com/random',
  headerUrl: 'https://source.unsplash.com/random',
}

export const ProfileDetail: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [profile, setProfile] = useState(initialUser)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setProfile({
      ...profile,
      [name]: value,
    })
  }

  const handleSaveProfile = () => {
    // TODO: プロフィール保存処理

    toggleModal()
  }

  const toggleModal = () => {
    setModalOpen(!isModalOpen)
  }

  return (
    <StyledProfileDetail>
      <div className="profileDetail">
        <div className="profileHeader">
          {initialUser.headerUrl && <img src={initialUser.headerUrl} />}
        </div>
        <div className="profileBody">
          <div className="profileBodyTop">
            <div className="profileAvatar">
              <Avatar />
            </div>
            <Button className="profileBodyTopEditButton" onClick={toggleModal}>
              プロフィールを編集する
            </Button>
          </div>
          <h3>
            {initialUser.nickname}
            <span className="profileBodySpecial">
              <VerifiedUser className="profileBadge" />
              {initialUser.name}
            </span>
          </h3>
          <div className="profileBodyIntroduction">
            <p>{initialUser.introduction}</p>
          </div>
          <div className="profileBodySubInfo">
            <div className="profileBodySubInfoLocation">
              <LocationOn />
              <p>{initialUser.location}</p>
            </div>
            <div className="profileBodySubInfoBirthDate">
              <CakeIcon />
              <p>{initialUser.birthDate}</p>
            </div>
            <div className="profileBodySubInfoWebsiteUrl">
              <LinkIcon />
              <a target="_blank" href={initialUser.websiteUrl}>
                {initialUser.websiteUrl}
              </a>
            </div>
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onClose={toggleModal}>
        <StyledModalContent>
          <h2>プロフィール編集</h2>
          <form onSubmit={handleSaveProfile}>
            <TextField
              fullWidth
              margin="normal"
              label="ニックネーム"
              name="nickname"
              value={profile.nickname}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="自己紹介"
              name="introduction"
              value={profile.introduction}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="ウェブサイトURL"
              name="websiteUrl"
              value={profile.websiteUrl}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="場所"
              name="location"
              value={profile.location}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="誕生日"
              name="birthDate"
              type="date"
              value={profile.birthDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
            <SaveButtonField>
              <SaveButton type="submit">保存</SaveButton>
            </SaveButtonField>
          </form>
        </StyledModalContent>
      </Modal>
    </StyledProfileDetail>
  )
}

const StyledProfileDetail = styled.div`
  .profileDetail {
  }

  .profileHeader > img {
    border-radius: 20px;
    height: 250px;
    width: 100%;
  }

  .profileBody {
    margin-left: 10px;
  }

  p {
    margin: 0;
    padding: 0;
  }

  .profileBodyIntroduction {
    margin-bottom: 10px;
    font-size: 15px;
    white-space: normal;
    word-wrap: break-word;
  }

  .profileBodyTop {
    display: flex;
    align-items: center;
  }

  .profileBodyTopEditButton {
    background-color: black !important;
    color: white !important;
    font-weight: 900 !important;
    width: 180px !important;
    height: 40px !important;
    border-radius: 30px !important;
    margin-left: auto !important;
    margin-right: 10px !important;
  }

  .profileBody > h3 {
    font-size: 15px;
  }

  .profileBadge {
    font-size: 14px !important;
    color: var(--twitter-color);
  }

  .profileBodySpecial {
    font-weight: 600;
    font-size: 12px;
    color: gray;
  }

  .profileAvatar {
    padding: 8px;
  }

  .profileBodySubInfo {
    display: flex;
    align-items: center;
    color: gray;
  }

  .profileBodySubInfoLocation {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  .profileBodySubInfoBirthDate {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  .profileBodySubInfoWebsiteUrl {
    display: flex;
    align-items: center;
  }
`

const StyledModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  max-width: 500px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  outline: none;
`

const SaveButtonField = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`

const SaveButton = styled(Button)`
  background-color: var(--twitter-color) !important;
  color: white !important;
  font-weight: 900 !important;
  width: 130px !important;
  height: 40px !important;
  border-radius: 30px !important;
`