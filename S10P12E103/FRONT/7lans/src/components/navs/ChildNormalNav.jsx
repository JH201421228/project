import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

import Logo from "../../images/7lans_log.png"

const NavBar = styled.nav`
  position: fixed;
  width: 100vw;
  height: 100px;
  background-color: rgb(255, 215, 3);
`;

const LogoImage = styled.img`
  height: 70px;
  margin-left: 40px;
  margin-top: 15px;
`;


const ChildNormalNav = () => {
  return (
      <NavBar className='shadow'>
        <Link to="/child_main">
          <LogoImage src={Logo} alt="logo" />
        </Link>
      </NavBar>
  )
}

export default ChildNormalNav