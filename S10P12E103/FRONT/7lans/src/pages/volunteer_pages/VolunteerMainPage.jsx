import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../store/userSlice";
import { updateChildInfo } from "../../store/childSlice";
import { updateChildrenInfo } from "../../store/childrenSlice";
import axios from "axios";
import getEnv from "../../utils/getEnv";
import { Tooltip } from "react-tooltip";
import "../../../scss/_homepage.scss";


import Logo from "../../images/7lans_logo.png";
import MainChildren from "../../images/main_page/main_page_children.png";
import LineIcon from "../../images/main_page/line.png"
import LeftLetterIcon from "../../images/main_page/left_letter.png"
import MiddleLetterIcon from "../../images/main_page/middle_letter.png"
import RightLetterIcon from "../../images/main_page/right_letter.png"
import PostIcon from "../../images/main_page/post.png"
import DinosaurIcon from "../../images/dinosaur14_basic.png"

const Container = styled.div`
  /* font-family: 'Nanum Gothic', sans-serif; */
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
    180deg,
    rgb(255, 230.27, 102, 0.71),
    rgb(255, 215, 3) 70%,
    rgb(255, 248.22, 224.19, 0) 100%
  );
  // background-image: url('/Background.png');
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
  top: 0.8rem; /* 상단 여백 조절 */
  height: 70px;
`;

const MyChildren = styled.div`
  position: absolute;
  left: 5rem;
  top: 21.3%;
  border-radius: 100px;
  .img {
    display: flex;
    align-items: center;
  }

  :hover {
    transform: scale(1.01);
    transition: 0.2s ease-in-out;
  }
`;

// const TextBox = styled.h2`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     width: 220px;
//     border-radius: 15px;
//     background: #b798e0;
//     /* box-shadow: 5px 5px 5px #dfb150;  */
//     height: 50px;
//     margin-left: 1.4rem;
//     color: white;
// `

const Letter = styled.div`
  position: relative;
  width: 1250px;
  top: 12%;
  left: 200px;
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

const MainBanner = styled.div`
  /* border: 1px solid black; */
  width: 1070px;
  height: 80px;
  position: absolute;
  left: 390px;
  top: 47%;
  display: flex;
  flex-direction: row;
  justify-content: end;
`;

const BannerText = styled.div`
  color: white;
  text-shadow: 2px 2px rgb(45, 45, 45, 0.6);
  font-size: 50px;
  width: 1100px;
  p {
    animation-duration: 3s;
    animation-name: slidein;
  }

  @keyframes slidein {
    from {
      margin-left: -20%;
      /* width: 300%; */
    }

    to {
      margin-left: 0%;
      /* width: 100%; */
    }
  }
`;

const UnderSection = styled.div`
  position: absolute;
  top: 53%;
  left: 2.5%;
  width: 95vw;
  height: 115px;
  padding: 1.4rem;
`;

const ExpBar = styled.div`
  width: 100%;
  height: 60px;
  border: 3px solid rgb(45, 45, 45);
  background-color: rgb(255, 240, 186);
  border-radius: 20px;
  margin-top: 10px;
`;

const FilledExp = styled.div`
  height: 100%;
  border-radius: 18px;
  background-color: rgba(255, 184, 36, 1); /* 채우진 부분의 색상 */
`;

const ImgArray = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3%;
  margin-top: 22.5%;
  justify-content: space-evenly;
  margin-left: 2rem;
  margin-right: 2rem;
`;

// const defaultImagePath = "./default_image.png";
const Frame = styled.div`
  padding: 10px;
  width: 200px;
  height: 150px;
  position: absolute;
  top: 30%;
  left: 45%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  background-image: url("./frame.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 20px;
  &:hover {
    background-color:rgb(255, 215, 3, 0.2);
  }
`;

const Images = ({ image }) => {
  return (
    <div>
      <img src={image.meetingImagePath} />
    </div>
  );
};

