import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../store/userSlice';
import { FcKey } from "react-icons/fc";
import { FcAddressBook } from "react-icons/fc";
import { changeDino } from '../store/dinoSlice';
import getEnv from "../utils/getEnv";

import Logo from "../images/7lans_logo.png";
import setAuthorizationToken from '../utils/setAuthorizationToken';

const Container = styled.div`
  height: 93vh;
  width: 95vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 8px solid rgb(255, 215, 7);
  margin-top: 1.5%;
  margin-left: 2.3%;
  background-color:rgb(255, 255, 241);
`;

const Header = styled.header`
  align-self: flex-start;
  margin: 1rem;
`;

const H1 = styled.h1`
  font-weight: bold;
  color: rgb(53, 53, 53);
`

const ContentWrapper = styled.div`
  flex: 1;
  width: 100vw;
  display: flex;
  
`;


const LeftContent = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2%;
`;

const Line = styled.div`
  border: 1px dashed rgb(226, 198, 60);
  height: 90%;
  margin-top: 20px;
`;

const RightContent = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 3%;
  
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  };

  button {
    background: linear-gradient(
                300deg,
                rgba(255, 184, 36, 1),
                rgba(255, 237, 140, 1));
    font-size: 19px;
    font-weight: bold;
    border: none;
    border-radius: 50px;
    margin: 0.5rem;
    padding: 0.5rem;
    height: 50px;
    width: 130px;
    margin-left: 35%;
    margin-top: 7%;
    color: white;
    text-decoration-line: none;
    
  };

  p {
    margin: 0.5rem;
    text-decoration-line: none;
  };
`;

const EmailInput = styled.input`
    background-color: rgb(255, 241, 165);
    border: none;
    border-radius: 14.52px;
    margin-left: 10px;
    padding: 1rem;
    height: 50px;
    width: 300px;
`
const PasswordInput = styled.input`
    background-color: rgb(255, 241, 165);
    border: none;
    border-radius: 14.52px;
    margin-left: 10px;
    padding: 1rem;
    height: 50px;
    width: 300px;
`

const LogoImage = styled.img`
  height: 100px;
  width: 400px;
  margin-bottom: 8%;
`;

const InfoSpan = styled.span`
  background-color: rgb(255, 241, 165);
  padding: 0.5rem;
  border-radius: 14.52px;
  width: 70%;
  text-align: center;
  margin-bottom: 10%;
  
`;

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.user.value)
  const userDino = useSelector((state) => state.dino.value)
  const urlInfo = getEnv('API_URL');
  const dispatch = useDispatch()

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      login(email, password)
    }
  }

  const login = async (memberEmail, memberPassword) => {
    try {
      const res = await axios.post(`${urlInfo}/member/login`, {
        memberEmail,
        memberPassword
      });
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      const representDino = async (id) => {
        try {
          const res = await axios.get(`${urlInfo}/dinosaurs/myDinosaur/${id}`)
          dispatch(changeDino(res.data.id))
          // console.log(res.data.id)
        } catch (err) {
          console.error(err)
        }
      }
      // console.log(res);
      if (res && res.data.memberType === 'CHILD') {
        representDino(res.data.memberId)
        navigate('/child_main');
        dispatch(updateUserInfo(res.data))
      }
      else if (res && res.data.memberType === 'VOLUNTEER') {
        representDino(res.data.memberId)
        navigate('/volunteer_main')
        dispatch(updateUserInfo(res.data))
      }
      else if (res && res.data.memberType === 'MANAGER') {
        navigate('/admin_main_page')
        dispatch(updateUserInfo(res.data))
      }
    } 
    catch (err) {
      console.error(err);
      window.alert('이메일 혹은 비밀번호를 다시 한번 확인해주세요.')
    }
    // console.log(userInfo)
  };

  return (
    <Container>
      <Header>
        <Link to={'/'}>
          <FaArrowLeft />
        </Link>
      </Header>
      <H1>로그인</H1>
      <ContentWrapper>
        <LeftContent>
          <LogoImage src={Logo} alt="" />
          <InfoSpan>
            <h5 style={{margin: '0'}} >
              봉사자와 피봉사자의 연결을 도와주는 보조 웹 사이트
            </h5>
          </InfoSpan>
        </LeftContent>
        <Line />
        <RightContent>
          <div>
          <p> <FcAddressBook />
              <EmailInput type="text" 
                          onChange={(e) => setEmail(e.target.value)} 
                          value={email? email:''} 
                          placeholder='이메일을 입력하세요(test@email.com)' /></p>
          <p> <FcKey /> 
              <PasswordInput type="password" 
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyUp={handleEnter}
                            value={password? password:''}
                            placeholder='비밀번호를 입력하세요' /></p>
            <div style={{marginLeft: '25%',
                         fontSize: '14px',
                         marginTop: '20px',
                        }}> 아이디 찾기  |  비밀번호 찾기  |  {"  "}
            <Link to={'/register'}
                      style={{ textDecoration: 'none',
                                color: 'rgb(45,45,45)'
                    }}>회원가입 </Link>
            </div>
            <button onClick={() => login(email, password)}>로그인</button>
          </div>
        </RightContent>
      </ContentWrapper>
    </Container>
  );
}

export default LoginPage;
