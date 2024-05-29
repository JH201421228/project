import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../store/userSlice";
import axios from "axios";
import { updateVolInfo } from "../../store/volSlice";
import { updateVolsInfo } from "../../store/volsSlice";
import { Tooltip } from "react-tooltip";
import getEnv from "../../utils/getEnv";

import Logo from "../../images/7lans_logo.png"
import MainChildren from "../../images/main_page/child_mainpage_volunteer.png";
import LineIcon from "../../images/main_page/line.png"
import LeftLetterIcon from "../../images/main_page/left_letter.png"
import MiddleLetterIcon from "../../images/main_page/middle_letter.png"
import RightLetterIcon from "../../images/main_page/right_letter.png"
import AirPlaneIcon from "../../images/main_page/airplane.png"
import PostIcon from "../../images/main_page/post.png"

const Container = styled.div`
/* font-family: 'Nanum Gothic', sans-serif; */
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
    180deg,
    rgba(255, 230.27, 102, 0.71),
    rgb(255, 215, 3) 70%,
    rgba(255, 248.22, 224.19, 0) 100%
  );
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  header {
    display: flex;
    justify-content: flex-end;
    margin-right: 2rem;
    background-color: rgb(255, 215, 3);
    width: 100%;
    height: 100px;
  }

  a {
    color: rgb(45, 45, 45); /* 글자 색상 설정 */
    font-size: 18px; /* 글자 크기 설정 */
    font-weight: bolder;
    margin: 2rem;
    text-decoration-line: none;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
`;

const LogoImage = styled.img`
  position: absolute; /* 절대 위치 설정 */
  left: 3rem; /* 왼쪽 여백 조절 */
  top: 1rem; /* 상단 여백 조절 */
  height: 70px;
`;

const MyChildren = styled.div`
  position: absolute;
  left: 3rem;
  top: 57.3%;
  border-radius: 100px;
  width: 300px;
  height: 300px;
  .img {
    display: flex;
    align-items: center;
  }
  :hover {
    transform: scale(1.01);
    transition: 0.2s ease-in-out;
  }
`;

const Letter = styled.div`
  position: relative;
  width: 1250px;
  top: 50px;
  left: 170px;
`;

const Overlap = styled.div`
  height: 195px;
  left: 218px;
  position: absolute;
  top: 79%;
  width: 867px;
  transform: rotate(3deg);
`;

const Line = styled.div`
  height: 133px;
  left: 16%;
  position: absolute;
  width: 880px;
`;

const LeftLetter = styled.div`
  position: absolute;
  left: 33%;
  top: 10%;
  :hover {
    transform: scale(1.1);
    transition: 0.2s ease-in-out;
  }
`;

const MiddleLetter = styled.div`
  position: absolute;
  left: 56%;
  top: 20%;
  :hover {
    transform: scale(1.1);
    transition: 0.2s ease-in-out;
  }
`;

const RightLetter = styled.div`
  position: absolute;
  left: 79%;
  top: 33%;
  :hover {
    transform: scale(1.1);
    transition: 0.2s ease-in-out;
  }
`;

const AirPlane = styled.div`
  left: 15%;
  object-fit: cover;
  position: absolute;
  top: 65px;
  width: 164px;
  transform: rotate(10deg);
  transform: scaleX(-1);
`;

const PostBox = styled.div`
  height: 250px;
  left: 1050px;
  object-fit: cover;
  position: absolute;
  width: 220px;
`;

// const CrossLine = styled.div`
//   width: 88%;
//   height: 5px;
//   background-color: rgb(255, 184, 51);
//   margin-left: 5.3rem;
//   margin-top: 10px;
//   border-radius: 10px;
//   margin-bottom: 0;
// `;

