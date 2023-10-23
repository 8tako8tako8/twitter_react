import styled from 'styled-components'
import { SideBar } from '../templates/SideBar'
import { Notifications } from '../organisms/Notifications'

export const Notice: React.FC = () => {
  return (
    <StyledNotice>
      <SideBarBlock>
        <SideBar />
      </SideBarBlock>
      <NotificationBlock>
        <Notifications />
      </NotificationBlock>
    </StyledNotice>
  )
}

const StyledNotice = styled.div`
  display: flex;
  height: 100vh;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 10px;
`

const SideBarBlock = styled.div`
  border-right: 1px solid var(--twitter-background);
  min-width: 300px;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
`

const NotificationBlock = styled.div`
  min-width: 600px;
  border-right: 1px solid var(--twitter-background);
  overflow-y: scroll;
`
