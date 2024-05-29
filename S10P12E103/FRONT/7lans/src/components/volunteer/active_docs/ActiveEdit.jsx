import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "regenerator-runtime";
import speech, { useSpeechRecognition } from "react-speech-recognition";
import getEnv from "../../../utils/getEnv";

import CloseIcon from "../../../images/close_button.png"
import MicIcon from "../../../images/activity_log/mic.png"
import ModifyIcon from "../../../images/activity_log/modify.png"
import SubmitIcon from "../../../images/activity_log/submit.png"

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: ${({ open }) => (open ? "block" : "none")};
`;

const ModalOverlaySpeek = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  font-size: 20px;
  width: 100%;
  height: 100%;  
  background: rgba(0, 0, 0, 0.3);
  display: ${({ open }) => (open ? "block" : "none")};
`;

const ModalContent = styled.div`
  position: fixed;
  top: 30%;
  left: 45%;
  width: 620px;
  height: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  border: solid;
  background: linear-gradient(
    160deg,
    rgba(255, 252, 199, 1) 0%,
    rgba(255, 232, 102, 1) 100%
  );
`;

const CompleteContent = styled.div`
  position: fixed;
  top: 65%;
  left: 67%;
  width: 300px;
  height: 130px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  justify-content: center;
  border: solid;
  font-size: 20px;
  background: linear-gradient(
    160deg,
    rgba(255, 252, 199, 1) 0%,
    rgba(255, 232, 102, 1) 100%
  );
`;

const SubmitContent = styled.div`
  position: fixed;
  top: 60%;
  left: 70%;
  width: 320px;
  height: 170px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  justify-content: center;
  border: solid;
  font-size: 20px;
  background: linear-gradient(
    160deg,
    rgba(255, 252, 199, 1) 0%,
    rgba(255, 232, 102, 1) 100%
  );
`;

const ButtonStyle = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 15px;
  padding: 10px;
  font-size: 20px;
  color: black;
  cursor: pointer;
  margin-top: 5px;
  margin-left: 5px;
 
