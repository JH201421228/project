import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {useNavigate, useLocation} from 'react-router-dom'
import axios from "axios";
import SelectedPostit from "../post_it/SelectedPostit";
import PostIt from "../post_it/PostIt";
import { useSelector } from "react-redux";
import getEnv from "../../../utils/getEnv";
import "regenerator-runtime"
import ActiveEdit from "./ActiveEdit";
import NormalNav from "../../navs/NormalNav";
import CommonSidePanel from "../../side_panels/CommonSidePanel";

const RightSide = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 0 20px 20px 0;
  background-color: rgb(255, 255, 255, 0.9);
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ open }) => (open ? "block" : "none")};
`;

const ModalOverlaySpeek = styled.div`
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
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const CuteButton = styled.button`
  background-color: #ff8c94;
  border: none;
  border-radius: 15px;
  padding: 10px;
  font-size: 14px;
  color: white;
  cursor: pointer;
  margin-top: 5px;
  margin-left: 5px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  position: relative;
  margin-left: 78%;
  margin-top: 10px;
  background-color: #ff8c94;
  border: none;
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 16px;
  color: white;
  cursor: pointer;
`;

const InputRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
  width: 60%;
`;

const TextArea = styled.textarea`
  width: 80%;
  height: 200px;
`;

const ButtonContainer = styled.div`
  /* margin-top: 2%; */
  margin-left: 50%;
  display: flex;
  justify-content: flex-end;
  /* gap: 1px; */
  margin-bottom: 2%;
`;

const CuteButtonWithMargin = styled(CuteButton)`
  margin-right: 10px;
`;

export default function ActiveDocs() {
  const [activityLog, setActivityLog] = useState('')
  const [activityTime, setActivityTime] = useState('')

  const [content, setContent] = useState("")

  const childInfo = useSelector((state) => state.child.value)
  const urlInfo = getEnv('API_URL');
  const userInfo = useSelector((state) => state.user.value)

  //activity log 전달받은 값
  const location = useLocation();
  const state = {...location.state};

  //console.log(childInfo)
  //활동일지 상세 정보 가져오기
  useEffect(() => {
    axios.post(`${urlInfo}/activityLog/volunteer`, {
      relationId: childInfo.relationId,
      activityLogId: state.activityLogId
    })
    .then((res) => {
      // console.log(res.data)
      setActivityLog(res.data)
      
      //content설정
      if(res.data.content == null || res.data.content == ""){
        setContent("활동을 입력해 주세요")
      }
      else{
      setContent(res.data.content)
      }
      
      //time값 설정
      const time = res.data.activityTime + "시간"
                  + " ( " + res.data.activityStartTime.substring(11, 13) + "시"
                  + res.data.activityStartTime.substring(14, 16) +"분"
                  +" ~ " + res.data.activityEndTime.substring(11, 13) + "시"
                  + res.data.activityEndTime.substring(14, 16) + "분" + " ) "
      setActivityTime(time)
      // console.log(time)

    })
    .catch((err) => {
    });
  }, [])
  
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
          <CommonSidePanel />

          <RightSide>
            <ActiveEdit
              activityLog={activityLog}
              content={content}
              setContent={setContent}
              activityTime={activityTime}
            />
          </RightSide>
          <div style={{ width: "10%", backgroundColor: "rgb(255, 226, 123)" }}>
            <PostIt message={"/volunteer_video_chatting_start"} />
            <SelectedPostit message={"/volunteer_active_doc"} />
            <PostIt message={"/volunteer_whispher"} />
            <PostIt message={"/volunteer_raise_egg"} />
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
        >

        </div>
        </div>
        </div>

  );
}
