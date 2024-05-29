import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import NormalNav from "../navs/NormalNav";
import ChildUpDiv from "./ChildUpDiv";
import ChildLowDiv from "./ChildLowDiv";
import { adminSelectChild } from "../../store/adminSelectChildSlice";
import { useDispatch, useSelector } from "react-redux";
import getEnv from "../../utils/getEnv";

const StyledChildManage = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  margin-top: 100px;
`;

const ChildManageContainer = styled.div`
  flex: 1;
  display: flex;
`;

const LeftContainer = styled.div`
  flex: 1;
  height: 620px;
  background-color: #fde79b;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const RightContainer = styled.div`
  flex: 2;
  height: 101%;
  background-color: #fde79b;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ChildListContainer = styled.div`
  flex: 1;
  background-color: #fffdf6;
  border-radius: 20px;
  border: solid 3px black;
  max-height: 80vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: -10px;
`;

// ChildListContainer의 컨텐츠들
const SearchContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 91%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px;
`;

const ChildCardList = styled.div`
  flex-direction: column;
  overflow-y: auto;
  max-height: 100vh;
  width: 100%;
  height: 100%;
  padding: 0;
  border-radius: 20px;
  position: relative;
  justify-content: center;
  align-items: center;
  margin-left: -50px;
  margin-right: -20px;
`;

const ChildCard = styled.div`
  width: 80%;
  height: 160px;
  margin-bottom: 15px;
  background-color: #ffe792;
  margin-left: 40px;
  padding: 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.3s;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: skewY(-12deg);
    z-index: -1;
  }
`;
const ProfileImage = styled.img`
  border: solid grey 3px;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin-right: 10px;
  margin-left: 20px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: x-large;
  width: 150px;
  margin-top: 10px;
  margin-right: 30px;
`;

const ProfileInfo1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: medium;
  width: 150px;
  margin-top: 10px;
  margin-right: 30px;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChildManage = () => {
  const urlInfo = getEnv("API_URL");
  const dispatch = useDispatch();
  const selectChildCard = useSelector((state) => state.adminSelectChild);
  const userInfo = useSelector((state) => state.user);
  const centerId = userInfo.value.centerId;
  // 카드 선택하기
  const [selectedCard, setSelectedCard] = useState(null);
  // 검색어 상태
  const [search, setSearch] = useState("");
  // 학생 리스트
  const [ChildList, setChildList] = useState([]);

  // 해당 센터의 학생리스트 가져오기
  useEffect(() => {
    axios
      .get(`${urlInfo}/child/listByCenter/${centerId}`)
      .then((response) => {
        const arr = [];
        // console.log(response.data, "센터의 아동들");
        for (const element of response.data) {
          // console.log(element, "아동개인의 정보");
          let childName, centerName, childImg, childBirth, childId;
          for (const ele in element) {
            if (ele === "childName") {
              childName = element[ele];
            }
            if (ele === "childCenterName") {
              centerName = element[ele];
            }
            if (ele === "childBirth") {
              childBirth = element[ele];
            }
            if (ele === "childId") {
              childId = element[ele];
            }
            if (ele === "childProfileImgPath") {
              childImg = element[ele];
            }
          }
          arr.push([childName, centerName, childBirth, childId, childImg]);
        }
        setChildList(arr);
      })
      .catch((err) => {
        console.error(err, "err -> ChildUpDiv");
      });
  }, []);

  const handleChildClick = (Child, index) => {
    setSelectedCard(index);
    dispatch(adminSelectChild(Child));
  };

  // 검색함수
  const filteredChilds = ChildList.filter((Child) =>
    Child.some(
      (property) =>
        typeof property === "string" &&
        property.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <StyledChildManage>
      <NormalNav />
      <ChildManageContainer>
        <LeftContainer>
          <ChildListContainer>
            <h2>센터의 아동 목록</h2>
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder="아동이름이나 생년월일 검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </SearchContainer>
            <ChildCardList>
              {/* 검색 결과에 따라 동적으로 ChildCard를 생성 */}
              {filteredChilds.map((child, index) => (
                <ChildCard
                  key={index}
                  onClick={() => handleChildClick(child, index)}
                >
                  <ProfileImage src={child[4]} />
                  <ProfileInfoContainer>
                    <ProfileInfo>{child[0]} 아동</ProfileInfo>
                    <ProfileInfo1>{child[1]}</ProfileInfo1>
                    <ProfileInfo1>{child[2]}</ProfileInfo1>
                  </ProfileInfoContainer>
                </ChildCard>
              ))}
            </ChildCardList>
          </ChildListContainer>
        </LeftContainer>
        <RightContainer>
          <ChildUpDiv />
          <ChildLowDiv />
        </RightContainer>
      </ChildManageContainer>
    </StyledChildManage>
  );
};

export default ChildManage;
