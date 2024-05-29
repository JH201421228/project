import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { FcKey } from "react-icons/fc";
import { FcAddressBook } from "react-icons/fc";
import { FcContacts } from "react-icons/fc";
import { RiCake2Fill } from "react-icons/ri";
import { FcSmartphoneTablet } from "react-icons/fc";
import { useSelector } from "react-redux";
import getEnv from "../utils/getEnv";

import Logo from "../images/7lans_logo.png";

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
  background-color: rgb(255, 255, 241);
`;

const Header = styled.header`
  align-self: flex-start;
  margin: 1rem;
`;

const H1 = styled.h1`
  font-weight: bold;
  color: rgb(53, 53, 53);
`;

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
  padding: 20px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  input {
    background-color: rgb(255, 241, 165);
    border: none;
    border-radius: 14.52px;
    margin-left: 10px;
    padding: 1rem;
    height: 50px;
    width: 300px;
  }

  button {
    background: linear-gradient(
      300deg,
      rgba(255, 184, 36, 1),
      rgba(255, 237, 140, 1));
      font-size: 19px;
      font-weight: bold;
      border: none;
      border-radius: 50px;
      padding: 0.5rem;
      height: 50px;
      width: 130px;
      margin-left: 8%;
      color: white;
      text-decoration-line: none;
  }

  select {
    background-color: rgb(255, 241, 165);
    border: none;
    border-radius: 14.52px;
    // margin: 0.5rem;
    padding: 0.5rem;
    height: 50px;
    width: 300px;
    /* margin-left: 35%; */
    // margin-top: 7%;
  }
  p {
    margin: 0.5rem;
    font-size: 14px
  }
`;

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [userType, setUserType] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birth, setBirth] = useState("");
  const [centerId, setCenterId] = useState("");

  const navigate = useNavigate();
  const urlInfo = getEnv('API_URL');
  const [centerList, setCenterList] = useState(null)

  // phoneNumber 변경 함수 (자동으로 '-' 삽입)=
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기
    const formattedValue = value.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    setPhoneNumber(formattedValue);
  };

  useEffect(() => {
    const getCenterList = async () => {
      try {
        const res = await axios.get(`${urlInfo}/childCenter/list`)
        setCenterList(res.data)
        // console.log(res)
      }
      catch (err) {
        console.log(err)
      }
    }
    getCenterList()
  }, [])
  // console.log(centerList)

  const signUp = async (
    memberEmail,
    memberPassword,
    memberType,
    memberName,
    memberPhoneNumber,
    memberBirth,
    centerId
  ) => {
    if (!memberEmail.includes('@')) {
      window.alert('유효하지 않은 이메일입니다.')
    }
    else if (password !== passwordCheck) {
      window.alert('비밀번호가 일치하지 않습니다.')
    }
    else {
      try {
        const res = await axios.post(
          `${urlInfo}/member/register`,
          {
            memberEmail,
            memberPassword,
            memberType,
            memberName,
            memberPhoneNumber,
            memberBirth,
            centerId,
          }
        );
  
        // console.log(res);
        navigate("/login");
      } catch (err) {
        console.error(err);
      }
    }
  }

  // const handlePassword1 = (e) => {
  //   setPassword1(() => e.target.value);
  // };

  return (
    <Container>
      <Header>
        <Link to={"/"}>
          <FaArrowLeft />
        </Link>
      </Header>
      <H1>회원가입</H1>
      <ContentWrapper>
        <LeftContent>
          <LogoImage src={Logo} alt="" />
          <InfoSpan>
            <h5 style={{margin: '0'}}>
              봉사자와 피봉사자의 연결을 도와주는 보조 웹 사이트
            </h5>
          </InfoSpan>
        </LeftContent>
        <Line />
        <RightContent>
          <Form>
            <div style={{display: 'flex', gap: '3.5rem'}}>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                style={{width: '300px'}}
              >
                <option value="">사용자 타입 선택</option>
                <option value="V">봉사자</option>
                <option value="C">학생</option>
                <option value="M">관리자</option>
              </select>
              {(userType === "C" || userType === "M") && (
                <select
                  value={centerId}
                  onChange={(e) => setCenterId(e.target.value)}
                  style={{width: '300px'}}
                >
                  <option value="">센터 선택</option>
                  {centerList.map((center, index) => {
                    return <option value={index+1}>{center.childCenterName}</option>
                  })}
                </select>
              )}
            </div>
            <div style={{display: 'flex', flexDirection: 'row', gap: '2rem'}}>
            <div>
            <label htmlFor="email">
              <FcAddressBook />
              <input
                type="text"
                placeholder={email ? "" : "이메일을 입력하세요"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </label>

            
            <label htmlFor="password">
              <FcKey />
            </label>
            <input
              type="password"
              placeholder={password ? "" : "비밀번호를 입력하세요"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
           

            
            <label htmlFor="password">
              <FcKey />
            </label>
            <input
              type="password"
              placeholder={password ? "" : "비밀번호를 다시 입력하세요"}
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              />
          
            </div>
            <div>
            <label htmlFor="username">
              <FcContacts />
              <input
                type="text"
                placeholder={userName ? "" : "성함을 입력하세요"}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>

            <label>
              <RiCake2Fill />
              <input
                type="date"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
              />
            </label>
            <label>
              <FcSmartphoneTablet />
              <input
                type="text"
                placeholder={phoneNumber ? "" : "전화번호를 입력하세요"}
                value={phoneNumber}
                onChange={(e) => handlePhoneNumberChange(e)}
              />
            </label>
            </div>
            </div>
            <p>아이디 찾기 | 비밀번호 찾기 | <Link to={"/login"}
                                                  style={{ textDecoration: 'none',
                                                           color: 'rgb(45,45,45)'
                                                        }}> 로그인</Link></p>
            <button
              type="button"
              onClick={() =>
                signUp(
                  email,
                  password,
                  userType,
                  userName,
                  phoneNumber,
                  birth,
                  centerId
                )
              }
            >
              회원가입
            </button>
          </Form>
        </RightContent>
      </ContentWrapper>
    </Container>
  );
};

export default Register;
