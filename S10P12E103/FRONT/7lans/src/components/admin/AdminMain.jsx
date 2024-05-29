import React from "react";
import styled, { keyframes } from "styled-components";
import NormalNav from "../../components/navs/NormalNav";
import { useNavigate } from "react-router";

import VolunteerManage from "../../images/admin_pic/volunteer_manage.png";
import ChildManage from "../../images/admin_pic/child_manage.png";
import ActivityManage from "../../images/admin_pic/activity_manage.png";

const ButtonContainer = styled.div`
  display: flex;
  margin: 20px;
  margin-top: 120px;
`;

const LargeButton = styled.button`
  flex: 1;
  border: none;
  height: 550px;
  border-radius: 10px;
  background-color: #f7b934;
  padding: 20px;
  text-align: center;
  margin-right: 20px;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;

const ButtonImage = styled.img`
  width: 50%;
  height: auto;
  margin-bottom: 20px;
`;

const ButtonText = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;
`;

const AdminMain = () => {
  const navigate = useNavigate();

  const handleBtnClick = (destination) => {
    navigate(destination);
  };

  return (
    <>
      <NormalNav />
      <ButtonContainer>
        <LargeButton onClick={() => handleBtnClick("/volunteer_manage")}>
          <ButtonImage src={VolunteerManage} alt="Button 1" />
          <ButtonText>봉사자 관리</ButtonText>
        </LargeButton>
        <LargeButton onClick={() => handleBtnClick("/child_manage")}>
          <ButtonImage src={ChildManage} alt="Button 2" />
          <ButtonText>아동 관리</ButtonText>
        </LargeButton>
        <LargeButton onClick={() => handleBtnClick("/active_manage")}>
          <ButtonImage src={ActivityManage} alt="Button 3" />
          <ButtonText>활동 일지 관리</ButtonText>
        </LargeButton>
      </ButtonContainer>
    </>
  );
};

export default AdminMain;
