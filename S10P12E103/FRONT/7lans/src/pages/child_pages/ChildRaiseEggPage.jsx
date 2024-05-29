import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ChildCommonSidePanel from "../../components/side_panels/ChildCommonSidePanel";
import NormalNav from "../../components/navs/NormalNav";
import EggFirst from "../../components/volunteer/eggs/EggsFirst";
import WhisperLetter from "../../components/volunteer/whisper/WhisperLetter";
import styled from "styled-components";
import axios from "axios";
import { tr } from "date-fns/locale";
import getEnv from "../../utils/getEnv";
import { Button, Modal, Form, Image } from "react-bootstrap";
import Audio from "../../components/Audio"
import ChildPostit from "../../components/volunteer/post_it/ChildPostit";
import SelectedChildPostit from "../../components/volunteer/post_it/SelectedChildPostit";
import Correct from "../../components/dinosaur/Correct";

import EggImg1 from "../../images/dino_egg.png"
import EggImg2 from "../../images/dino_egg2.png"
import { Tooltip } from "react-tooltip";

const RightSide = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 0 20px 20px 0;
  background-color: rgb(255, 255, 255, 0.9);
  background-image: ${({ eggRaised }) =>
    eggRaised
      ? "url('./egg_raise_background.png')"
      : "url('./default_background.png')"};
  background-repeat: no-repeat;
`;

const RowBox1 = styled.div`
  width: 90%;
  height: 5%;
  font-size: 30px;
  font-weight: bold;
  margin-top: 3%;
`;

const RowBox2 = styled.div`
  width: 90%;
  height: 20%;
  font-size: 30px;
  font-weight: bold;
  margin-top: 3%;
`;

const RowBox3 = styled.div`
  width: 90%;
  height: 50%;
  font-size: 20px;
  display: flex;
  align-items: end;
`
const ExpBar = styled.div`
  width: 100%;
  height: 40px;
  background-color: rgb(255, 183, 58, 0.5);
  border-radius: 10px;
  margin-top: 10px;
  border: 3px solid rgba(45,45,45);
`;

const FilledExp = styled.div`
  height: 100%;
  border-radius: 9px;
  background-color: rgb(255, 183, 58, 0.8); /* 채우진 부분의 색상 */
`;

const StyledModal = styled(Modal)`
display: flex;
align-items: center;
justify-content: center;
background-color: rgb(255,255,255, 0.7);
`;
const StyledHeader = styled(Modal.Header)`
  background-color: rgb(208, 192, 237, 0.9); /* 모달 헤더 배경색 설정 */
  border-radius: 8px 8px 0px 0px;
`;
const StyledFooter = styled(Modal.Footer)`
  background-color: rgb(208, 192, 237, 0.9); /* 모달 푸터 배경색 설정 */
  border-radius: 0px 0px 8px 8px;
  flex-direction: column-reverse
`;
const StyledBody = styled(Modal.Body)`
  display: flex;
  justify-content: center; 
  align-items: center;
`
const StyledButton = styled.button`
background: rgb(232, 225, 255);
font-size: 18px;
font-weight: bold;
border: none;
border-radius: 15px;
height: 50px;
width: 130px;
// margin-left: 8%;
color: rgb(45, 45, 45);
&:hover {
  background-color: rgb(232, 225, 250);}
`;

const TextandimageBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 400px;
`

