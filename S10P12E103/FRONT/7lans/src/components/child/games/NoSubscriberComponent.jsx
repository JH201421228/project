import React from "react";
import styled, { keyframes } from "styled-components";

const EmptySessionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const EmptySessionText = styled.div`
  font-size: 2rem;
  color: #999;
  margin: 0;
  margin-top: 30px;
  align-self: center;
`;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const EmptySessionIndicator = styled.div`
  margin-top: 2rem;
  width: 80px;
  height: 80px;
  border: 8px solid #F3EAC2; // Light yellow
  border-radius: 50%;
  border-top: 8px solid #FFD700; // Gold yellow
  align-self: center;
  animation: ${spinAnimation} 1s linear infinite;
`;

const NoSubscriberComponent = () => (
  <EmptySessionBox>
    <EmptySessionText>아직 선생님이 들어오지 않았어요</EmptySessionText>
    <EmptySessionIndicator />
  </EmptySessionBox>
);

export default NoSubscriberComponent;