const ChattingPicture = () => {
  const [images, setImages] = useState([]);

  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false);
  const onRun = () => setAnimate(true);

  const urlInfo = getEnv("API_URL");

  const volunteer = useSelector((state) => state.user.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${urlInfo}/meetingImage/random/${volunteer.memberId}`
        );
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
        width: "93.5%",
        flexDirection: "row",
        gap: "3%",
        marginTop: "19.2%",
        justifyContent: "space-evenly",
        marginLeft: "2rem",
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
  const urlInfo = getEnv("API_URL");
  const userInfo = useSelector((state) => state.user.value);
  const dino = useSelector((state) => state.dino.value);
  const dispatch = useDispatch();
  const calculatedWidth =
    userInfo?.volunteerTime >= 100
      ? userInfo.volunteerTime % 100
      : userInfo?.volunteerTime || 0;
  const quotient = Math.floor(calculatedWidth / 100);
  //아동 데이터 가져오기(봉사자 id를 가지고 있어야함)
  useEffect(() => {
    axios
      .get(`${urlInfo}/child/listByVolunteer/${userInfo.memberId}`)
      .then((res) => {
        // dispatch(updateChildInfo(res.data[0]));
        // 메인 페이지에서 디폴트 아동 정보를 가져오지 않게 변경합니다.
        dispatch(updateChildInfo(""));
        dispatch(updateChildrenInfo(res.data));
      })
      .catch((err) => {});
  }, []);

  const resetData = () => {
    dispatch(updateChildInfo(""));
    dispatch(updateChildrenInfo([]));
    dispatch(updateUserInfo(""));
    localStorage.removeItem('jwtToken');
  };

  return (
    <Container>
      <header className="shadow">
        <LogoImage src={Logo} />
        <Link
          style={{ fontSize: "23px", textDecorationLine: "none" }}
          to={"/dinosaur_dict"}
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
      <MyChildren>
        <Link
          data-tooltip-id="child-tooltip"
          to={"/volunteer_start"}
          style={{ fontSize: "23px", textDecorationLine: "none" }}
        >
          <img
            src={MainChildren}
            alt="나의 아이들 이미지"
          />
        </Link>

        <Tooltip id="child-tooltip">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>아이들과 함께할 공간으로</span>
            <span>이동해 볼까요?</span>
          </div>
        </Tooltip>
      </MyChildren>
      <MainBanner>
        <BannerText>
          {quotient === 0 ? (
            <p> 아이들과 함께한 시간 : {calculatedWidth} 시간 </p>
          ) : (
            <p>
              {" "}
              아이들과 함께한 시간 : {quotient * 100} 하고도 + {calculatedWidth}{" "}
              시간{" "}
            </p>
          )}
        </BannerText>
      </MainBanner>
      <Letter>
        <Overlap>
          <Line>
            <img
              style={{ width: "80%" }}
              src={LineIcon}
              alt="선"
            />
          </Line>
          <Link to={"/volunteer_whispher"}>
            <LeftLetter>
              <img
                style={{ width: "70px" }}
                src={LeftLetterIcon}
                alt="편지"
              />
            </LeftLetter>
          </Link>
          <Link to={"/volunteer_whispher"}>
            <MiddleLetter>
              <img
                style={{ width: "70px" }}
                src={MiddleLetterIcon}
                alt="편지"
              />
            </MiddleLetter>
          </Link>
          <Link to={"/volunteer_whispher"}>
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
            src={DinosaurIcon}
            alt="비행기"
          />
        </AirPlane>
        <Link to={"/volunteer_whispher"}>
          <PostBox>
            <img
              style={{ width: "180px" }}
              src={PostIcon}
              alt="우편함"
            />
          </PostBox>
        </Link>
      </Letter>
      <UnderSection>
        {/* {quotient === 0? 
          <h3> 아이들과 함께한 시간 : {calculatedWidth} 시간 </h3> 
          : <h3> 아이들과 함께한 시간 : {quotient*100} 하고도 + {calculatedWidth} 시간 </h3> }
         */}
        <div>
          <ExpBar>
            <FilledExp style={{ width: `${calculatedWidth}%` }} />
          </ExpBar>
        </div>
      </UnderSection>
      <ChattingPicture />
    </Container>
  );
};

export default VolunteerMainPage;
