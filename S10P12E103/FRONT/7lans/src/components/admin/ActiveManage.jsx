import React from "react";
import NormalNav from "../navs/NormalNav";
import styled from "styled-components";
import ActiveLeft from "./ActiveLeft";
import ActiveRight from "./AcitveRight";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BoardContainer = styled.div`
  border: #ff9f1c solid;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
  height: 600px;
  width: 1500px;
  display: flex;
`;

const ActiveLeftContainer = styled.div`
  flex: 2;
  margin-top: 20px;
`;

const ActiveRightContainer = styled.div`
  flex: 2;
  margin-top: 20px;
`;

const ActiveManage = () => {
  return (
    <Container>
      <NormalNav />
      <BoardContainer>
        <ActiveLeftContainer>
          <ActiveLeft />
        </ActiveLeftContainer>

        <ActiveRightContainer>
          <ActiveRight />
        </ActiveRightContainer>
      </BoardContainer>
    </Container>
  );
};

export default ActiveManage;
