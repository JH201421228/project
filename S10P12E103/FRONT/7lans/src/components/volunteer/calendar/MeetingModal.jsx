import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ReactModal from "react-modal";
import getEnv from "../../../utils/getEnv";
import styled from "styled-components";
import { borderRadius, shadows } from "@mui/system";
import { inline } from "@floating-ui/core";
import { dateToString, calTime, dateToHyphen } from "./DateTranslation";
import { getMeetingList } from "./Axioses";

import CloseIcon from "../../../images/close_button.png"

ReactModal.setAppElement("#root");

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ open }) => (open ? "block" : "none")};
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
  font-size: 17px;
  color: black;
  cursor: pointer;
  margin-top: 5px;
  margin-left: 5px;
  background: rgb(255, 184, 36);
  font-size: 17px;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  height: 45px;
  width: 100px;
  margin-left: 16px;
  text-decoration-line: none;
  position: relative;
  &:hover {
    background-color: #ffd703};
`;

const ClockText = styled.div`
  display: flex;
  position: absolute;
  left: 1%;
  top: 36%;
`;

const ClockTextTwo = styled.div`
  display: flex;
  position: absolute;
  left: 1%;
  top: 61%;
`;

const Timediv = styled.div`
  margin-right: 40px;
  margin-left: 40px;
`;

//modal창 시간글자행 출력
const printTime = (time) => {
  //맨 처음 숫자 출력
  const hourBlocks = [];

  if (time == "morning") {
    hourBlocks.push(<Timediv>오전</Timediv>);
  } else if (time == "afternoon") {
    hourBlocks.push(<Timediv>오후</Timediv>);
  }

  for (let hour = 1; hour <= 12; hour += 1) {
    hourBlocks.push(<Timediv>{hour}시</Timediv>);
  }

  return hourBlocks;
};

const resetSelect = (setSelectedTimes) => {
  setSelectedTimes([]);
};

const TimeSelect = ({ selectedTimes, setSelectedTimes }) => {
  // const [selectedTimes, setSelectedTimes] = useState([]);

  const handleTimeClick = (time) => {
    const isSelected = selectedTimes.includes(time);

    if (isSelected) {
      // 이미 선택된 시간이면 해제
      setSelectedTimes((prevSelectedTimes) =>
        prevSelectedTimes.filter((selectedTime) => selectedTime !== time)
      );
    } else {
      // 선택되지 않은 시간이면 추가
      setSelectedTimes((prevSelectedTimes) => [...prevSelectedTimes, time]);
    }
  };

  const rows = [];

  const morningHourBlocks = printTime("morning");

  rows.push(<ClockText>{morningHourBlocks}</ClockText>);

  //시간 선택 block
  for (let hour = 0; hour <= 13; hour += 12) {
    const timeBlocks = [];

    for (let halfHour = 0; halfHour < 24; halfHour++) {
      const time = hour + halfHour * 0.5;

      const blockStyle = {
        border: "1px solid black",
        padding: "20px",
        position: "relative",
        cursor: "pointer",
        backgroundColor: selectedTimes.includes(time)
          ? "#F8B407"
          : "transparent",
        color: selectedTimes.includes(time) ? "#fff" : "#000",
      };

      timeBlocks.push(
        <div
          className="col"
          key={time}
          style={blockStyle}
          onClick={() => handleTimeClick(time)}
        ></div>
      );
    }

    rows.push(
      <div className="row" key={hour}>
        {timeBlocks}
      </div>
    );
  }

  //오후 숫자 입력
  const afternoonHourBlocks = printTime("afternoon");

  rows.push(<ClockTextTwo>{afternoonHourBlocks}</ClockTextTwo>);
  return <div className="body">{rows}</div>;
};

const MeetingModal = ({
  setModalOpen,
  isModalOpen,
  selectedDate,
  setReload,
  reload,
  setMeetings,
  currentMonth,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [isCheckOpen, setIsCheckOpen] = useState(false);
  const [isWarnModal, setIsWarnModal] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const childInfo = useSelector((state) => state.child.value);
  const urlInfo = getEnv("API_URL");

  //미팅 생성하기
  const saveMeeting = (selectedTimes) => {
    //localdateTime => 2024-02-02T
    const day = dateToHyphen(selectedDate);

    //14 -> 14:00:00
    const startTime = calTime(selectedTimes[0]);
    const endTime = calTime(selectedTimes[selectedTimes.length - 1] + 0.5);

    const createStart = day + startTime;
    const createEnd = day + endTime;

    //해당 월의 미팅 목록 생성하기
    axios
      .post(`${urlInfo}/meetingSchedue/create`, {
        relationId: childInfo.relationId,
        scheduledStartTime: createStart,
        scheduledEndTime: createEnd,
      })
      .then((res) => {
        getMeetingList(
          childInfo.relationId,
          currentMonth.getFullYear(),
          currentMonth.getMonth() + 1,
          setMeetings
        );
      })
      .catch((err) => {});

    //창 닫기
    setModalOpen(false);
  };

  //미팅 생성 확인(연속된 시간인지 확인 후 시간 출력)
  const checkMeeting = (selectedTimes, setMeetingCreate) => {
    //시간 순으로 배열
    selectedTimes = selectedTimes.sort((a, b) => a - b);

    //시간이 1개 이상 일 때만
    if (selectedTimes.length >= 1) {
      //연속된 시간인지 확인
      for (let i = 1; i < selectedTimes.length; i++) {
        if (selectedTimes[i] !== selectedTimes[i - 1] + 0.5) {
          //연속된 시간이 아니면 그냥 돌아가기
          setIsWarnModal(true);
          return false;
        }
      }

      //localDateTime => 2024년2월4일
      const day = dateToString(selectedDate);

      //14 -> 14:00:00
      const startTime = calTime(selectedTimes[0]);
      const endTime = calTime(selectedTimes[selectedTimes.length - 1] + 0.5);

      setStart(day + startTime);
      setEnd(day + endTime);

      setIsCheckOpen(true);
    }
  };
  const closeModal = () => {
    setIsCheckOpen(false);
  };

  const closeWarnModal = () => {
    setIsWarnModal(false);
  };

  return (
    <ReactModal
      isOpen={isModalOpen}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.73)",
        },
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "90%",
          height: "60%",
          transform: "translate(-50%, -50%)",
          background: "rgba(122, 80, 0, 0.8)",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "10px",
          border: "3px solid rgb(45,45,45)",
          padding: "20px",
        },
      }}
    >
      <div>
        <div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <h1
                style={{ color: "white", width: "240px", fontWeight: "bolder" }}
              >
                [ 시간 선택 ]
              </h1>
              <img
                src={CloseIcon}
                style={{
                  width: "50px",
                  height: "50px",
                  top: "0",
                  right: "0",
                  position: "absolute",
                  left: "96%",
                }}
                onMouseEnter={(e) => {
                  e.target.style.cursor = "pointer";
                }}
                onClick={() => setModalOpen(false)}
              />
            </div>
            {/* <CuteButton 
              onClick={() => setModalOpen(false)}>
            닫기
            </CuteButton> */}
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                color: "white",
                paddingTop: "1%",
                paddingLeft: "1%",
                fontWeight: "bold",
                width: "230px",
                fontSize: "20px",
              }}
            >
              오늘 날짜: {currentDate.getFullYear()}년{" "}
              {currentDate.getMonth() + 1}월 {currentDate.getDate()}일
            </div>
            <div
              style={{
                color: "white",
                padding: "1%",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              {" "}
              |{" "}
            </div>
            <div
              style={{
                color: "white",
                padding: "1%",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              선택 날짜: {selectedDate.getFullYear()}년{" "}
              {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일
            </div>
            <div
              style={{
                color: "white",
                padding: "1%",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              {" "}
              |{" "}
            </div>
            <div
              style={{
                color: "rgb(120,330,20)",
                padding: "1%",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              ⭐ 연속된 시간을 선택해 주세요 ⭐
            </div>
          </div>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.73)",
              padding: "50px",
              borderRadius: "10px",
              positon: "relative",
              top: "0",
            }}
          >
            <TimeSelect
              selectedTimes={selectedTimes}
              setSelectedTimes={setSelectedTimes}
            ></TimeSelect>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            paddingTop: "2rem",
            gap: "10px",
          }}
        >
          <CuteButton onClick={() => resetSelect(setSelectedTimes)}>
            다시 선택
          </CuteButton>
          <CuteButton onClick={() => checkMeeting(selectedTimes)}>
            저장하기
          </CuteButton>
        </div>
      </div>

      {/* 저장 확인 모달 */}
      <ModalOverlay open={isCheckOpen}>
        <ModalContent>
          <h5 style={{marginTop: '7px'}}>시작 시간 : {start}</h5>
          <h5>종료 시간 : {end}</h5>
          <h4>예약 하시겠습니까?</h4>
<div>
          <CuteButton onClick={closeModal}>취소하기</CuteButton>
          <CuteButton onClick={() => saveMeeting(selectedTimes)}>
            예약하기
          </CuteButton>
          </div>
        </ModalContent>
      </ModalOverlay>

      {/* 연속 시간이 아닐 때 보여주는 모달 */}
      <ModalOverlay open={isWarnModal}>
        <ModalContent>
          <p>연속된 시간을 골라주세요</p>
          <CuteButton onClick={closeWarnModal}>취소하기</CuteButton>
        </ModalContent>
      </ModalOverlay>
    </ReactModal>
  );
};

export default MeetingModal;
