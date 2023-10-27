import styled from 'styled-components'
import { SideBar } from '../templates/SideBar'
import { Groups } from '../organisms/Groups'
import { Messages } from '../organisms/Messages'
import { MessageBox } from '../organisms/MessageBox'

export const DirectMessage: React.FC = () => {
  return (
    <StyledDirectMessage>
      <SideBarBlock>
        <SideBar />
      </SideBarBlock>
      <DirectMessageBlock>
        <GroupBlock>
          <Groups />
        </GroupBlock>
        <MessageBlock>
          <MessageHeader>
            <h2>Group Name</h2>
          </MessageHeader>
          <Messages />
          <MessageBox />
        </MessageBlock>
      </DirectMessageBlock>
    </StyledDirectMessage>
  )
}

const StyledDirectMessage = styled.div`
  display: flex;
  height: 100vh;
  max-width: 1000px;
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

const DirectMessageBlock = styled.div`
  display: flex;
`

const GroupBlock = styled.div`
  min-width: 250px;
  border-right: 1px solid var(--twitter-background);
`

const MessageHeader = styled.div`
  padding: 10px 10px;
`

const MessageBlock = styled.div`
  min-width: 450px;
  border-right: 1px solid var(--twitter-background);
`
