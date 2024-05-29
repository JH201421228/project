import PropTypes from 'prop-types';
import React from "react";
import styled from 'styled-components';

// For outer most wrapper that aligns form in center
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 930px;
  flex: 1;
  margin-top: 10%;
  text-align: 'center';
`;

// For showing form title
const FormTitle = styled.h1`
  margin-top: 4%;
  margin-left: 20%;
  font-weight: bolder;
  color: rgb(45, 45, 45);
  text-shadow: 2px 2px 2px rgb(255, 215, 3);
`;

// For applying shadow effect
const Shadow = styled.div`
  display: flex;
  flex-direction: column;
  border: 4px solid rgb(45, 45, 45);
  border-radius: 20px;
  width: 90%;
  flex: 1;
  margin: 2rem;
  background-color: rgb(251, 243, 212);
`;

// For wrapping input fields
const InputFieldsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: rgb(251, 243, 212);
  margin: 3%;
  margin-top: 40px;
  border-radius: 15px;
`;

const InputFieldsContainer = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: center;
  background-color: rgb(251, 243, 212);
`;


// For styling each input field
const StyledInput = styled.input`
  border: 3px solid rgb(45, 45, 45);
  border-radius: 10px;
  padding: 5px;
  margin: 0.5rem;
  font-size: 20px;
`;

// For styling submit button
const SubmitButton = styled.button`
  width: 150px;
  height: 60px;
  align-self: center;
  font-weight: bolder;
  font-size: 25px;
  border: none;
  border-radius: 16px;
  background-color: rgb(255, 215, 3);
  margin-bottom: 20px;
   &:hover,
  &:focus {
    background-color: #4caf50; // 마우스를 올렸을 때 배경 색 변경
    color: #ffffff; // 마우스를 올렸을 때 글자 색 변경
  }
`;

// the component itself
const WordsForm = ({
                     submittedWord,
                     setSentence1,
                     setSentence2,
                     setSentence3,
                     setSentence4,
                     submitSentences,
                     sentence1,
                     sentence2,
                     sentence3,
                     sentence4,
                   }) => (
  <FormWrapper>
    <FormTitle>&quot;{submittedWord}&quot;을 포함한 문장을 만들어 보아요</FormTitle>
    <Shadow>
      <InputFieldsWrapper>
        <InputFieldsContainer>
          <StyledInput
            type="text"
            placeholder={sentence1 ? '' : '문장을 완성해 주세요'}
            value={sentence1}
            disabled
          />
          <StyledInput
            type="text"
            placeholder={sentence2 ? '' : '문장을 완성해 주세요'}
            value={sentence2}
            disabled
          />
          <StyledInput
            type="text"
            placeholder={sentence3 ? '' : '문장을 완성해 주세요'}
            value={sentence3}
            disabled
          />
          <StyledInput
            type="text"
            placeholder={sentence4 ? '' : '문장을 완성해 주세요'}
            value={sentence4}
            disabled
          />
        </InputFieldsContainer>
      </InputFieldsWrapper>
      {/* <SubmitButton onClick={submitSentences}>제출</SubmitButton> */}
    </Shadow>
  </FormWrapper>
)

// Prop validation
WordsForm.propTypes = {
  submittedWord: PropTypes.string.isRequired,
  setSentence1: PropTypes.func.isRequired,
  setSentence2: PropTypes.func.isRequired,
  setSentence3: PropTypes.func.isRequired,
  setSentence4: PropTypes.func.isRequired,
  submitSentences: PropTypes.func.isRequired,
  sentence1: PropTypes.string.isRequired,
  sentence2: PropTypes.string.isRequired,
  sentence3: PropTypes.string.isRequired,
  sentence4: PropTypes.string.isRequired,
};

export default WordsForm;