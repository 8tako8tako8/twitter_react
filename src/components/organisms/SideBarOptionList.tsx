import { FC } from 'react'
import { SideBarOption } from '../molecules/SideBarOption'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Button } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import styled from 'styled-components'
import ListAltIcon from '@mui/icons-material/ListAlt'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

export const SideBarOptionList: FC = () => {
  return (
    <StyledSideBarOptionList>
      <div className="sideBar">
        {/* { アイコン } */}
        <TwitterIcon className="sideBarTwitterIcon" />
        {/* { サイドバーオプション } */}
        <div>
          <SideBarOption text="ホーム" Icon={HomeIcon} />
          <SideBarOption text="話題を検索" Icon={SearchIcon} />
          <SideBarOption text="通知" Icon={NotificationsNoneIcon} />
          <SideBarOption text="メッセージ" Icon={MailOutlineIcon} />
          <SideBarOption text="ブックマーク" Icon={BookmarkBorderIcon} />
          <SideBarOption text="リスト" Icon={ListAltIcon} />
          <SideBarOption text="プロフィール" Icon={PermIdentityIcon} />
          <SideBarOption text="もっとみる" Icon={MoreHorizIcon} />
        </div>
        {/* { ツイートボタン } */}
        <Button variant="outlined" className="sideBarTweet">
          ツイートする
        </Button>
      </div>
    </StyledSideBarOptionList>
  )
}

const StyledSideBarOptionList = styled.div`
  .sideBarTwitterIcon {
    color: var(--twitter-color);
    font-size: 30px !important;
    margin-left: 20px;
    margin-bottom: 20px;
  }
  .sideBarTweet {
    background-color: var(--twitter-color) !important;
    color: white !important;
    font-weight: 900 !important;
    border: none !important;
    border-radius: 30px !important;
    height: 50px !important;
    margin-top: 20px !important;
  }
`
