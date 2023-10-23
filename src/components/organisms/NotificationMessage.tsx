import styled from 'styled-components'

type Notification = {
  id: number
  subjectType: string
  user: {
    id: string
    name: string
    nickname: string
    avatarImageUrl: string
  }
}

type Props = {
  notification: Notification
}

export const NotificationMessage: React.FC<Props> = ({ notification }) => {
  if (notification.subjectType === 'comment') {
    return (
      <StyledNoticeMessage>
        {notification.user.nickname}さんがあなたのツイートにコメントしました
      </StyledNoticeMessage>
    )
  }

  if (notification.subjectType === 'favorite') {
    return (
      <StyledNoticeMessage>
        {notification.user.nickname}さんがあなたのツイートをいいねしました
      </StyledNoticeMessage>
    )
  }

  if (notification.subjectType === 'retweet') {
    return (
      <StyledNoticeMessage>
        {notification.user.nickname}さんがあなたのツイートをリツイートしました
      </StyledNoticeMessage>
    )
  }

  return null
}

const StyledNoticeMessage = styled.p``
