import { FC } from 'react'
import { SideBarOption } from '../molecules/SideBarOption'
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
      <SideBarOption text="ホーム" Icon={HomeIcon} />
      <SideBarOption text="話題を検索" Icon={SearchIcon} />
      <SideBarOption text="通知" Icon={NotificationsNoneIcon} />
      <SideBarOption text="メッセージ" Icon={MailOutlineIcon} />
      <SideBarOption text="ブックマーク" Icon={BookmarkBorderIcon} />
      <SideBarOption text="リスト" Icon={ListAltIcon} />
      <SideBarOption text="プロフィール" Icon={PermIdentityIcon} />
      <SideBarOption text="もっとみる" Icon={MoreHorizIcon} />
    </StyledSideBarOptionList>
  )
}

const StyledSideBarOptionList = styled.div``
