import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import getEnv from "../../utils/getEnv";
import axios from "axios";
import { adminAddFriend } from "../../store/adminAddFriendSlice";
import ApprovePng from "../../../public/admin_pic/승인완료.png";

const RightContainer = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 4px solid #ffa5ab;
  padding: 10px;
  margin-right: 30px;
  margin-top: 20px;
`;

const HeaderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const LabelInfo = styled.span`
  margin-left: 10px;
  font-weight: 500;
`;

const ActiveHeader = styled.div`
  flex: 1;
  padding: 10px;
  border-bottom: 2px solid #ffa5ab;
`;

const ActiveContent = styled.div`
  flex: 3;
  padding: 20px;
  word-wrap: break-word;
`;

const ApproveButton = styled.button`
  background-color: #ff6b81;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 10px;
  align-self: flex-end;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  font-size: larger;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const NoActiveDocs = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: xx-large;
  margin-top: 150px;
`;

const ApproveImg = styled.img`
  height: 55px;
  width: 60px;
  margin-left: 600px;
`;

const ActiveRight = () => {
  const { activityId, relationId } = useSelector(
    (state) => state.adminSelectActive
  );
  const userInfo = useSelector((state) => state.user);
  const isApproval = useSelector((state) => state.adminApproveBtn.value);
  const { filteredListLen, filteredApproveListLen } = useSelector(
    (state) => state.adminNoList
  );
  const centerId = userInfo.value.centerId;
  const urlInfo = getEnv("API_URL");
  const [activeLog, setActiveLog] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isApproveSuccessModalOpen, setIsApproveSuccessModalOpen] =
    useState(false);
  const dispatch = useDispatch();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeApproveSuccessModal = () => {
    setIsApproveSuccessModalOpen(false);
  };

  const fecthActives = async () => {
    if (relationId && activityId) {
      try {
        const res = await axios.post(`${urlInfo}/activityLog/manager/detail`, {
          relationId: relationId,
          activityLogId: activityId,
        });
        // console.log(res.data, "활동일지 상세보기");
        setActiveLog(res.data);
        dispatch(adminAddFriend(true));
      } catch (err) {
        console.error("err ActiveRight activity detail", err);
      }
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "";

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Intl.DateTimeFormat("ko-KR", options).format(date);
  };

  const fetchApporve = async (centerId, relationId, activityId) => {
    try {
      const res = await axios.post(`${urlInfo}/activityLog/manager/approve`, {
        centerId: centerId,
        relationId: relationId,
        activityLogId: activityId,
      });
      // console.log(res.data, "활동일지 승인완료");
      fecthActives();
      setIsApproveSuccessModalOpen(true); // 승인 완료 모달을 표시합니다.
      setTimeout(closeApproveSuccessModal, 1000); // 0.5초 후에 승인 완료 모달을 닫습니다.
    } catch (err) {
      console.error("err ActiveRight activity 승인", err);
    }
  };

  const onClick = (centerId, relationId, activityId) => {
    fetchApporve(centerId, relationId, activityId);
    closeModal();
  };

  useEffect(() => {
    fecthActives();
  }, [activityId]);

  // 승인완료된 리스트가 없는 상태는 일단 보류..
  return (filteredListLen == 0 && !isApproval) ||
    (filteredApproveListLen == 0 && isApproval) ? (
    <RightContainer>
      <NoActiveDocs>
        승인이 필요한
        <br />
        활동일지가 없습니다
      </NoActiveDocs>
    </RightContainer>
  ) : (
    <RightContainer>
      <ActiveHeader>
        <HeaderItem>
          <Label>
            날짜: <LabelInfo>{activeLog.dateInfo}</LabelInfo>
          </Label>
        </HeaderItem>
        <HeaderItem>
          <Label>
            시작 시간:{" "}
            <LabelInfo>{formatDateTime(activeLog.activityStartTime)}</LabelInfo>
          </Label>
        </HeaderItem>
        <HeaderItem>
          <Label>
            끝난 시간:{" "}
            <LabelInfo>{formatDateTime(activeLog.activityEndTime)}</LabelInfo>
          </Label>
        </HeaderItem>
        <HeaderItem>
          <Label>
            봉사 시간: <LabelInfo>{activeLog.activityTime}</LabelInfo>
          </Label>
        </HeaderItem>
        <HeaderItem>
          <Label>
            봉사자 이름: <LabelInfo>{activeLog.volunteerName}</LabelInfo>
          </Label>
        </HeaderItem>
        <HeaderItem>
          <Label>
            센터 이름: <LabelInfo>{activeLog.centerName}</LabelInfo>
          </Label>
        </HeaderItem>
      </ActiveHeader>
      <ActiveContent>{activeLog.content}</ActiveContent>
      {activeLog.approveStatus ? (
        <ApproveImg src={ApprovePng} />
      ) : (
        <ApproveButton onClick={openModal}>승인하기</ApproveButton>
      )}
      {modalIsOpen && (
        <Modal>
          <ModalContent>
            승인하시겠습니까?
            <ButtonContainer>
              <ApproveButton
                onClick={() => onClick(centerId, relationId, activityId)}
              >
                승인
              </ApproveButton>
              <ApproveButton onClick={closeModal}>취소</ApproveButton>
            </ButtonContainer>
          </ModalContent>
        </Modal>
      )}

      {isApproveSuccessModalOpen && (
        <Modal>
          <ModalContent>
            <div>활동일지가 승인되었습니다!</div>
          </ModalContent>
        </Modal>
      )}
    </RightContainer>
  );
};

export default ActiveRight;
