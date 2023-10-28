import styled from 'styled-components'
import { SideBar } from '../templates/SideBar'
import { Groups } from '../organisms/Groups'
import { Messages } from '../organisms/Messages'
import { MessageBox } from '../organisms/MessageBox'
import { useEffect, useState } from 'react'
import { getGroups } from '../../lib/api/group'
import { getMessages } from '../../lib/api/message'

type User = {
  id: number
  name: string
  nickname: string
  avatarImageUrl: string
}

type Group = {
  id: number
  user: User
}

type Message = {
  id: number
  message: string
  user: {
    id: number
    name: string
    nickname: string
    avatarImageUrl: string
  }
  createdAt: string
  updatedAt: string
}

const initialGroup: Group = {
  id: 0,
  user: {
    id: 0,
    name: '',
    nickname: '',
    avatarImageUrl: '',
  },
}

export const DirectMessage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([])
  const [selectedGroup, setSelectedGroup] = useState<Group>(initialGroup)
  const [messages, setMessages] = useState<Message[]>([])

  const handleGetGroups = () => {
    getGroups()
      .then((res) => {
        const resGroups: Group[] = res.data.groups
        setGroups(resGroups)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleGetMessages = (groupId: number) => {
    getMessages(groupId)
      .then((res) => {
        const resMessages: Message[] = res.data.messages
        setMessages(resMessages)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    handleGetGroups()
  }, [])

  return (
    <StyledDirectMessage>
      <SideBarBlock>
        <SideBar />
      </SideBarBlock>
      <DirectMessageBlock>
        <GroupBlock>
          <Groups
            groups={groups}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
          />
        </GroupBlock>
        <MessageBlock>
          {selectedGroup.id !== 0 && (
            <>
              <MessageHeader>
                <h2>{selectedGroup.user.nickname}</h2>
              </MessageHeader>
              <Messages
                messages={messages}
                selectedGroup={selectedGroup}
                handleGetMessages={handleGetMessages}
              />
              <MessageBox
                groupId={selectedGroup.id}
                handleGetMessages={handleGetMessages}
              />
            </>
          )}
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
