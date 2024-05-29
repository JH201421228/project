import styled from 'styled-components';
import React from 'react';

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
   width: 930px;
    height: 100%;
    margin-top: 5%;
`;

const QuestionPrompt = styled.h1`
  margin-bottom: 4%;
  font-weight: bolder;
  font-size: 100px;
  color: black;
  text-shadow: 2px 2px 2px rgb(255, 215, 3);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 50%;
  margin-bottom: 0%;
`;

const InputGuide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30%;
  width: 80%;
  border: 5px solid black;
  border-bottom: 0;
  border-radius: 20px 20px 0 0;
  background-color: rgb(255, 237, 170);
`;

const AnswerInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  width: 80%;
  border: 5px solid black;
  border-radius: 0 0 20px 20px;
  margin-bottom: 40px;
`;

const StyledInput = styled.input`
  background-color: rgb(255, 215, 3);
  border-radius: 0 0 15px 15px;
  border: none;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 100px;
`;

const ResetButton = styled.button`
  width: 150px;
  height: 60px;
  align-self: center;
  text-align: center;
  font-weight: bolder;
  font-size: 25px;
  border: none;
  border-radius: 16px;
  background-color: rgba(255, 184, 36, 1);
  &:hover,
  &:focus {
    background-color: #4caf50; // 마우스를 올렸을 때 배경 색 변경
    color: #ffffff; // 마우스를 올렸을 때 글자 색 변경
  }
`;


const GugudanPrompt = ({currDan, multipleNum, inputRef, handleSubmitAnswer, setCurrInputAns, currInputAns, resetGame}) => {
  return (
    <>
      <QuestionContainer>
        <QuestionPrompt>{currDan} X {multipleNum} = ?</QuestionPrompt>
        <InputContainer>
          <InputGuide>
            <h2>정답을 입력해 주세요</h2>
          </InputGuide>
          <AnswerInput>
            <StyledInput
              ref={inputRef}
              type="text"
              onKeyUp={handleSubmitAnswer}
              onChange={(e) => {
                const numberValue = parseInt(e.target.value, 10) || undefined;
                setCurrInputAns(numberValue);

              }}
              value={currInputAns}
            />
          </AnswerInput>
        </InputContainer>
      </QuestionContainer>
      <ResetButton onClick={resetGame}>돌아가기</ResetButton>
    </>
  );
};

export default GugudanPrompt;