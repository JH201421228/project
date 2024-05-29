import React from "react";
import styled from "styled-components";

const Box = styled.div`
  width: 70%;
  height: 60%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* 텍스트 위치를 조정하기 위해 position 속성 추가 */
`;

const Image = styled.img`
  max-width: 80%;
  max-height: 80%;
  position: absolute;
  bottom: 0; /* 이미지를 Box의 맨 아래쪽에 위치시키기 위해 bottom 속성 추가 */
`;

const TextContainer = styled.div`
  position: absolute; /* 텍스트를 이미지 위에 위치시키기 위해 position 속성 추가 */
  top: -70px; /* 이미지 위쪽에 위치하도록 top 속성 조정 */
  left: 50%; /* 텍스트를 수평 중앙으로 정렬하기 위해 left 속성 사용 */
  transform: translateX(
    -50%
  ); /* 텍스트를 가운데로 정렬하기 위해 transform 속성 사용 */
  background-color: #b5d84c; /* 말풍선 배경색 설정 */
  padding: 8px 16px; /* 말풍선 내부 여백 설정 */
  border-radius: 8px; /* 말풍선 테두리 둥글게 설정 */
`;

const Text = styled.div`
  color: white;
  font-weight: bold;
  font-size: 25px; /* 텍스트의 크기 설정 */
  text-align: center; /* 텍스트를 가운데 정렬하기 위해 text-align 속성 사용 */
`;

export default function EggsFirst() {
  return (
    <>
      <Box>
        {/* 이미지를 바꿀 수 있게 수정하기*/}
        <Image src="/raise_egg_pic.png" alt="dinosaur" />
        <TextContainer>
          <Text>hi</Text>
        </TextContainer>
      </Box>
    </>
  );
}