const ChildRaiseEggPage = () => {
  const volInfo = useSelector((state) => state.vol.value)
  const volsInfo = useSelector((state) => state.vols.value)
  const userDion = useSelector((state) => state.dino.value)
  const userInfo = useSelector((state) => state.user.value)
  const urlInfo = getEnv('API_URL');
  const [eggInfo, setEggInfo] = useState(null)
  const [show, setShow] = useState(false)
  const [newEgg, setNewEgg] = useState(null)
  const [dinoState, setdinoState] = useState(false) //기본 상태, true == 행복한 상태 출력
  // const eggInfo = useRef(null)

  useEffect(() => {
    const egg = async () => {
      if(volInfo.relationId){
        try {
          const res = await axios.get(`${urlInfo}/egg/${volInfo.relationId}`);
          // console.log(res.data);
          // eggInfo.current = res.data
          setEggInfo(res.data);
        } catch (err) {
          console.error(err);
        }
      }
    }
    egg()
  }, [volInfo])
  
  const renderModal = () => {
    if (eggInfo?.experience !== 100) {
      //경험치가 100이 아닌 경우
      return (
        <StyledModal show={show} onHide={() => setShow(false)} centered>
          <StyledHeader closeButton>
            <Modal.Title>아직 경험치가 {eggInfo?.experience || 0} % 에요.</Modal.Title>
          </StyledHeader>
          <StyledBody>
            <Form>
              <Image
                type="image"
                src={`${getEnv("PUBLIC_URL")}/dinosourImage/dinosaur${userDion}_sad.png`}
                style={{height: '300px', width: '200px'}}
              />
            </Form>
          </StyledBody>
          <StyledFooter style={{justifyContent: 'space-between'}}>
            <StyledButton variant="secondary" onClick={() => setShow(false)}>
              확인
            </StyledButton>
            {/* <Button variant='primary' onClick={handleSubmit}>
              생성
            </Button> */}
          </StyledFooter>
        </StyledModal>
      )
    }
    else if (eggInfo?.volunteerCheck === false && eggInfo?.childCheck === true) {
      //선생님이 알을 안깐 경우
      return (
        <StyledModal show={show} onHide={() => setShow(false)} centered>
          <StyledHeader closeButton>
            <Modal.Title>{volInfo.volunteerName} 선생님이 아직 알을 열어보지 않았어요.</Modal.Title>
          </StyledHeader>
          <StyledBody>
            <Form>
              <Image
                type="image"
                src={`${getEnv("PUBLIC_URL")}/dinosourImage/dinosaur${userDion}_sad.png`}
                style={{height: '300px', width: '200px'}}
              />
            </Form>
          </StyledBody>
          <StyledFooter style={{justifyContent: 'space-between'}}>
            <StyledButton variant="secondary" onClick={() => setShow(false)}>
              확인
            </StyledButton>
            {/* <Button variant='primary' onClick={handleSubmit}>
              생성
            </Button> */}
          </StyledFooter>
        </StyledModal>
      )
    }
    else {
      return (
        <StyledModal show={show} onHide={() => setShow(false)} centered>
          <StyledHeader closeButton>
            <Modal.Title>나와 함께 하게 된걸 축하해!!!</Modal.Title>
          </StyledHeader>
          <StyledBody>
            <Form>
              <Image
                type="image"
                src={`${getEnv("PUBLIC_URL")}/dinosourImage/dinosaur${newEgg?.id}_basic.png`}
                style={{height: '300px', width: '200px'}}
              />
            </Form>
          </StyledBody>
          <StyledFooter style={{justifyContent: 'space-between'}}>
            <StyledButton variant="secondary" onClick={() => setShow(false)}>
              확인
            </StyledButton>
            {/* <Button variant='primary' onClick={handleSubmit}>
              생성
            </Button> */}
          </StyledFooter>
        </StyledModal>
      )
    }
  } 

  const eggClick = () => {
    setShow(true)
    if (eggInfo?.experience === 100) {
      const eggHatch = async () => {
        try {
          const memberId = userInfo.memberId
          const relationId = volInfo.relationId
          const res = await axios.post(`${urlInfo}/dinosaurs/hatch`, {memberId, relationId})
          // console.log(res.data)
          setNewEgg(res.data)
          setShow(true)
        }
        catch (err) {
          console.error(err)
        }
      }
      eggHatch()
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <NormalNav />
      <div style={{ marginTop: "5.7%" }}></div>
      <div
        style={{
          height: "650px",
          padding: "30px",
          paddingBottom: "20px",
          backgroundColor: "rgb(255, 226, 123)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            borderRadius: "20px",
            backgroundColor: "rgb(255, 226, 123)",
          }}
        >
          <ChildCommonSidePanel />

          <RightSide eggRaised={volInfo}>
            {volInfo?
              <>
                <RowBox2>
                  <p>알에서 뭐가 나올까? 추억을 쌓으면 알이 열려요</p>
                  <div>
                    exp: {eggInfo?.experience || 0} %
                    <ExpBar>
                      <FilledExp
                        style={{ width: `${eggInfo?.experience || 0}%` }}
                      />
                    </ExpBar>
                  </div>
                </RowBox2>
                <RowBox3>
                {eggInfo?.experience < 70? 
                  <img
                    data-tooltip-id="child-egg-tooltip"
                    onClick={eggClick}
                    style={{ width: "140px",height: "150px", cursor: "pointer" }}
                    src={EggImg1}
                    alt=""
                  />
                  :
                  <img
                    data-tooltip-id="child-egg-tooltip"
                    onClick={eggClick}
                    style={{ width: "140px",height: "150px", cursor: "pointer" }}
                    src={EggImg2}
                    alt=""
                  />
                }
                  <Tooltip id="child-egg-tooltip">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span> "exp: 100 %" 가 되면</span>
                      <span>알을 부화시킬 수 있어요.</span>
                    </div>
                  </Tooltip>
                  {!dinoState && (
                  <img
                    style={{ 
                        // transform: "scaleX(-1)", 
                        height: "300px" }}
                    src={`${getEnv("PUBLIC_URL")}/dinosourImage/dinosaur${userDion}_basic.png`}
                    alt=""
                  />
                  )}
                  {dinoState && (
                  <img
                    style={{ 
                        // transform: "scaleX(-1)", //사진 좌우반전
                        height: "300px" }}
                    src={`${getEnv("PUBLIC_URL")}/dinosourImage/dinosaur${userDion}_happy.png`}
                    alt=""
                  />
                  )}
                {/* <div>여기 말하는 톰!</div> */}
                <Audio
                  dinoState={dinoState}
                  setdinoState={setdinoState}
                />
                </RowBox3>
              </>
              :
              <TextandimageBox>
                <h1>
                  함께할 선생님을 선택해주세요
                </h1>
                <Correct/>
              </TextandimageBox>
            }
          </RightSide>

          <div style={{ width: "10%", backgroundColor: "rgb(255, 226, 123)" }}>
            <ChildPostit message={"/child_video_chatting_start"} />
            <ChildPostit message={"/child_whispher"} />
            <SelectedChildPostit message={"/child_raise_egg"} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            right: "2%",
            top: "10rem",
          }}
        ></div>
      </div>
      {renderModal()}
    </div>
  );
};

export default ChildRaiseEggPage;
