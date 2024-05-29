import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { format, addMonths, subMonths } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, parse } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ReactModal from "react-modal";
import MeetingModal from "./MeetingModal";
import {dateToNumber} from "./DateTranslation";

import styled from "styled-components";
// import CommonSidePanel from '../../components/side_panels/CommonSidePanel';
import NormalNav from '../../navs/NormalNav';
import PostIt from '../../volunteer/post_it/PostIt';
import SelectedPostit from '../../volunteer/post_it/SelectedPostit';
import Modal from 'react-modal';
import { current } from '@reduxjs/toolkit';
import getEnv from "../../../utils/getEnv";
import { createMeetingSession, getMeetingList } from "./Axioses";

import NextIcon from "../../../images/next_button.png"
import Album from "../../../images/pictures.png"
import MeetingOpenIcon from "../../../images/vol_chat_door.png"


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
  justify-content: center;
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
  border: 2px solid black;
  &:hover {
    background-color: #ffd703};
`;

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className="header row" style={{ marginBottom: '10px'}}>
      <div style={{display:'flex', 
                    flexDirection:'row', 
                    justifyContent: 'space-between', 
                    fontSize:'30px',
                    marginBottom: '10px'
                    }}>
        <div>
          <img
            style={{ width: "30px" , transform: "scaleX(-1)"}}
            src={NextIcon}
            alt=""
            onClick={prevMonth}
          />
        </div>
        <div>
          <div className="col col-start">
            <span className="text">
              <span className="text month">{format(currentMonth, "yyyy")}년 {format(currentMonth, "M")}월</span>
              
            </span>
          </div>
        </div>
        <div>
          <img
            style={{ width: "30px" }}
            src={NextIcon}
            alt=""
            onClick={nextMonth}
          />
        </div>
      </div>
    </div>
  );
};


const RenderDays = () => {
  const days = [];
  const date = [
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
    "일요일",
  ];
  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col" key={i} style={{ marginLeft:'0.1rem', marginRight: '0.1rem'}}>
        {date[i]}
      </div>
    );
  }
  return <div className="days row" style={{ marginLeft:'1px'}}>{days}</div>;
};


const GetMeeting = (meetings, cloneDay, currentMonth) => {
  let meeting = "";
  meetings.forEach((m) => {
    if (cloneDay.getDate() == m.day) {
      meeting = m;
    }
  });
  return meeting;
};


const RenderCells = ({ currentMonth, selectedDate, onDateClick, meetings, childInfo, setMeetings }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

    //해당 아동의 미팅 정보 불러오기
  // useEffect(() => {
  //   getMeetingList(childInfo.relationId, 
  //                 currentMonth.getFullYear(), 
  //                 currentMonth.getMonth()+1, 
  //                 setMeetings)
  // }, [childInfo, currentMonth]);
  // console.log("RenderCell")
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = addDays(day, 1);
      formattedDate = format(cloneDay, "d");
      //해당 날짜에 미팅이 있으면 담기
      const meeting = GetMeeting(meetings, cloneDay);
      
      days.push(
        <div
          className={`col cell ${
            !isSameMonth(cloneDay, monthStart)
              ? "disabled"
              : isSameDay(cloneDay, selectedDate)
                ? "selected"
                : format(currentMonth, "M") !== format(cloneDay, "M")
                  ? "not-valid"
                  : "valid"
          }`}
          key={cloneDay}
          onClick={() => onDateClick(cloneDay, meeting)}
        >
          <span
            className={
              format(currentMonth, "M") !== format(cloneDay, "M")
                ? "text not-valid"
                : ""
            }
          >
            {formattedDate}
          </span>
          <Meeting
            meeting={meeting}
            currentMonth={currentMonth}
            cloneDay={cloneDay}
            childInfo={childInfo}
          />
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
};

//달력 칸에 썸네일 출력하기
const Meeting = ({ meeting, currentMonth, cloneDay, childInfo }) => {
  // console.log(meeting);
  // console.log(currentMonth);
  // console.log(cloneDay);
  if (meeting && currentMonth.getMonth() == cloneDay.getMonth()) {

    let thumbnail = ""
    let printTime = ""
    let lastPic = ""
    
    // console.log(childInfo)
    if(meeting.status == "SCHEDULED"){//예정이라면 프로필 사진과 시간  
      thumbnail = childInfo.childProfileImagePath
      printTime = childInfo.childName + " " + meeting.time.substring(0, 2) + " : " + meeting.time.substring(3, 5)
    }
    else if(meeting.status == "OPENED"){//열렸다면 환영하는 문구와 프로필 사진
        thumbnail = MeetingOpenIcon
        printTime = "어서와!"
    }
    else if(meeting.status == "CLOSED"){//지난거라면 썸네일
        lastPic = meeting.thumbnailImgPath != "defaultThumbnailImgPath" 
                         ? meeting.thumbnailImgPath : Album
    }

    return (
      <div style={{alignSelf: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {thumbnail?
          <>
            {meeting.status == "SCHEDULED"?
              <img 
                  src={thumbnail}
                  alt=""  
                  style={{ width: '50%', opacity: 1, borderRadius: '100%'}}
              />
              :
              <img 
                  src={thumbnail}
                  alt=""  
                  style={{ width: '50%', opacity: 1, borderRadius: '.2rem'}}
              />
            }
          </>  
        :
            <img 
                src={lastPic}
                alt=""  
                style={{ width: '90%', opacity: 1, borderRadius: '.2rem'}}
            />
        }
        <div style={{fontSize: '0.95rem', fontWeight: 'bold'}}>
            {printTime}
        </div>
      </div>
    )
}
};
const VolunteerCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setModalOpen] = useState(false); // 모달창을 제어하는 state
  const [isMeetingCreateModalOpen, setMeetingCreateModalOpen] = useState(false)

  const [meetings, setMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState('')
  
  const navigate = useNavigate();
  const currentDate = new Date();
  const childInfo = useSelector((state) => state.child.value)
  const urlInfo = getEnv('API_URL');

  //해당 아동의 미팅 정보 불러오기
  useEffect(() => {
    getMeetingList(childInfo.relationId, 
                  currentMonth.getFullYear(), 
                  currentMonth.getMonth()+1, 
                  setMeetings)

    // console.log("axios")
  }, [childInfo, currentMonth]);

  const prevMonth = () => {
    // console.log("prevMonth")
    setMeetings([])
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setMeetings([])
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const onDateClick = (day, meeting) => {

    setSelectedDate(day);
    setSelectedMeeting(meeting)

    //지난날 + meeting존재 -> picture
    //지난날 + meeting없음 -> 무응답
    //오늘 + meeting존재 + SHEDULED -> 화상 채팅방 생성하기
    //오늘 + meeting존재 + OPENED -> 화상 채팅방 입장하기
    //오늘 + meeting없음 -> 채팅 생성
    //이후 + meeting존재-> 하루 1개만 생성 가능
    //이후 + meeting없음 -> 생성

    const selectDate = dateToNumber(day)

    const current = dateToNumber(currentDate)

    //미팅 생성
    if (!meeting && (selectDate == current || selectDate > current)) {
      setModalOpen(true);
    }

    //화상 채팅 입장
    else if (selectDate == current && meeting.status !== "CLOSED") {
      if(meeting.status == "OPENED"){
        // console.log("세션입장");
        navigate(`/volunteer_video_chatting/${meeting.meetingId}`);
      }
      else if(meeting.status == "SCHEDULED"){
        // console.log("세션 생성하기")
        setMeetingCreateModalOpen(true);
      }
    }
    //사진 기록들 보기
    else if (selectDate <= current && meeting) {
      navigate("/volunteer_ChoosePicturePage", {
        state: {
          //날짜가 아닌 meetingId로 사진 불러오기
          meetingId: `${meeting.meetingId}`,
        },
      });
    }
    //하루에 한개의 미팅만 생성가능
    else if (selectDate > current) {
      console.log("1개만 생성할 수 있습니다");
    }
  };

  const closeModal = () => {
    // 모달을 닫을 때 호출되는 함수
    setMeetingCreateModalOpen(false);
  };

  const openMeeting = () => {
    createMeetingSession(
      selectedMeeting.meetingId, 
      childInfo.relationId,
      currentMonth,
      setMeetings
    )
  }

  return (
    <div className="calendar">
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        child={childInfo}
      />
      <RenderDays />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
        meetings={meetings}
        childInfo={childInfo}
        setMeetings={setMeetings}
      />
      {isModalOpen && (
        <MeetingModal
          setModalOpen={setModalOpen}
          isModalOpen={isModalOpen}
          selectedDate={selectedDate}
          setMeetings={setMeetings}
          currentMonth={currentMonth}
        />
      )}

      {isMeetingCreateModalOpen && (
        <ModalOverlay open={isMeetingCreateModalOpen} onClick={closeModal}>
        <ModalContent>
          <h3 style={{paddingBottom: '1rem'}}>미팅 세션을 오픈할까요?</h3>
          <div style={{display: 'flex'}}>
            <CuteButton onClick={closeModal}>취소하기</CuteButton>
            <CuteButton onClick={openMeeting}>생성하기</CuteButton>
          </div>
        </ModalContent>
      </ModalOverlay>
      )}

    </div>
  );
};
export default VolunteerCalendar;