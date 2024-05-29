import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import NormalNav from "../components/navs/NormalNav";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { changeDino } from "../store/dinoSlice";
import { Button, Modal, Form } from "react-bootstrap";
import getEnv from "../utils/getEnv";
import ChildDinosaurSidePanel from "../components/side_panels/ChildDinosaurSidePanel";

const ChildDinosaurDictPage = () => {
  const userDino = useSelector((state) => state.dino.value);
  const [userDinosaurList, setUserDinosaurList] = useState("");
  const userInfo = useSelector((state) => state.user.value);
  const [chooseDino, setChooseDino] = useState(userDino);
  const [hasDino, setHasDino] = useState("");
  const [show, setShow] = useState(false);

  const urlInfo = getEnv('API_URL');
  const dispatch = useDispatch();

  useEffect(() => {
    const userDinosaursList = async () => {
      try {
        const res = await axios.get(
          `https://i10e103.p.ssafy.io/api/v1/dinosaurs/${userInfo.memberId}`
        );
        const userDinosaurInfo = res.data.dinosaurs;
        const ownedDinosaurs = userDinosaurInfo.filter(
          (dino) => dino.owned === true
        );
        setHasDino(ownedDinosaurs);
        const temp = [];
        for (let i = 0; i < ownedDinosaurs.length; i++) {
          temp.push(ownedDinosaurs[i].id);
        }
        setUserDinosaurList([...temp]);
      } catch (err) {
        console.error(err);
      }
    };

    userDinosaursList();
  }, [userInfo.memberId]);

  const Text = styled.p`
    font-size: 16px;
    margin: 0;
    margin-bottom: 0.3rem;
  `;
  const renderChooseDino = (i) => {
    if (hasDino.length > 0) {
      const renderDino = hasDino.filter((dino) => dino.id === i);
      return (
        <div>
          <p
            style={{
              fontSize: "20px",
              fontStyle: "bold",
              fontWeight: "bold",
              margin: "0",
            }}
          >
            No.{renderDino[0].id} {renderDino[0].name}
          </p>
          <hr style={{ margin: "0", marginBottom: "0.6rem" }} />
          <Text>
            몸무게: {renderDino[0].weight / 100}kg 키:{" "}
            {renderDino[0].height / 1000}m
          </Text>
          <p
            style={{
              background: "rgba(196, 163, 255, 1)",
              borderRadius: "3px",
              padding: "3px",
            }}
          >
            {renderDino[0].description}
          </p>
        </div>
      );
    }
  };

  const changeMyDino = async (memberId, dinosaurId) => {
    try {
      const res = await axios.put(
        `https://i10e103.p.ssafy.io/api/v1/dinosaurs/change`,
        {
          memberId,
          dinosaurId,
        }
      );
      // console.log(res);
      representDino(memberId);
      setShow(!show);
    } catch (err) {
      console.error(err);
    }
  };

  const representDino = async (id) => {
    try {
      const res = await axios.get(
        `https://i10e103.p.ssafy.io/api/v1/dinosaurs/myDinosaur/${id}`
      );
      dispatch(changeDino(res.data.id));
      // console.log(res.data.id);
    } catch (err) {
      console.error(err);
    }
  };

  const Dino = styled.div`
    display: flex;
    flex: 1;
    height: 500px;
    margin: 2rem;
    border: 3.2px solid black;
    border-radius: 20px;
  `;

  const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 65%;
    height: 100%;
    background-color: rgb(232, 225, 255);
    border-radius: 18px 0 0 18px;
  `;

  const LeftTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1.3rem;
    gap: 1rem;
  `;

  const LeftMiddle = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
  `;

  const List = styled.span`
    border: 3.2px solid black;
    border-left: none;
    width: 8rem;
    padding: 0.5rem 0;
    border-radius: 0 20px 20px 0;
    text-align: center;
    font-size: 25px;
    background-color: rgb(208, 192, 237);
    color: white;
    font-weight: bolder;
  `;

  const Line = styled.div`
    border: 2px solid black;
    width: 100%;
  `;

  const FlexContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  `;

  const DinosaurImage = styled.img`
    width: 100px;
    margin: 30px;
    cursor: ${({ isClickable }) => (isClickable ? "pointer" : "default")};
  `;

  const RightSide = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    border-left: 3.4px solid black;
    border-radius: 0 18px 18px 0;
    background-color: rgb(208, 192, 237);
  `;

  const Detail = styled.div`
    width: 85%;
    border-radius: 15px;
    padding: 1rem;
    padding-bottom: 0;
    margin-bottom: 1rem;
    background: rgb(255, 255, 255, 50%);
  `;

  const Button = styled.button`
    background: rgb(232, 225, 255);
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 15px;
    height: 50px;
    width: 130px;
    // margin-left: 8%;
    color: rgb(45, 45, 45);
    &:hover{
       background:rgba(196, 163, 255, 0.7);
       border: rgba(196, 163, 255, 1);
       color: white;
    }
  `;
  const renderBody = () => {
    const dinoArr = Array.from({ length: 18 }, (_, index) => index + 1);

    return (
      <Dino>
        <StyledContainer>
          <LeftTop>
            <h2>[ 공룡도감 ]</h2>
            <h4>발견한 공룡 수 : {hasDino.length}</h4>
          </LeftTop>
          <LeftMiddle>
            <List>목록</List>
            <Line></Line>
          </LeftMiddle>
          <FlexContainer>
            {dinoArr.map((num, index) => (
              <DinosaurImage
                key={index}
                isClickable={userDinosaurList.includes(num)}
                onClick={() =>
                  userDinosaurList.includes(num) && setChooseDino(num)
                }
                src={
                  userDinosaurList.includes(num)
                    ? `${getEnv("PUBLIC_URL")}/dinosourImage/dinosaur${num}_basic.png`
                    : `${getEnv("PUBLIC_URL")}/dinosourImage/dinosaur${num}_sihouette.png`
                }
                alt="공룡 이미지들"
              />
            ))}
          </FlexContainer>
        </StyledContainer>
        <RightSide>
          <img
            style={{ width: '200px', height:'260px'}}
            src={`${getEnv("PUBLIC_URL")}/dinosourImage/dinosaur${chooseDino}_basic.png`}
            alt=""
          />
          <Detail>{renderChooseDino(chooseDino)}</Detail>
          <Button onClick={() => setShow(!show)}>함께하기</Button>
        </RightSide>
      </Dino>
    );
  };

  const CenteredModal = styled(Modal)`
    background: rgb(255, 255, 255, 50%);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const CenteredForm = styled(Form)`
display: flex;
justify-content: center;
align-items: center;
`;

const CenteredImage = styled(Form.Control)`
height: 350px;
width: 290px;
display: flex;
justify-content: center;
align-items: center;
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
`;
  //  최종 화면 구성
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
          margin: "0",
        }}
      >
        <NormalNav />
        <div
          style={{
            flex: 1,
            marginTop: '100px',
            padding: "20px",
            backgroundColor: "rgb(255, 226, 123)",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "100%",
              borderRadius: "20px",
              backgroundColor: "rgb(255, 255, 255)",
            }}
          >
            <ChildDinosaurSidePanel />
            {renderBody()}
          </div>
        </div>
      </div>
  
      <StyledModal show={show} centered onClick={() => setShow(false)}>
        <StyledHeader closeButton>
          <Modal.Title>나와 함께 할래?</Modal.Title>
        </StyledHeader>
        <Modal.Body>
          <CenteredForm>
            <CenteredImage
              type="image"
              src={`${getEnv("PUBLIC_URL")}/dinosourImage/dinosaur${chooseDino}_basic.png`}
            />
          </CenteredForm>
        </Modal.Body>
        <StyledFooter style={{justifyContent: 'space-between'}}>
          <Button
            variant="secondary"
            onClick={() => changeMyDino(userInfo.memberId, chooseDino)}
          >
            함께하기
          </Button>
          <Button variant="secondary" onClick={() => setShow(false)}>
            취소
          </Button>
          {/* <Button variant='primary' onClick={handleSubmit}>
            생성
          </Button> */}
        </StyledFooter>
      </StyledModal>
    </>
  );
};

export default ChildDinosaurDictPage;
