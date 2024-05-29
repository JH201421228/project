import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import getEnv from "../../utils/getEnv";
import { motion } from "framer-motion";

const UpperDiv = styled.div`
  flex: 0.4;
  background-color: #fffdf6;
  border-radius: 20px;
  border-radius: 20px;
  border: solid 3px black;
  margin-bottom: 15px;
  margin-left: -10px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileCard = styled.div`
  width: 40%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 100px;
`;

const ProfileImage = styled.img`
  border: solid gray 3px;
  border-radius: 50%;
  width: 100px;
  height: 100px;
`;

const InformationSection = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 90px;
  font-size: 20px;
`;

const NoteDiv = styled.div`
  width: 90%;
  height: 70%;
  border: 1px solid #ccc;
  border-radius: 5px;
  /* margin-right: 70px; */
  padding: 10px;
  overflow: auto;
  position: relative;
`;

const NotePlaceholder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #aaa;
`;

//특이사항
const Button = styled(motion.button)`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 207px;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;

  &:hover {
    transform: scale(0.95);
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 50%;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease; /* 모션을 위한 트랜지션 */

  &:hover {
    transform: scale(0.95); /* Hover 시 커지는 모션 */
  }
`;

const NoteContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 100%;
`;

function ChildUpDiv() {
  const selectChildCard = useSelector((state) => state.adminSelectChild.value);
  const userInfo = useSelector((state) => state.user);
  const urlInfo = getEnv("API_URL");
  const [childProfileImg, setChildProfileImg] = useState("");
  const [note, setNote] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [childSpecialNote, setChildSpecialNote] = useState("");

  let name, childCenter, Birth, childId;
  name = selectChildCard[0];
  childCenter = selectChildCard[1];
  Birth = selectChildCard[2];
  childId = selectChildCard[3];

  const handleSaveNote = (note) => {
    axios
      .post(`${urlInfo}/child/content`, {
        id: childId,
        specialContent: note,
      })
      .then((res) => {
        setChildSpecialNote(note);
        // console.log(res.data, "특이사항쓰기 성공");
      })
      .catch((err) => {
        console.log(err, "ChildUpDiv, 특이사항쓰기 에러");
      });
    setNote("");
    setShowModal(false); // 모달 닫기
  };

  // 아동상세조회
  useEffect(() => {
    if (childId) {
      axios
        .get(`${urlInfo}/child/${childId}`)
        .then((res) => {
          // console.log(res.data, "childUpdiv 아동상세조회");
          setChildSpecialNote(res.data.childSpecialContent);
          setChildProfileImg(res.data.childProfileImagePath);
        })
        .catch((err) => {
          console.log(err, "err->ChildUpDiv");
        });
    }
  }, [selectChildCard]);

  return (
    <>
      <UpperDiv>
        <ProfileCard>
          <ProfileImage src={childProfileImg} alt="" />
        </ProfileCard>
        <InformationSection>
          <p>아동이름 : {name}</p>
          <p>생년원일 : {Birth} </p>
          <p>아동센터 : {childCenter}</p>
        </InformationSection>
        <NoteContainer>
          <NoteDiv>
            {childSpecialNote ? (
              childSpecialNote
            ) : (
              <NotePlaceholder>특이사항을 적어주세요!</NotePlaceholder>
            )}
          </NoteDiv>
          <Button onClick={() => setShowModal(true)}>특이사항 작성</Button>
        </NoteContainer>
        {/* 모달 */}
        {showModal && (
          <ModalWrapper>
            <ModalContent>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="특이사항을 입력하세요"
                style={{
                  width: "100%",
                  height: "200px",
                  margin: "10px 0",
                  padding: "10px",
                  resize: "none",
                }}
              />
              <ModalButtons>
                <ModalButton onClick={() => handleSaveNote(note)}>
                  확인
                </ModalButton>
                <ModalButton onClick={() => setShowModal(false)}>
                  취소
                </ModalButton>
              </ModalButtons>
            </ModalContent>
          </ModalWrapper>
        )}
      </UpperDiv>
    </>
  );
}

export default ChildUpDiv;
