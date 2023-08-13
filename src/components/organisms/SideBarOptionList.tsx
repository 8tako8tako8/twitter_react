import { FC } from 'react'
import { SideBarOption } from '../molecules/SideBarOption'
import HomeIcon from '@mui/icons-material/Home'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import styled from 'styled-components'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useLocation } from 'react-router-dom'

export const SideBarOptionList: FC = () => {
  const location = useLocation()

  return (
    <StyledSideBarOptionList>
      <SideBarOption
        text="ホーム"
        Icon={HomeIcon}
        active={location.pathname === '/'}
      />
      <SideBarOption
        text="通知"
        Icon={NotificationsNoneIcon}
        active={location.pathname === '/notifications'}
      />
      <SideBarOption
        text="メッセージ"
        Icon={MailOutlineIcon}
        active={location.pathname === '/messages'}
      />
      <SideBarOption
        text="ブックマーク"
        Icon={BookmarkBorderIcon}
        active={location.pathname === '/bookmarks'}
      />
      <SideBarOption
        text="プロフィール"
        Icon={PermIdentityIcon}
        active={location.pathname === '/profile'}
      />
      <SideBarOption
        text="退会"
        Icon={MoreHorizIcon}
        active={location.pathname === '/cancel'}
      />
    </StyledSideBarOptionList>
  )
}

const StyledSideBarOptionList = styled.div``
