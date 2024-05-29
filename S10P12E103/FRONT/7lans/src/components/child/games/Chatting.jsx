import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { Flipper, Flipped } from "react-flip-toolkit";
import "./Chatting.css";
import PropTypes from "prop-types";
import { Session, StreamManager } from "openvidu-browser";

import CameraOn from '../../../images/meeting/Camera_on.png';
import CameraOff from '../../../images/meeting/Camera_off.png';
import MicOn from "../../../images/meeting/mic_on.png";
import MicOff from "../../../images/meeting/mic_off.png";

const Mic = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 3px;
`;

const Camera = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 3px;
`;

// Extracted common styles
const commonDivStyles = {
  backgroundColor: "rgb(255, 248, 224)",
  margin: "5px",
  border: "5px solid rgb(45, 45, 45)",
  borderRadius: "20px",
  height: "225px",
  position: "relative"
};

const ChatInput = styled.input`
  width: 95%;
  margin-left: 2.5%;
  margin-top: 1%;
  border-radius: 15px;
  padding: 15px;
  border: 2px solid;
`;

const ChattingBox = styled.div`
  background-color: rgb(255, 248, 224);
  margin: 5px;
  margin-top: 40px;
  border: 5px solid rgb(45, 45, 45);
  border-radius: 20px;
  height: 365px;
  width: 490px;
`;

const Chat = ({
                session,
                renderUserVideoComponent,
                mainStreamManager,
                subscribers,
                toggleMyCamera,
                toggleMyMic,
                isMyCameraOn,
                isMyMicOn,
                isChildCameraOn: isVolunteerCameraOn,
                isChildMicOn: isVolunteerMicOn,
              }) => {
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const dispatch = useDispatch();
  const [chatList, setChatList] = useState([]);

  const chatBoxRef = useRef();

  useEffect(() => {
    // 채팅창이 업데이트 될 때마다 스크롤을 이동
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollIntoView(false);
    }
  }, [chatList, chatInput]);

  const sendMessage = (chatData) => {
    const signalOptions = {
      data: chatData,
      type: "chat",
    };

    session
      .signal(signalOptions)
      .then(() => console.log("Message sent"))
      .catch((err) => console.log(err));
  };

  const handleChatSubmission = (event) => {
    if (event.key === "Enter" && chatInput.trim() !== "") {
      const userName = JSON.parse(
        mainStreamManager.stream.connection.data
      ).clientData;
      const data = {
        message: chatInput,
        writer: userName,
      };
      sendMessage(JSON.stringify(data));
      setChatInput("");
    }
  };

  useEffect(() => {
    const signalEventHandler = (event) => {
      const { data } = event;
      const chatData = JSON.parse(data);
      setChatList((prevChatList) => [...prevChatList, chatData]);
    };

    // 이벤트 리스너를 추가합니다.
    session.on("signal:chat", signalEventHandler);

    // 반환하는 함수에서 이벤트 리스너를 제거합니다.
    return () => {
      session.off("signal:chat", signalEventHandler);
    };

    // 의존성 배열에 session을 포함시킵니다. session 값이 변경될 때마다 이펙트가 재실행됩니다.
  }, [session, dispatch, chatList]);

  const ChatList = () => (
    <div
      style={{
        height: "88%",
        maxHeight: "270px",
        paddingLeft: "5%",
        overflowY: "auto",
        marginTop: "1rem",
      }}
    >
      {chatList.map((chat, index) => (
        <p key={index}>
          <strong>{chat.writer}</strong>: {chat.message}
        </p>
      ))}
      <div ref={chatBoxRef} style={{ float: "left", clear: "both" }} />
    </div>
  );

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        marginTop: "13px",
      }}
    >
      {/*  비디오 컴포넌트 영역 */}
      <div className="video-panel" style={{ height: "200px", width: "500px" }}>
        <Flipper flipKey={direction}>
          <div style={{ display: "flex" }}>
            <div>
              <Flipped flipId="content">
                <div style={{ ...commonDivStyles, flexGrow: 1 }}>
                  {mainStreamManager &&
                    renderUserVideoComponent(mainStreamManager, "my-video")}
                </div>
              </Flipped>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "30px",
                  left: "5.5%",
                  top: "40%",
                  position: "absolute"
                }}
              >
                <Camera onClick={toggleMyCamera}
                        src = {isMyCameraOn ? CameraOn : CameraOff}
                        alt="카메라 끄고켜기"
                />

                <Mic
                  onClick={toggleMyMic}
                  src={isMyMicOn ? MicOn : MicOff}
                  alt="마이크 끄고켜기"
                />
              </div>

            </div>
            <div>
              <Flipped flipId="content">
                <div style={{ ...commonDivStyles, flexGrow: 1 }}>
                  {subscribers.map(
                    (subscriber) =>
                      subscriber && renderUserVideoComponent(subscriber, "partner-video")
                  )}
                </div>
              </Flipped>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "30px",
                  left: "22.4%",
                  top: "40%",
                  position: "absolute"
                }}
              >
                <Camera
                  src = {isVolunteerCameraOn ? CameraOn : CameraOff}
                />

                <Mic
                  src={isVolunteerMicOn ? MicOn : MicOff}
                />
              </div>
            </div>
          </div>
        </Flipper>
      </div>
      {/*  비디오 컴포넌트 영역  */}
      {/*  채팅창 영역  */}
      <CSSTransition
        in={isChatVisible}
        timeout={300}
        classNames="chat"
        unmountOnExit
        onEnter={() => setIsChatVisible(true)}
        onExited={() => setIsChatVisible(false)}
      >
        <ChattingBox>
          <div
            className="shadow"
            style={{
              height: "75%",
              width: "95%",
              backgroundColor: "rgb(255, 255, 255)",
              margin: "5px",
              marginLeft: "2.5%",
              marginTop: "1em",
              borderRadius: "15px",
              border: "2px solid",
            }}
          >
            <ChatList />
          </div>
          <div>
            <ChatInput
              className="shadow"
              type="text"
              placeholder="채팅 내용을 입력하세요"
              onKeyUp={handleChatSubmission}
              onChange={(event) => setChatInput(event.target.value)}
              value={chatInput}
            />
          </div>
        </ChattingBox>
      </CSSTransition>
    </div>
  );
};

Chat.propTypes = {
  // 화면을 렌더링하는 method
  renderUserVideoComponent: PropTypes.func.isRequired,
  // 사용자의 화면을 관리하는 Stream
  mainStreamManager: PropTypes.instanceOf(StreamManager).isRequired,
  // 사용자의 Session에 참여하고 있는 Subscriber의 List
  subscribers: PropTypes.arrayOf(PropTypes.instanceOf(StreamManager))
    .isRequired,
  // session이 Session의 인스턴스인지 확인
  session: PropTypes.instanceOf(Session).isRequired,
};

export default Chat;
