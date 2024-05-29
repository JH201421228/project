import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion} from "framer-motion";

import BlockLogoIcon from "../images/block_logo.png"

const Container = styled.div`
  z-index: -100;
  background: linear-gradient(
                        180deg,
                  rgba(255, 230.27, 102, 0.71),
                  rgb(255,215,3) 60%,
                  rgba(255, 248.22, 224.19, 0)100%);
  background-image: url('./Background.png');
  background-size: cover;
  /* background-color: rgb(255, 215, 7); */
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogoImage = styled.img`
  z-index: 1;
  margin-bottom: 1rem;
  width: 500px;
  padding-right: 10px;
  margin-bottom:50px;
  margin-top: 70px;
`;

const InfoSpan = styled.span`
z-index: 1;
  background-color: rgb(253, 236, 136);
  padding: 0.8rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 1rem;
  text-align: center;
  margin-bottom:60px;
  margin-top:5px
`;

const LoginButton = styled(Link)`
z-index: 1;
  background-color: rgb(240, 165, 8);
  padding: 0.7rem;
  width: 231.86px;
  border-radius: 102.67px;
  transition: background-color 0.3s ease-in-out;
  gap:10.37px;
  text-decoration-line: none;
  
  
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: rgb(0, 164, 27);
  }
`;

const variants = {
    hidden: {
      opacity: 0.6,
      y: 7
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.4,
        repeat: Infinity,
        repeatType: "reverse"
      }
    })
  };

const items = ["️❤️", "💛", "💜"];

const HeartContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row; /* 가로로 정렬되도록 변경 */
  align-items: center;
`;

const Heart = () => {
  return (
    <HeartContainer>
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial="hidden"
          animate="visible"
          variants={variants}
          custom={i}
        >
          {item}
        </motion.li>
      ))}
    </HeartContainer>
  );
};

const EntryPage = () => {
  return (
    
    <Container>
      {/* <img src="./Background.png" alt='background'  style={{height: '100vh', width: '80vw'}}/> */}
      <LogoImage src={BlockLogoIcon} alt="" />
        <Heart />
      <InfoSpan className='shadow'>
        <h3 style={{margin: '0'}}>
          봉사자와 피봉사자의 연결을 도와주는 보조 웹 사이트
        </h3>
      </InfoSpan>
      <LoginButton className='shadow'
                  style={{fontSize:'20px',
                          color: 'white'}} to="/login">
        로그인
      </LoginButton>
    </Container>
  );
}

export default EntryPage;
