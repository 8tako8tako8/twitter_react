import styled from 'styled-components'
import { NotificationMessage } from './NotificationMessage'

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

export const Notification: React.FC<Props> = ({ notification }) => {
  return (
    <StyledNotification>
      <NotificationCard>
        <AvatarImageBlock>
          {notification.user.avatarImageUrl ? (
            <AvatarImage src={notification.user.avatarImageUrl} />
          ) : (
            <AvatarImage src={`${process.env.PUBLIC_URL}/no_image.png`} />
          )}
        </AvatarImageBlock>
        <NotificationCardBody>
          <NotificationMessage notification={notification} />
        </NotificationCardBody>
      </NotificationCard>
    </StyledNotification>
  )
}

const StyledNotification = styled.div``

const NotificationCard = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid var(--twitter-background);
`

const AvatarImageBlock = styled.div`
  padding: 15px;
`

const AvatarImage = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`

const NotificationCardBody = styled.div`
  flex: 1;
  min-width: 0;
`
