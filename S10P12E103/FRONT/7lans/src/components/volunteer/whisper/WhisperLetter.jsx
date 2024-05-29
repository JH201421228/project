import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";
import { useSelector } from "react-redux";
import getEnv from "../../../utils/getEnv";

import Note from "../../../images/whisper/notes.png"
import CloseIcon from "../../../images/close_button.png"

const ChatContainer = styled.div`
  background-color: rgb(255, 248, 223);
  padding: 20px;
  border-radius: 10px;
  height: 93%;
  width: 95%;
  overflow-y: auto;
  margin-top: 22px;
  margin-left: 20px;
`;

// 봉사자가 보내는 속닥속닥
const ChatCardVol = styled.div`
  height: 40%;
  width: 440px;
  margin-bottom: 20px;
  border-radius: 15px;
  cursor: pointer;
  margin-left: 400px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: row-reverse;
  position: relative;
`;

// 아이가 보낸 속닥속닥
const ChatCardChild = styled.div`
  height: 40%;
  width: 440px;
  margin-bottom: 20px;
  border-radius: 15px;
  cursor: pointer;
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  position: relative;
`;


const ModalButton = styled.button`
  padding-top: 0;
  cursor: pointer;
  background: rgb(255, 252, 199);
  font-weight: bold;
  border: 2px solid rgb(255, 184, 36);
  border-radius: 5px;
  padding-bottom:0px;
  width: 70px;
  height: 40px;
  &:hover {
    background-color: rgb(255, 215, 3)};
`;

const WriteButton = styled.button`
  position: fixed;
  bottom: 10%;
  left: 78%;
  /* transform: translateX(-50%); */
  padding: 10px;
  cursor: pointer;
  background: rgba(255, 237, 140, 1);
  font-weight: bold;
  border: 2px solid rgb(255, 184, 36);
  border-radius: 5px;
  &:hover {
    background-color: rgb(255, 215, 3)};
`;

// button {
//   background: linear-gradient(
//               300deg,
//               rgba(255, 184, 36, 1),
//               rgba(255, 237, 140, 1));
//   font-size: 19px;
//   font-weight: bold;
//   border: none;
//   border-radius: 50px;
//   margin: 0.5rem;
//   padding: 0.5rem;
//   height: 50px;
//   width: 130px;
//   margin-left: 35%;
//   margin-top: 7%;
//   color: white;
//   text-decoration-line: none;
// };

const WriteModal = styled(Modal)`
  width: 70%;
  max-width: 600px;
  height: 52%;
  max-height: 400px;
  margin: auto;
  border-radius: 15px;
  outline: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(
    160deg,
    rgba(255, 252, 199, 1) 0%,
    rgba(255, 232, 102, 1) 100%
  );
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const WriteModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 0;
  `;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;
const ChatDate = styled.p`
  font-size: 12px;
  color: #777;
  margin-top: 10px;
`;
const WhisperLetter = () => {
  const volInfo = useSelector((state) => state.vol.value);
  const userInfo = useSelector((state) => state.user.value);
  const childInfo = useSelector((state) => state.child.value);
  const childRelationId = childInfo.relationId;
  const volRelationId = volInfo.relationId
  // console.log(childRelationId);
  const writerId = userInfo.memberId;
  const urlInfo = getEnv("API_URL");

  const userName = userInfo.volunteerName || userInfo.childName;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [writeModalIsOpen, setWriteModalIsOpen] = useState(false);
  const [typingMessage, setTypingMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    // 컴포넌트가 업데이트될 때마다 스크롤을 아래로 이동합니다.
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  });

  useEffect(() => {
    axios
      .get(`${urlInfo}/whisper/list/${childRelationId || volRelationId}`)
      .then((res) => {
        // console.log(chatMessages)
        setChatMessages(res.data);
      })
      .catch((err) => {
        console.log(err, "속닥속닥 리스트 불러오기 에러");
      });
  }, [childRelationId, volRelationId]);

  const openModal = (message) => {
    setSelectedChat(message);
    setModalIsOpen(true);
    setTypingMessage(message.content);
  };

  const openWriteModal = () => {
    setWriteModalIsOpen(true);
  };

  const closeWriteModal = () => {
    setWriteModalIsOpen(false);
    setTypingMessage("");
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setTypingMessage("");
    setSelectedChat(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleWriteMessage = () => {
    if (typingMessage.trim() !== "") {
      axios
        .post(`${urlInfo}/whisper`, {
          writerId: writerId,
          relationId: childRelationId || volRelationId,
          content: typingMessage,
        })
        .then((res) => {
          // 속닥속닥 작성 후 갱신하기 위해 다시 불렀는데 더 좋은방법있나요?

          axios
            .get(`${urlInfo}/whisper/list/${childRelationId || volRelationId}`)
            .then((res) => {
              setChatMessages(res.data);
            })
            .catch((err) => {
              console.log(err, "속닥속닥리스트 불러오기 에러");
            });
          closeWriteModal();
        })
        .catch((err) => {
          console.log(err, "WhisperLetter post 에러");
        });
    }
  };

  return (
    <ChatContainer ref={chatContainerRef}>
      {chatMessages.map((message, index) =>
        message.writer === userName ? (
          <ChatCardVol key={index} onClick={() => openModal(message)}>
            <img
              src={Note}
              style={{
                width: "350px",
                height: "230px",
                position: "absolute",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.01)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            />
            <div
              style={{
                position: "absolute",
                left: "25%",
                top: "27%",
                right: "2%",
                fontSize: "25px",
              }}
            >
              {message.content}{" "}
              <ChatDate>{formatDate(message.createDate)}</ChatDate>
            </div>

            {/* 생성시간 넣기..? */}
          </ChatCardVol>
        ) : (
          <ChatCardChild key={index} onClick={() => openModal(message)}>
            <img
              src={Note}
              style={{
                width: "350px",
                height: "230px",
                position: "absolute",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.01)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            />
            <div
              style={{
                position: "absolute",
                left: "6%",
                top: "27%",
                right: "25%",
                fontSize: "25px",
              }}
            >
              {message.content}
            <ChatDate>{formatDate(message.createDate)}</ChatDate>
            </div>
          </ChatCardChild>
        )
      )}

      <WriteButton onClick={openWriteModal}>속닥속닥 적어봐요</WriteButton>

      <WriteModal
        isOpen={writeModalIsOpen}
        onRequestClose={closeWriteModal}
        contentLabel="Write Modal"
      >
        <WriteModalContainer>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end'}}>
            <h2 style={{marginBottom: '3%', paddingTop: '5%'}}>속닥속닥</h2>
              <img src={CloseIcon}
              onClick={closeWriteModal}
              style={{position: 'relative', 
                      width: '50px', 
                      height: '50px', 
                      top: '3px', 
                      right: '0', 
                      marginLeft: '33%'}}
              onMouseEnter={(e) => {
                e.target.style.cursor = 'pointer';
              }}
              />
          </div>
          <textarea
            rows={5}
            cols={55}
            value={typingMessage}
            placeholder="50자 이내로 작성하세요"
            style={{
              backgroundColor: "rgb(255, 252, 199)",
              fontSize: "20px",
              border: "none",
              outline: "none",
              resize: "none",
              padding: "2rem",
            }}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (inputValue.length <= 50) {
                setTypingMessage(inputValue);
              } else alert("50자 이내로 작성하세요💛");
            }}
          />

          <ModalButtonContainer>
            <ModalButton onClick={handleWriteMessage}>보내기</ModalButton>
          </ModalButtonContainer>
        </WriteModalContainer>
      </WriteModal>
    </ChatContainer>
  );
};

export default WhisperLetter;