`;

const ModalButton = styled.button`
  background: rgb(255, 184, 36);
  font-size: 17px;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  height: 40px;
  width: 100px;
  margin-left: 16px;
  text-decoration-line: none;
  position: relative;
  &:hover {
    background-color: rgb(0, 164, 25);
`;


const ButtonWithMargin = styled(ButtonStyle)`
  margin-right: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const CloseButton = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  cursor: pointer;
  left: 94%;
  top: 1%
`;

const InputRow = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
`;

const TextArea = styled.textarea`
  width: 95%;
  height: 60%;
  background-color: #ffedaa;
  border: none;
  outline: none;
  resize: none;
  border-radius: 3px;
  font-size: 20px;
  padding: 1rem;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 86%;
  left: 57%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2%;
`;

const BasicText = styled.input.attrs({ readOnly: true })`
  background-color: #ffedaa;
  border: none;
  outline: none;
  text-align: center;
  width: 35%;
  font-weight: bold;
  border-radius: 3px;
`;

const ButtonImg = styled.img`
  width: 30px;
  padding-right: 5px;
`;

const ActiveEdit = ({ activityLog, content, setContent, activityTime }) => {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isModalOpenSpeak, setIsModalOpenSpeak] = useState(false);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [isRecordStart, setIsRecordStart] = useState(false);

  const childInfo = useSelector((state) => state.child.value);
  const urlInfo = getEnv("API_URL");
  const userInfo = useSelector((state) => state.user.value);

  //모달 관련 함수
  const handleSpeek = () => {
    setIsModalOpenSpeak(true);
  };

  const closeModalSpeek = () => {
    setIsModalOpenSpeak(false);
  };

  const handleSubmission = () => {
    setIsSubmitModalOpen(true);
  };

  const closeModal = () => {
    setIsSubmitModalOpen(false);
  };

  const closeChangeModal = () => {
    setIsChangeModalOpen(false);
  };

  //수정하기
  const changeContent = async () => {
    // console.log(content)
    axios.put(`${urlInfo}/activityLog/volunteer/modify`, {
      volunteerId: userInfo.memberId,
      relationId: childInfo.relationId,
      activityLogId: activityLog.activityLogId,
      content: content,
    });

    //수정 후 modal 띄우기
    setIsChangeModalOpen(true);
  };

  //제출하기
  const submit = async () => {
    await axios.put(`${urlInfo}/activityLog/volunteer/writeDone`, {
      volunteerId: userInfo.memberId,
      relationId: childInfo.relationId,
      activityLogId: activityLog.activityLogId,
      content: content,
    });

    navigate(-1);
  };

  //녹음 받아쓰기 함수
  const { listening, transcript } = useSpeechRecognition();

  //녹음 시작하기
  const recordStart = () => {
    setIsRecordStart(true);
  };

  //녹음 음성 추가
  const addRecord = (transcript) => {
    // console.log(content + " " + transcript);
    setContent(content + " " + transcript);
    setIsModalOpenSpeak(false);
  };

  //입력한 content값 바로 받기
  function onChange(e) {
    setContent(e.target.value);
  }

  const navigate = useNavigate();

  return (
    <Container>
      <CloseButton
        src={CloseIcon}
        onClick={() => {
          navigate(-1);
        }}
      />
      {!activityLog.writeDoneStatus && (
        <ButtonContainer>
          <ButtonWithMargin onClick={handleSpeek}>
            <ButtonImg src={MicIcon} />
            녹음하기
          </ButtonWithMargin>

          <ButtonWithMargin onClick={changeContent}>
            <ButtonImg src={ModifyIcon} />
            수정완료
          </ButtonWithMargin>
          <ButtonStyle onClick={handleSubmission}>
            <ButtonImg src={SubmitIcon} />
            제출하기
          </ButtonStyle>
        </ButtonContainer>
      )}
      <div style={{ height: '50px', fontSize: '30px', marginTop: '15px'}}> {'< '}{childInfo.childName} 학생과의 활동일지 {' >'} </div>
      <div style={{ width: "95%" }}>
        <InputRow>
          <h4 style={{ display: "inline" }}>활동 일자: </h4>
          <BasicText type="date" value={activityLog.dateInfo} />
          <h4 style={{ display: "inline" }}>활동 시간: </h4>
          <BasicText
            type="text"
            value={activityTime}
            style={{ marginLeft: "15px" }}
          />
        </InputRow>

        <InputRow>
          <h4 style={{ display: "inline" }}> 활동 기관: </h4>
          <BasicText type="text" value={activityLog.centerName} />
          <h4 style={{ display: "inline" }}>봉사자 성명: </h4>
          <BasicText type="text" value={activityLog.volunteerName} />
        </InputRow>
      </div>
       <div style={{height: '3px'}}></div>
       <h4 style={{ width: "94%", fontWeight: "bold", marginTop: '15px' }}>
        [ 활동 내용 및 의견 ]
      </h4>
      <TextArea
        value={content}
        onChange={onChange}
        readOnly={activityLog.writeDoneStatus}
      />

      {/* 버튼에 대한 모달창들 */}
      <ModalOverlaySpeek open={isModalOpenSpeak}>
        <ModalContent>
          <div>
          <p>활동 내용 및 의견을 말씀하시면 자동으로 작성됩니다.</p>
          </div>
          <div>
          <ModalButton onClick={closeModalSpeek}>취소하기</ModalButton>
          <ModalButton onClick={recordStart}>녹음하기</ModalButton>
          <ModalButton
            onClick={() => {
              addRecord(transcript);
            }}
          >
            추가하기
          </ModalButton>
          </div>
          {isRecordStart && (
            <>
              {listening ? (
                <p style={{marginTop: '10px'}}>
                  음성을 듣고 있습니다. 종료를 원하시면 녹음을 멈추고 추가하기를
                  눌러주세요
                </p>
              ) : (
                <p style={{marginTop: '10px'}}>녹음 후 저장을 위해서는 수정 혹은 제출을 해주세요</p>
              )}
              <ModalButton
                onClick={() => {
                  speech.startListening({ continuous: true, language: "ko" });
                }}
              >
                녹음 시작하기
              </ModalButton>
              <ModalButton
                onClick={() => {
                  speech.stopListening();
                }}
              >
                녹음 멈추기
              </ModalButton>
              {transcript && <div>{transcript}</div>}
            </>
          )}
        </ModalContent>
      </ModalOverlaySpeek>

      <ModalOverlay open={isSubmitModalOpen} onClick={closeModal}>
        <SubmitContent>
          <p>더 이상 수정이 불가합니다.</p>
          <p>제출하시겠습니까?</p>
          <ModalButton onClick={closeModal}>취소하기</ModalButton>
          <ModalButton onClick={submit}>제출하기</ModalButton>
        </SubmitContent>
      </ModalOverlay>

      <ModalOverlay open={isChangeModalOpen} onClick={closeChangeModal}>
        <CompleteContent>
          <p>수정이 완료됐습니다. </p>
          <ModalButton onClick={closeChangeModal}>닫기</ModalButton>
        </CompleteContent>
      </ModalOverlay>
    </Container>
  );
};

export default ActiveEdit;
