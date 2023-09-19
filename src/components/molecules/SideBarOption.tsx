import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

type Props = {
  text: string
  linkTo: string
  isActive: boolean
  children: React.ReactNode
}

export const SideBarOption: React.FC<Props> = ({
  text,
  linkTo,
  isActive,
  children,
}) => {
  return (
    <StyledSideBarOption>
      <Link to={`${linkTo}`} className="sideBarOptionLink">
        <div className={`sideBarOption ${isActive && 'sideBarOptionActive'}`}>
          {children}
          <h2>{text}</h2>
        </div>
      </Link>
    </StyledSideBarOption>
  )
}

const StyledSideBarOption = styled.div`
  .sideBarOptionLink {
    text-decoration: none;
    color: inherit;
  }

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
