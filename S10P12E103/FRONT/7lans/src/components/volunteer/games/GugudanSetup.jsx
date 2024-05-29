import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 5px solid black;
  border-radius: 20px;
  height: 91%;
  width: 930px;
  flex: 1;
  margin-top: 3.7%;
  background-color: rgb(255, 250, 233);
`;

const Title = styled.h1`
  font-weight: bolder;
  color: rgb(41, 40, 38);
  text-shadow: 2px 2px 2px rgb(255, 215, 3);
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 0;
`;

const DanSpan = styled.span`
  width: 10%;
  cursor: pointer;
  margin: 5%;
  font-size: 37px;
  font-weight: bold;
  transition: color 0.3s;
  color: ${props => props.isActive ? 'red' : 'black'};
`;

const ButtonArea = styled.button`
  width: 150px;
  height: 60px;
  align-self: center;
  font-weight: bolder;
  font-size: 25px;
  border: none;
  border-radius: 16px;
  background-color: rgba(255, 184, 36, 1);
  margin-top: 0;
  margin-bottom: 15px;
 &:hover,
  &:focus {
    background-color: #4caf50; // 마우스를 올렸을 때 배경 색 변경
    color: #ffffff; // 마우스를 올렸을 때 글자 색 변경
  }
`;


const DanContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
  background-color: rgb(251, 243, 212);
  margin: 35px 8% 20px;
  height: 70%;
  border-radius: 16px;
  border: 5px solid black;
`;

const GugudanSetup = ({
                        currDan,
                        setCurrDan,
                        onClickStart,
                      }) => {
  return (
    <Container>
      <Title>몇 단을 출제하실 건가요??</Title>
      <DanContainer>
        {
          Array.from({length: 10}, (_, index) => index + 1).map(value =>
            <DanSpan onClick={() => setCurrDan(value)} isActive={currDan === value} key={value}>
              {value} 단
            </DanSpan>
          )
        }
      </DanContainer>
      <ButtonArea onClick={onClickStart}> 선택 완료 </ButtonArea>
    </Container>
  );
}


GugudanSetup.propTypes = {
  currDan: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([undefined])
  ]).isRequired,
  setCurrDan: PropTypes.func.isRequired,
  onClickStart: PropTypes.func.isRequired,
};

export default GugudanSetup;