const ChattingPicture = () => {
  const [images, setImages] = useState([]);

  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false);
  const onRun = () => setAnimate(true);

  const urlInfo = getEnv("API_URL");

  const userInfo = useSelector((state) => state.user.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${urlInfo}/meetingImage/random/${userInfo.memberId}`
        );

        // console.log(response)
        setImages(response.data);

        if (response.data.length === 0) {
          setImages([
            {randomImagePath: './default_image.png'},
            {randomImagePath: './default_image.png'},
            {randomImagePath: './default_image.png'},
            {randomImagePath: './default_image.png'},
            {randomImagePath: './default_image.png'},
          ])
        }
        
      } catch (error) {
        console.error("Error fetching data:", error);
        setImages([
          {randomImagePath: './default_image.png'},
          {randomImagePath: './default_image.png'},
          {randomImagePath: './default_image.png'},
          {randomImagePath: './default_image.png'},
          {randomImagePath: './default_image.png'},
        ])
      }
    };

    fetchData();

  }, []);

  return (
    <div
      className="wrapper"
      style={{
        display: "flex",
        width: "90%",
        flexDirection: "row",
        gap: "3%",
        justifyContent: "space-evenly",
        marginLeft: "3.4rem",
        marginRight: "2rem",
        paddingTop: "10px",
        
      }}
    >
      <div className="slide_container" style={{ marginLeft: "2rem" }}>
        <ul
          className="slide_wrapper"
          onMouseEnter={onStop}
          onMouseLeave={onRun}
        >
          <div
            className={"slide original".concat(animate ? "" : " stop")}
            style={{ marginBottom: "0", paddingBottom: "0" }}
          >
            {images.map((image, index) => (
              <li
                key={index}
                // className={index % 2 === 0 ? "big" : "small"}
                className="small"
              >
                <img
                  key={index}
                  src={image.randomImagePath}
                  alt=""
                  style={{
                    height: "100%",
                    border: "3.4px dashed  rgb(45,45,45)",
                    borderRadius: "10px"
                  }}
                />
              </li>
            ))}
          </div>
          <div
            className={"slide clone".concat(animate ? "" : " stop")}
            style={{ paddingBottom: "0", marginBottom: "0" }}
          >
            {images.map((image, index) => (
              <li
                key={index}
                // className={index % 2 === 0 ? "big" : "small"}
                className="small"
              >
                <img
                  key={index}
                  src={image.randomImagePath}
                  alt=""
                  style={{
                    height: "100%",
                    border: "3.4px dashed  rgb(45,45,45)",
                    borderRadius: "10px"
                  }}
                />
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

const VolunteerMainPage = () => {
  const urlInfo = getEnv('API_URL');
  const userInfo = useSelector((state) => state.user.value);
  const dino = useSelector((state) => state.dino.value)
  const dispatch = useDispatch();
  const calculatedWidth = userInfo?.volunteerTime >= 100 ? userInfo.volunteerTime % 100 : userInfo?.volunteerTime || 0;
  const quotient = Math.floor(calculatedWidth / 100);
  //아동 데이터 가져오기(봉사자 id를 가지고 있어야함)
  useEffect(() => {
    axios
      .get(`${urlInfo}/volunteer/listByChild/${userInfo.memberId}`)
      .then((res) => {
        // console.log(res.data)
        // dispatch(updateVolInfo(res.data[0]));
        // 기본값으로 첫 봉사자를 선택하지 않습니다.
        dispatch(updateVolInfo(''))
        dispatch(updateVolsInfo(res.data));
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  const resetData = () => {
    dispatch(updateVolInfo(""));
    dispatch(updateVolsInfo([]));
    dispatch(updateUserInfo(""));
    localStorage.removeItem('jwtToken');
  };

  return (
    <Container>
      <header className="shadow">
        <LogoImage src={Logo} />
        <Link
          style={{ fontSize: "23px", textDecorationLine: "none" }}
          to={"/child_dinosaur_dict"}
        >
          공룡도감
        </Link>
        <Link
          style={{ fontSize: "23px", textDecorationLine: "none" }}
          to={"/"}
          onClick={() => resetData()}
        >
          로그아웃
        </Link>
      </header>
      {/* <CrossLine /> */}
       <ChattingPicture /> 
       {/* <CrossLine /> */}
      <MyChildren>
        <Link
          data-tooltip-id="vol-tooltip"
          to={"/child_start"}
          style={{ fontSize: "23px", textDecorationLine: "none" }}
        >
          <img src={MainChildren} alt="나의 아이들 이미지" />
        </Link>

        <Tooltip id="vol-tooltip">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>선생님과 함께할 공간으로</span>
            <span>이동해 볼까요?</span>
          </div>
        </Tooltip>
      </MyChildren>

      <Letter>
        <Overlap>
          <Line>
            <img style={{ width: "80%" }} src={LineIcon} alt="선" />
          </Line>

          <Link to={"/child_whispher"}>
            <LeftLetter>
              <img
                style={{ width: "70px" }}
                src={LeftLetterIcon}
                alt="편지"
              />
            </LeftLetter>
          </Link>
          <Link to={"/child_whispher"}>
            <MiddleLetter>
              <img
                style={{ width: "70px" }}
                src={MiddleLetterIcon}
                alt="편지"
              />
            </MiddleLetter>
          </Link>
          <Link to={"/child_whispher"}>
            <RightLetter>
              <img
                style={{ width: "70px" }}
                src={RightLetterIcon}
                alt="편지"
              />
            </RightLetter>
          </Link>
        </Overlap>
        <AirPlane>
          <img
            style={{ width: "70px" }}
            src="../../../dinosourImage/dinosaur17_basic.png"
            alt="비행기"
          />
        </AirPlane>
        <Link to={"/child_whispher"}>
          <PostBox>
            <img
              style={{ width: "180px" }}
              src={PostIcon}
              alt="우편함"
            />
          </PostBox>
        </Link>
      </Letter>
        
    </Container>
  );
};

export default VolunteerMainPage;
