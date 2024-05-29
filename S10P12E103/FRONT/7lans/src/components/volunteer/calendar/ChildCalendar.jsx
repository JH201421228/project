import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import ReactModal from 'react-modal';
import MeetingModal from './MeetingModal';
import styled from 'styled-components';

// import CommonSidePanel from '../../components/side_panels/CommonSidePanel';
import NormalNav from '../../navs/NormalNav';
import PostIt from '../post_it/PostIt';
import SelectedPostit from '../post_it/SelectedPostit';
import Modal from 'react-modal';
import { current } from '@reduxjs/toolkit';
import getEnv from "../../../utils/getEnv";
import { getMeetingList } from './Axioses';

import NextIcon from "../../../images/next_button.png"
import Album from "../../../images/pictures.png"
import MeetingOpenIcon from "../../../images/child_chat_door.png"

ReactModal.setAppElement('#root');


const RenderHeader = ({ currentMonth, prevMonth, nextMonth, volunteer }) => {
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
    const date = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col" key={i}>
                {date[i]}
            </div>,
        );
    }

    return <div className="days row">{days}</div>;
};

const GetMeeting = (meetings, cloneDay, currentMonth) => {

    let meeting = '';

    meetings.forEach(m => {
        if(cloneDay.getDate() == m.day){
            meeting = m;
        }
    })

    return meeting;
    
}


const RenderCells = ({ currentMonth, selectedDate, onDateClick, meetings, volInfo}) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
          const cloneDay = addDays(day, 1);
          formattedDate = format(cloneDay, 'd');
          //해당 날짜에 미팅이 있으면 담기
          const meeting = GetMeeting(meetings, cloneDay);
            
          days.push(
              <div
                  className={`col cell ${
                      !isSameMonth(cloneDay, monthStart)
                          ? 'disabled'
                          : isSameDay(cloneDay, selectedDate)
                          ? 'selected'
                          : format(currentMonth, 'M') !== format(cloneDay, 'M')
                          ? 'not-valid'
                          : 'valid'
                  }`}
                  key={cloneDay}
                  onClick={() => onDateClick(cloneDay, meeting)}
              >
                  <span
                      className={
                          format(currentMonth, 'M') !== format(cloneDay, 'M')
                              ? 'text not-valid'
                              : ''
                      }
                  >
                      {formattedDate}
                  </span>
                  <Meeting 
                    meeting = {meeting}
                    currentMonth = {currentMonth}
                    cloneDay = {cloneDay}
                    volInfo = {volInfo}
                  />
              </div>,
          );


          day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>,
        );
        days = [];
    }
    return <div className="body">{rows}</div>;
};

const Meeting = ({meeting, currentMonth, cloneDay, volInfo}) => {
    // console.log(meeting);
    // console.log(currentMonth.getMonth());
    // console.log(cloneDay);
    if (meeting && currentMonth.getMonth() == cloneDay.getMonth()) {

        let thumbnail = ""
        let printTime = ""
        let lastPic = ""
        
        // console.log(volInfo)
        if(meeting.status == "SCHEDULED"){//예정이라면 사진과 시간
            thumbnail = volInfo.volunteerProfileImagePath
            printTime = volInfo.volunteerName + " " + meeting.time.substring(0, 2) + " : " + meeting.time.substring(3, 5)
        }
        else if(meeting.status == "OPENED"){//열렸다면 환영하는 문구
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
}

const ChildCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [meetings, setMeetings] = useState([]);


    const navigate = useNavigate();
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();

    const volInfo = useSelector((state) => state.vol.value)
    const urlInfo = getEnv('API_URL');

    //해당 아동의 미팅 정보 불러오기
    useEffect(() => {
        getMeetingList(volInfo.relationId, 
            currentMonth.getFullYear(),
            currentMonth.getMonth()+1,
            setMeetings)
    }, [volInfo, currentMonth])


    const prevMonth = () => {
        setMeetings([])
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setMeetings([])
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day, meeting) => {
        // console.log(dayOfMonth)
        // console.log(day,'day')

        setSelectedDate(day);

        //지난날 + meeting존재 -> picture
        //지난날 + meeting없음 -> 무응답
        //오늘 + meeting존재 + OPENED -> 화상 채팅 이동
        //오늘 + meeting존재 + SCHEDULED -> 아직 열리지 않았어요
        //오늘 + meeting존재 + CLOSED -> picture
        //오늘 + meeting없음 -> 무응답
        //이후 + meeting존재-> 무응답
        //이후 + meeting없음 -> 무응답


        const selectDate = day.getDate()
    
        //화상 채팅 입장
        if(meeting && (selectDate == dayOfMonth) && meeting.status != "CLOSED"){
            if(meeting.status == "OPENED"){
                // console.log("세션입장")
                navigate(`/child_video_chatting/${meeting.meetingId}`);
            }
            else if(meeting.status == "SCHEDULED"){
                console.log("아직 세션이 없습니다.")
            }
        }
        //사진 기록들 보기
        else if(selectDate <= dayOfMonth && meeting){
            navigate('/child_choose_picturePage',{
                state: {
                    //날짜가 아닌 meetingId로 사진 불러오기
                    meetingId: `${meeting.meetingId}`
                }
            }); 
        }
    };
    
    
    return (
       
            <div className="calendar">
                <RenderHeader
                    currentMonth={currentMonth}
                    prevMonth={prevMonth}
                    nextMonth={nextMonth}
                    volunteer={volInfo}
                />
                <RenderDays />
                <RenderCells
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    onDateClick={onDateClick}
                    meetings = {meetings}
                    volInfo={volInfo}
                />
            </div>
      
    );
};

export default ChildCalendar;

