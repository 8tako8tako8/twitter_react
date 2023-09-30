import { LocationOn, VerifiedUser } from '@mui/icons-material'
import LinkIcon from '@mui/icons-material/Link'
import CakeIcon from '@mui/icons-material/Cake'
import { Avatar, Button, Modal, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { styled } from 'styled-components'
import {
  saveAvatarImage,
  saveHeaderImage,
  saveProfile,
} from '../../lib/api/profile'

type User = {
  id: number
  name: string
  nickname: string
  birthdate: string
  location: string
  websiteUrl: string
  introduction: string
  avatarUrl: string
  headerUrl: string
}

type Post = {
  id: number
  user: {
    id: string
    name: string
    nickname: string
    avatarUrl: string
  }
  tweet: string
  imageUrl: string
  retweets: number
  likes: number
}

type Profile = User & {
  posts?: Post[]
}

type Props = {
  profile: Profile
  setProfile: React.Dispatch<React.SetStateAction<Profile>>
}

export const ProfileDetail: React.FC<Props> = ({ profile, setProfile }) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const avatarImageInputRef = useRef<HTMLInputElement>(null)
  const headerImageInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setProfile({
      ...profile,
      [name]: value,
    })
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()

    const avatarImageFile = avatarImageInputRef.current?.files?.[0]
    const avatarImagePromise = avatarImageFile
      ? saveAvatarImage(avatarImageFile)
      : Promise.resolve(null)

    const headerImageFile = headerImageInputRef.current?.files?.[0]
    const headerImagePromise = headerImageFile
      ? saveHeaderImage(headerImageFile)
      : Promise.resolve(null)

    Promise.all([saveProfile(profile), avatarImagePromise, headerImagePromise])
      .then(
        ([profileImageResponse, avatarImageResponse, headerImageResponse]) => {
          console.log('Profile Response:', profileImageResponse)
          console.log('Avatar Response:', avatarImageResponse)
          console.log('Header Response:', headerImageResponse)
        }
      )
      .catch((err) => {
        console.error(err)
      })
    toggleModal()
  }

  const toggleModal = () => {
    setModalOpen(!isModalOpen)
  }

  return (
    <StyledProfileDetail>
      <div className="profileDetail">
        <div className="profileHeader">
          {profile.headerUrl && <img src={profile.headerUrl} />}
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
            {profile.nickname}
            <span className="profileBodySpecial">
              <VerifiedUser className="profileBadge" />
              {profile.name}
            </span>
          </h3>
          <div className="profileBodyIntroduction">
            <p>{profile.introduction}</p>
          </div>
          <div className="profileBodySubInfo">
            <div className="profileBodySubInfoLocation">
              <LocationOn />
              <p>{profile.location}</p>
            </div>
            <div className="profileBodySubInfoBirthDate">
              <CakeIcon />
              <p>{profile.birthdate}</p>
            </div>
            <div className="profileBodySubInfoWebsiteUrl">
              <LinkIcon />
              <a target="_blank" href={profile.websiteUrl}>
                {profile.websiteUrl}
              </a>
            </div>
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onClose={toggleModal}>
        <StyledModalContent>
          <h2>プロフィール編集</h2>
          <form onSubmit={handleSaveProfile}>
            <label htmlFor="avatarImageInput">アバター画像</label>
            <input
              ref={avatarImageInputRef}
              id="avatarImageInput"
              className="avatarImageInput"
              type="file"
              accept="image/png, image/jpeg"
            />
            <label htmlFor="headerImageInput">ヘッダー画像</label>
            <input
              ref={headerImageInputRef}
              id="headerImageInput"
              className="headerImageInput"
              type="file"
              accept="image/png, image/jpeg"
            />
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
              value={profile.birthdate}
              onChange={handleInputChange}
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

  label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
  }

  input[type='file'] {
    display: block;
    margin: 10px 0;
    padding: 5px;
  }
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
