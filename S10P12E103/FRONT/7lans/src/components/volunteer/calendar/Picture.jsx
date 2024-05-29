import { Button } from "bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import getEnv from "../../../utils/getEnv";
import { useSelector } from "react-redux";

import BlackboardIcon from "../../../images/picture_page/blackboard.png";
import ChorkIcon from "../../../images/picture_page/chork.png";
import NoPicture from "../../../images/picture_page/dinosaur1_sad.png";

const getRandomRotation = () => Math.floor(Math.random() * 30) - 20;
const Image = styled.img`
  height: 100%;
  width: 100%;
  padding: 1rem;
  padding-top: 2rem;
`;



const Frame = styled.div`
  padding: 10px;
  width: 200px;
  height: 150px;
  position: absolute;
  top: 30%;
  left: 0%;
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

const Outer = styled.div`
  display: inline-block;
  width: 200px;
  height: 200px;
  position: relative;
  z-index: 1
`;

const Blackboard = styled.img`
  position: absolute;
  top: 75%;
  left: 82%;
  width: 100px;
  height: 100px;
`;

const Chork = styled.img`
  position: absolute;
  top: 85%;
  left: 30%;
  width: 750px;
  height: 50px;
  z-index: 2;
`;

const Desk = styled.div`
  width: 70%;
  height: 50px;
  background-color: #964b00;
  position: absolute;
  top: 90.5%;
  color: white;
  border-radius: 2px;
  font-size: 20px;
  padding: 1rem;
  padding-top: 9px;
  text-align: center;
  z-index: 2;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ open }) => (open ? "block" : "none")};
  z-index: 9999;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 390px;
  height: 200px;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 15px;
  background: linear-gradient(
    160deg,
    rgba(255, 252, 199, 1) 0%,
    rgba(255, 232, 102, 1) 100%
  );
  display: flex; /* Flexbox 설정 */
  flex-direction: column; /* Vertical
  justify-content: center; /* 가로 가운데 정렬 */
  align-items: center;
  text-align: center;
`;

const CuteButton = styled.button`
background: rgb(255, 252, 199);
font-weight: bold;
border: 2px solid rgba(255, 184, 36, 1);
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  margin: 10px;
  width: 90px;
  height: 45px;
   &:hover,
  &:focus {
    background-color: #4caf50; // 마우스를 올렸을 때 배경 색 변경
    color: #ffffff; // 마우스를 올렸을 때 글자 색 변경
  }
`;


//이미지 렌덤한 각으로 돌려서 출력
const Images = ({ image, setSelectedImage, setIsModalOpen }) => {
  const selectThumbnail = () => {
    setIsModalOpen(true);
    setSelectedImage(image.meetingImageId);
  };

  return (
    <Outer>
      <Frame
        style={{
          transform: `rotate(${getRandomRotation()}deg)`,
          transformOrigin: "right top",
        }}
        onClick={() => {
          selectThumbnail();
        }}
        >
        <Image src={image.meetingImagePath} />
      </Frame>
    </Outer>
  );
};

const Picture = () => {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  //부모에게서 전달받은 값
  const location = useLocation();
  const state = { ...location.state };
  const urlInfo = getEnv("API_URL");
  const navigate = useNavigate()

  // console.log("Picture")
  // console.log(state.meetingId);

  //이미지 데이터 가져오기
  useEffect(() => {
    axios
      .get(`${urlInfo}/meetingImage/${state.meetingId}`)
      .then((res) => {
        // console.log(res)

        const image = [];

        res.data.map((meetingImage, index) => {
          image.push(meetingImage);
        });

        setImages(image);
      })
      .catch((error) => {})
      .then(() => {});
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const changeThumbnail = () => {
    // console.log(selectedImage)
    axios
      .put(`${urlInfo}/meetingImage/changeThumbnailImage`, {
        meetingImageId: selectedImage,
      })
      .then((res) => {})
      .catch((err) => {});
  };

  // console.log(images.length);
  return (
    <div style={{
      overflowY: 'auto',
      flex: 1,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      }}>
      <img src='./close_button.png' style={{position: 'absolute', marginLeft: '860px', top: '18%', height: '50px', cursor: 'pointer'}} onClick={() => navigate(-1)}/>
      {images.length > 0 &&
        images.map((element) => (
          <Images
            key={element.meetingImageId}
            image={element}
            setSelectedImage={setSelectedImage}
            setIsModalOpen={setIsModalOpen}
          />
        ))}
      {images.length == 0 && (
        <div
          style={{
            height: "600px",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ color: "white", marginLeft: "2rem", fontSize: "30px" }}>
            같이 찍은 사진이 없어요
          </div>
          <img
            src={NoPicture}
            style={{ height: "400px", width: "350px" }}
          />
        </div>
      )}

      <Blackboard src={BlackboardIcon}/>
      <Desk style={{left: '28.16%'}}>사진을 선택하면 썸네일을 선택할 수 있어요 🙂</Desk>
      <Chork src={ChorkIcon} />

      {/* 썸네일 설정 확인 모달 */}
      <ModalOverlay open={isModalOpen} onClick={closeModal}>
        <ModalContent>
          <div style={{marginTop: '2rem'}}>
          <h4>해당 사진을 대표사진으로 설정할까요?</h4>
          </div>
          <div>
          <CuteButton onClick={closeModal}  style={{marginTop: '1.5rem'}}>돌아가기</CuteButton>
          <CuteButton onClick={changeThumbnail}  style={{marginTop: '1.5rem'}}>설정하기</CuteButton>
          </div>
        </ModalContent>
      </ModalOverlay>
    </div>
  );
};

export default Picture;
