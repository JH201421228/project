import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { updateChildInfo } from "../../store/childSlice";
import getEnv from "../../utils/getEnv";
import viewletter, { viewLetter } from "../../store/viewLetterSlice";
import { updateVolInfo } from "../../store/volSlice";
import { useLocation, useNavigate } from "react-router-dom";

const StyledCommonSidePanel = styled.div`
  background-color: rgb(255, 248, 223);
  padding: 2rem;
  color: white;
  width: 500px;
  border-radius: 20px 0 0 20px;
  height: 100%;
  /* border: 2px solid rgb(255, 183, 58);
  border-right: none; */

  @media (max-width: 768px) {
    max-width: 100%;
    border-radius: 0;
  }
`;

const LeftSide = styled.div`
  height: 150px;
  position: relative;

  @media (max-width: 768px) {
    height: 100%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  left: 89%;
  border-radius: 25px;
  border: none;
  background-color: rgb(255, 248, 223);
  font-weight: bold;
  color: rgb(240, 165, 8);

  @media (max-width: 768px) {
    left: 85%;
  }
`;

const ProfileImage = styled.img`
  position: absolute;
  left: 5%;
  top: 2%;
  height: 8rem;
  width: 8rem;
  border-radius: 100px;
  border: 4px solid rgb(45, 45, 45);
  padding: 5px;

  @media (max-width: 768px) {
    position: relative;
    left: 0;
    top: 0;
    margin: 20px auto;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  height: 75%;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 2px 1px rgb(240, 165, 8, 0.7);
  background-color: rgb(255, 255, 255, 0.6);
  border-radius: 10px;
  @media (max-width: 768px) {
    height: auto;
  }
`;

const NameHeader = styled.h4`
  font-weight: bolder;
  color: rgb(45, 45, 45);
  text-decoration: none;
  position: absolute;
  top: 65%;
  left: 48%;
`;

const DetailContainer = styled.div`
  margin-top: 12px;
  width: 100%;
  height: 94%;
  color: rgb(0, 0, 0);
  padding: 1rem;
  border-radius: 10px;
  /* border: 2px solid rgb(255, 183, 58); */
  overflow: auto;
  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

const Age = ({ birth }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  // console.log(birth[0])
  // console.log(currentDate.getFullYear())

  return (
    <div>나이 : {currentDate.getFullYear() - birth.substring(0, 4) + 1} 살</div>
  );
};

const Comment = ({ comment }) => {
  // console.log(comment);

  if (comment) {
    return <div>특이사항 : {comment}</div>;
  } else {
    return <div>특이사항 : 특이사항이 없습니다.</div>;
  }
};

const ChildCard = styled.div`
  border: 2.5px solid rgb(240, 165, 8, 0.7);
  display: flex;
  align-items: center;
  background-color: rgba(255, 237, 140, 0.3);
  /* position: relative; */
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 1rem;
  padding-bottom: 6px;
`;

const Button = styled.button`
  background: rgba(255, 237, 140, 1);
  font-size: 17px;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  height: 40px;
  width: 100px;
  margin-left: 160px;
  text-decoration-line: none;
  position: relative;
  border: 2px solid rgb(240, 165, 8, 0.7);
  &:hover {
    background-color: rgb(255, 215, 3);
  }
`;

const CommonSidePanel = () => {
  const [sidePanelStatus, setSidePanelStatus] = useState(true);
  //const [children, setChildren] = useState([]);
  const [id, setId] = useState([]);
  const dispatch = useDispatch();
  const volInfo = useSelector((state) => state.vol.value);
  const vols = useSelector((state) => state.vols.value);
  const userInfo = useSelector((state) => state.user.value);
  const urlInfo = getEnv("API_URL");
  const userId = userInfo.memberId;

  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = () => {
    if (location.pathname === "/child_start") {
      navigate("/child_video_chatting_start");
    }
  };

  const renderSidePanel = () => {
    const postData = (vol) => {
      dispatch(updateVolInfo(vol));
      dispatch(viewLetter(true));
    };
    if (sidePanelStatus) {
      return (
        <StyledCommonSidePanel>
          <LeftSide>
            <CloseButton onClick={() => setSidePanelStatus(false)}>
              {"<<"}
            </CloseButton>
            <ProfileImage src={userInfo.profileImgPath} alt="" />
            <NameHeader> {userInfo.childName} _아동</NameHeader>
          </LeftSide>
          <InfoContainer>
            <DetailContainer>
              {vols.length > 0 ? (
                vols.map((el, index) => (
                  <ChildCard key={index}>
                    <div style={{ position: "relative" }}>
                      <h3>{el.volunteerName} 선생님</h3>
                      <Age birth={el.volunteerBirth}></Age>
                      {/* <div>소속기관: {el.childCenterName}</div> */}
                      {/* <Comment comment={el.childSpecialContent}></Comment> */}
                      <Button
                        onClick={() => {
                          postData(el), navigateTo();
                        }}
                      >
                        선택하기
                      </Button>
                    </div>
                  </ChildCard>
                ))
              ) : (
                <h4> 친구를 추가해주세요!</h4>
              )}
            </DetailContainer>
          </InfoContainer>
        </StyledCommonSidePanel>
      );
    } else {
      return (
        <div
          style={{
            backgroundColor: "rgb(255, 248, 223)",
            borderRadius: "20px 0 0 20px",
          }}
        >
          <button
            style={{
              height: "25px",
              borderRadius: "25px",
              backgroundColor: "rgb(255, 248, 223)",
              fontWeight: "bold",
              color: "rgb(240, 165, 8)",
              margin: "2rem",
              border: "none",
            }}
            onClick={() => setSidePanelStatus(true)}
          >
            {">>"}
          </button>
        </div>
      );
    }
  };

  return renderSidePanel();
};

export default CommonSidePanel;
