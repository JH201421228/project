import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import getEnv from "../../utils/getEnv";
import { adminAddFriend } from "../../store/adminAddFriendSlice";
import { adminDeleteFriend } from "../../store/adminDeleteFriendSlice";
import ProfileExample from "../../images/admin_pic/profile_example.png";

const LowerDiv = styled.div`
  flex: 1.7;
  margin-left: -10px;
  max-height: 50vh;
  background-color: #fffdf6;
  border-radius: 20px;
  border: solid 3px black;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 내부 요소 수직 가운데 정렬 */
  align-items: center; /* 내부 요소 수평 가운데 정렬 */
  position: relative; /* PaginationContainer의 위치를 상대적으로 설정하기 위해 */
`;

const LowerProfileImage = styled.img`
  border: solid grey 2px;
  border-radius: 50%;
  width: 60px;
  height: 70px;
  margin-bottom: 10px;
`;

const LowerProfileCard = styled.div`
  position: relative;
  width: 150px;
  height: 200px;
  margin: 15px;
  padding: 10px;
  border: 2px solid black;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgb(45, 45, 45);
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

const ProfileInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 10px;
`;

const ProfileItem = styled.div`
  margin-bottom: 10px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff8f8f;
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: transform 0.3s ease; /* 애니메이션 효과 추가 */

  &:hover {
    transform: scale(1.2); /* 호버 시 크기 조절 */
  }
`;

const DeleteModal = styled.div`
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

const DeleteModalContent = styled.div`
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

const PaginationContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  margin: 5px;
  background-color: #f2f2f2;
  color: #333333;
  border: none;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  transition: all 0.5s;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: #4caf50;
    color: #ffffff;
  }

  &:active {
    background-color: #4caf50;
    color: white;
  }
`;

const ProfileContainer = styled.div`
  flex: 3;
  margin-left: -10px;
  margin-bottom: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const NoticeContainer = styled.div`
  display: flex;
  flex: 0.5;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

const VolLowDiv = () => {
  const urlInfo = getEnv("API_URL");
  const selectVolCard = useSelector((state) => state.adminSelectVol);
  const addFriend = useSelector((state) => state.adminAddFriend);
  const [childList, setChildList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [relationId, setRelationId] = useState(null);
  const volId = selectVolCard.value[3];
  const volName = selectVolCard.value[0];
  const dispatch = useDispatch();

  // 페이지네이션 관련 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // 페이지네이션에 따라 보여줄 리스트
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = childList.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지네이션 버튼 클릭 핸들러
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  // console.log(addFriend, "addFreind");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${urlInfo}/child/listByVolunteer/${volId}`
        );
        setChildList(response.data);
      } catch (error) {
        console.log(error, "err -> VolLowDiv");
      }
    };
    dispatch(adminAddFriend(false));
    fetchData();
  }, [volId, addFriend]);

  const handleDeleteClick = (relationId) => {
    setShowDeleteModal(true);
    setRelationId(relationId);
  };

  const handleConfirmDelete = () => {
    axios
      .post(`${urlInfo}/relation/delete`, {
        relationId: relationId,
      })
      .then((res) => {
        // console.log(res, "친구끊기");
        setChildList((prevChildList) =>
          prevChildList.filter((child) => child.relationId !== relationId)
        );
        dispatch(adminDeleteFriend(true));
      })
      .catch((err) => {
        console.log(err, "err -> VolLowDiv 친구끊기 오류");
      });
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [volId]);

  return (
    <>
      <LowerDiv>
        <NoticeContainer>{volName} 봉사자와 연결된 아동들</NoticeContainer>
        <ProfileContainer>
          {currentItems.map((child) => (
            <LowerProfileCard key={child.relationId}>
              <LowerProfileImage
                src={child.childProfileImagePath}
                alt="Profile"
              />
              <DeleteButton onClick={() => handleDeleteClick(child.relationId)}>
                X
              </DeleteButton>
              <ProfileInfo>
                <ProfileItem>{child.childName}</ProfileItem>
                <ProfileItem>{child.childBirth}</ProfileItem>
                <ProfileItem>{child.childCenterName}</ProfileItem>
              </ProfileInfo>
            </LowerProfileCard>
          ))}
        </ProfileContainer>
        <PaginationContainer>
          {Array.from(
            Array(Math.ceil(childList.length / itemsPerPage)),
            (e, i) => {
              return (
                <PaginationButton key={i} id={i + 1} onClick={handleClick}>
                  {i + 1}
                </PaginationButton>
              );
            }
          )}
        </PaginationContainer>
      </LowerDiv>
      {showDeleteModal && (
        <DeleteModal>
          <DeleteModalContent>
            정말 삭제하시겠습니까?
            <ButtonContainer>
              <ConfirmButton onClick={handleConfirmDelete}>확인</ConfirmButton>
              <CancelButton onClick={handleCancelDelete}>취소</CancelButton>
            </ButtonContainer>
          </DeleteModalContent>
        </DeleteModal>
      )}
    </>
  );
};

export default VolLowDiv;
