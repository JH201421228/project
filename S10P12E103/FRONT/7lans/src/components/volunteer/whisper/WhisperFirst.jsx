import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Balloon from "../../../images/text_balloon.png";
import getEnv from "../../../utils/getEnv";

const Box = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0 20px 20px 0;
  background-color: rgb(255,255,255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* 텍스트 위치를 조정하기 위해 position 속성 추가 */
`;

const Image = styled.img`
  width: 400px;
  height: 500px;
  position: absolute;
  bottom: 45px;
  right: 60px;
`;

const TextContainer = styled.div`
  position: absolute; /* 텍스트를 이미지 위에 위치시키기 위해 position 속성 추가 */
  top: 0px;
  left: 100px;
  // background-color: #b5d84c; /* 말풍선 배경색 설정 */
  // padding: 8px 16px; /* 말풍선 내부 여백 설정 */
  // border-radius: 8px; /* 말풍선 테두리 둥글게 설정 */
`;

const Text = styled.div`
  position: absolute;
  top: 115px;
  left: 60px;
  width: 70%;
  color: rgb(45,45,45);
  font-weight: bold;
  font-size: 30px;
  text-align: center; 
`;

export default function WhisperFirst() {
  const userInfo = useSelector((state) => state.user.value)
  const userDino = useSelector((state) => state.dino.value)
  // console.log(userInfo)
  return (
    <>
      <Box>
        {/* 이미지를 바꿀 수 있게 수정하기*/}
        <Image src={`${getEnv("PUBLIC_URL")}/dinosourImage/dinosaur${userDino}_study.png`} alt="dinosaur" />
        <TextContainer>
          <img src={Balloon} alt="말풍선" style={{width:'400px', transform: 'rotate(-20deg)'}}></img>
          {userInfo.memberType === 'CHILD'?
          <Text>어떤 선생님의 속닥속닥을 보실건가요? 선생님을을 선택해 주세요</Text>
           :
          <Text>어떤 학생의 속닥속닥을 보실건가요? 학생을 선택해 주세요</Text>
           }
        </TextContainer>
      </Box>
    </>
  );
}
