import React from 'react'
import styled from 'styled-components'

type Props = {
  text: string
  Icon: React.ElementType
  active: boolean
}

export const SideBarOption: React.FC<Props> = (props) => {
  const { text, Icon, active } = props

  return (
    <StyledSideBarOption>
      <div className={`sideBarOption ${active && 'sideBarOptionActive'}`}>
        <Icon />
        <h2>{text}</h2>
      </div>
    </StyledSideBarOption>
  )
}

const StyledSideBarOption = styled.div`
  .sideBarOption {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: color 0.15s ease-out;
    padding-left: 20px;
  }

  .sideBarOption:hover {
    background-color: #e8f5fe;
    border-radius: 30px;
    color: var(--twitter-color);
  }

  .sideBarOption > .MuiSvgIcon-root {
    padding-right: 20px;
  }

  .sideBarOption > h2 {
    font-size: 24px;
    margin-right: 20px;
    font-weight: 800;
  }

  .sideBarOptionActive {
    color: var(--twitter-color);
  }
`