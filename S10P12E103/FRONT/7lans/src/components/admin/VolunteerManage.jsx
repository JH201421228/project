import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import NormalNav from "../navs/NormalNav";
import VolUpDiv from "./VolUpDiv";
import VolLowDiv from "./VolLowDiv";
import { adminSelectVol } from "../../store/adminSelectVolSlice";
import { useDispatch, useSelector } from "react-redux";
import getEnv from "../../utils/getEnv";

const StyledVolunteerManage = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fde79b;
  height: 80vh;
  margin-top: 100px;
`;

const VolunteerManageContainer = styled.div`
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
  height: 100%;
  background-color: #fde79b;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const VolunteerListContainer = styled.div`
  flex: 1;
  background-color: #fffdf6;
  border-radius: 20px;
  border: solid 3px black;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: -10px;
`;

// VolunteerListContainer의 컨텐츠들
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

const VolunteerCardList = styled.div`
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

const VolunteerCard = styled.div`
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
  display: flex; /* Flexbox 사용 */
  flex-direction: row; /* 가로 방향으로 배치 */
  justify-content: space-between; /* 요소들을 좌우로 배치 */
  align-items: center; /* 요소들을 수직으로 정렬 */
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
  margin-bottom: 10px;
  margin-right: 30px;
`;

const ProfileInfoEmail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: medium;
  width: 150px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 30px;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const VolunteerManage = () => {
  const urlInfo = getEnv("API_URL");
  const dispatch = useDispatch();

  // 카드 선택하기
  const [selectedCard, setSelectedCard] = useState(null);
  // 검색어 상태
  const [search, setSearch] = useState("");
  // 봉사자 리스트
  const [volunteerList, setVolunteerList] = useState([]);

  useEffect(() => {
    axios
      .get(`${urlInfo}/volunteer/list`)
      .then((response) => {
        const arr = [];
        for (const ele of response.data) {
          // console.log(ele, "봉사자 volunteerManage");
          let name, email, time, id, img;
          for (const el in ele) {
            if (el === "volunteerName") {
              name = ele[el];
            }
            if (el === "volunteerEmail") {
              email = ele[el];
            }
            if (el === "volunteerTime") {
              time = ele[el];
            }
            if (el === "volunteerId") {
              id = ele[el];
            }
            if (el === "volunteerProfileImgPath") {
              img = ele[el];
            }
          }
          arr.push([name, email, time, id, img]);
          // console.log(arr);
        }
        setVolunteerList(arr);
      })
      .catch((error) => {
        console.error(error, "err -> volunteerManage");
      });
  }, []);

  const handleVolunteerClick = (volunteer, index) => {
    setSelectedCard(index);
    dispatch(adminSelectVol(volunteer));
  };
  // 검색함수
  const filteredVolunteers = volunteerList.filter((volunteer) =>
    volunteer.some(
      (property) =>
        typeof property === "string" &&
        property.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <StyledVolunteerManage>
      <NormalNav />
      <VolunteerManageContainer>
        <LeftContainer>
          <VolunteerListContainer>
            <h2>봉사자 목록</h2>
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder="봉사자 이름, 이메일 검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </SearchContainer>
            <VolunteerCardList>
              {/* 검색 결과에 따라 동적으로 VolunteerCard를 생성 */}
              {filteredVolunteers.map((volunteer, index) => (
                <VolunteerCard
                  key={index}
                  onClick={() => handleVolunteerClick(volunteer, index)}
                >
                  <ProfileImage src={volunteer[4]} />
                  <ProfileInfoContainer>
                    <ProfileInfo>{volunteer[0]} 봉사자</ProfileInfo>
                    <ProfileInfoEmail>email : {volunteer[1]}</ProfileInfoEmail>
                  </ProfileInfoContainer>
                </VolunteerCard>
              ))}
            </VolunteerCardList>
          </VolunteerListContainer>
        </LeftContainer>
        <RightContainer>
          <VolUpDiv />
          <VolLowDiv />
        </RightContainer>
      </VolunteerManageContainer>
    </StyledVolunteerManage>
  );
};

export default VolunteerManage;
