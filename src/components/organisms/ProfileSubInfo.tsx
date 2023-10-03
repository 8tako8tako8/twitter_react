import styled from 'styled-components'

type Props = {
  subInfo: string
  children: React.ReactNode
}

export const ProfileSubInfo: React.FC<Props> = ({ subInfo, children }) => {
  return (
    <StyledProfileSubInfo>
      {subInfo && (
        <>
          {children}
          <p>{subInfo}</p>
        </>
      )}
    </StyledProfileSubInfo>
  )
}

const StyledProfileSubInfo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`
