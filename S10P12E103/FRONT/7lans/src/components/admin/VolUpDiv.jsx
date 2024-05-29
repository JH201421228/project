import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import getEnv from "../../utils/getEnv";
import { adminAddFriend } from "../../store/adminAddFriendSlice";
import { adminDeleteFriend } from "../../store/adminDeleteFriendSlice";

const UpperDiv = styled.div`
  flex: 0.4;
  background-color: #fffdf6;
  border-radius: 20px;
  border-radius: 20px;
  border: solid 3px black;
  margin-bottom: 15px;
  margin-left: -10px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileCard = styled.div`
  width: 40%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 100px;
`;

const ProfileImage = styled.img`
  border: solid gray 3px;
  border-radius: 50%;
  width: 100px;
  height: 100px;
`;

const ChildProfileImage = styled.img`
  border: solid gray 2px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

const InformationSection = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 90px;
  font-size: 20px;
`;

const SearchContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 70px;
`;

const ChildSearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const ChildList = styled.div`
  flex-direction: column;
  width: 100%;
  height: 100px;
  overflow-y: auto;
  position: relative;
  justify-content: center;
  align-items: center;
  margin-left: -70px;
`;

const SearchChildContainer = styled.div`
  height: 100%;
  width: 70%;
  border-radius: 10px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
`;

const ChildCard = styled.div`
  width: 90%;
  height: 100px;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 15px;
  border: grey 1px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  transition: transform 0.3s ease;
  cursor: pointer;
  position: relative;
  box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
  }
`;

const GetFriendBtn = styled.button`
  background-color: #ff8f8f;
  color: #ffffff;
  border: 2px solid #ffb6c1;
  border-radius: 30px;
  padding: 3px 6px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    background-color: #ffc0cb;
  }

  &:focus {
    outline: none;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  font-size: larger;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
`;

const ConfirmButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
`;

function VolUpDiv() {
  const selectVolCard = useSelector((state) => state.adminSelectVol.value);
  const userInfo = useSelector((state) => state.user);
  const urlInfo = getEnv("API_URL");
  const centerId = userInfo.value.centerId;
  const deleteFriend = useSelector((state) => state.adminDeleteFriend);
  const [childList, setChildList] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [childId, setChildId] = useState("");
  const dispatch = useDispatch();
  let name, email, time, volId, profileImg;
  name = selectVolCard[0];
  email = selectVolCard[1];
  time = selectVolCard[2];
  volId = selectVolCard[3];
  profileImg = selectVolCard[4];

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    axios
      .post(`${urlInfo}/child/centerAndVolunteerNoRelation`, {
        childCenterId: centerId,
        volunteerId: volId,
      })
      .then((response) => {
        const arr = response.data.map((element) => {
          const birthYear = new Date(element.childBirth).getFullYear();
          const currentYear = new Date().getFullYear();
          const age = currentYear - birthYear;

          return {
            childName: element.childName,
            centerName: element.childCenterName,
            childBirth: element.childBirth,
            childId: element.childId,
            childImg: element.childProfileImgPath,
            childAge: age,
          };
        });
        setChildList(arr);
        dispatch(adminDeleteFriend(false));
      })
      .catch((err) => {
        console.error(err, "err -> VolUpDiv");
      });
  }, [volId, deleteFriend]);

  const filteredChilds = childList.filter((child) =>
    Object.values(child).some(
      (property) =>
        typeof property === "string" &&
        property.toLowerCase().includes(search.toLowerCase())
    )
  );

  const onClick = (childId) => {
    setChildId(childId);
    setShowModal(true);
  };

  const handleAddFriend = () => {
    axios
      .post(`${urlInfo}/relation/create`, {
        childId: childId,
        volunteerId: volId,
      })
      .then((res) => {
        // console.log("친구맺기 성공");
        setChildList((prevChildList) =>
          prevChildList.filter((child) => child.childId !== childId)
        );
        dispatch(adminAddFriend(true));
      })
      .catch((err) => {
        console.error(err, "친구맺기 오류 -> VolUpDiv");
      });
    setShowModal(false);
  };

  return (
    <>
      <UpperDiv>
        <ProfileCard>
          <ProfileImage src={profileImg} alt="Profile" />
        </ProfileCard>
        <InformationSection>
          <p>봉사자 이름 : {name}</p>
          <p>email : {email}</p>
          <p>총 봉사시간 : {time ? time : 0}</p>
        </InformationSection>
        <SearchChildContainer>
          <SearchContainer>
            <ChildSearchInput
              type="text"
              placeholder="아동이름 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchContainer>
          <ChildList>
            {filteredChilds.map((child, index) => (
              <ChildCard key={index}>
                <ChildProfileImage src={child.childImg} />
                <h6>{child.childName}</h6>
                <h6>({child.childAge}살)</h6>
                <GetFriendBtn onClick={() => onClick(child.childId)}>
                  친구추가
                </GetFriendBtn>
              </ChildCard>
            ))}
          </ChildList>
        </SearchChildContainer>
      </UpperDiv>
      {showModal && (
        <Modal>
          <ModalContent>
            <p>친구 추가하시겠습니까?</p>
            <ButtonContainer>
              <ConfirmButton onClick={handleAddFriend}>확인</ConfirmButton>
              <CancelButton onClick={closeModal}>취소</CancelButton>
            </ButtonContainer>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default VolUpDiv;
