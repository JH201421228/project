import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Container = styled.div`
  height: 98%;
  width: 95%;
`;

const ShadowBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 5px solid black;
  border-radius: 20px;
  height: 93%;
  width: 930px;
  flex: 1;
  margin-top: 4%;
  background-color: rgb(255, 250, 233);
`;

const Heading1 = styled.h1`
  margin-top: 4%;
  font-weight: bolder;
  color: rgb(45, 45, 45);
  text-shadow: 2px 2px 2px rgb(255, 215, 3);
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: rgb(251, 243, 212);
  height: 70%;
  width: 80%;
  margin: 3% 3% 2% 10%;
  border-radius: 20px;
  border: 5px solid rgb(45, 45, 45);
`;

const StyledInput = styled.input`
  border: none;
  height: 100%;
  width: 100%;
  border-radius: 20px;
  text-align: center;
  font-size: 100px;
  background-color: rgb(251, 243, 212);
`;

const SubmitButton = styled.button`
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

const WordsInput = ({
                      currentInputWord,
                      setCurrentInputWord,
                      submitWord
                    }) => {
  return (
    <Container>
      <ShadowBox>
        <Heading1>단어를 제시해 주세요.</Heading1>
        <InputContainer>
          <StyledInput
            type="text"
            onChange={(e) => setCurrentInputWord(e.target.value)}
            value={currentInputWord}
          />
        </InputContainer>
        <SubmitButton onClick={() => submitWord(currentInputWord)}>
          제시완료
        </SubmitButton>
      </ShadowBox>
    </Container>
  );
};

WordsInput.propTypes = {
  currentInputWord: PropTypes.string.isRequired,
  setCurrentInputWord: PropTypes.func.isRequired,
  submitWord: PropTypes.func.isRequired,
};

export default WordsInput;