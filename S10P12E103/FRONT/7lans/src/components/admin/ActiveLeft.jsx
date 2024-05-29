import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import getEnv from "../../utils/getEnv";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import { adminSelectAcitve } from "../../store/adminSelectActiveSlice";
import { adminApproveBtn } from "../../store/adminApproveBtnSlice";
import { adminNoList } from "../../store/adminNoListSlice";
import { adminAddFriend } from "../../store/adminAddFriendSlice";

const LeftContainer = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;

const SearchBar = styled.input`
  width: 55%;
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid #ddd;
  border-radius: 5px;
`;

const ActiveList = styled.div`
  flex-direction: column;
  overflow-y: auto;
  max-height: 100vh;
  width: 90%;
  height: 100%;
  padding: -500px;
  margin-left: -80px;
  border-radius: 20px;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const PostContainer = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 62%;
  margin-bottom: 15px;
  margin-left: 200px;
  padding: 15px;
  border: 2px solid black;
  border-radius: 10px;
  cursor: pointer;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cbf3f0;
  }

  &.selected {
    background-color: #2ec4b6;
    animation: none;
  }
`;

const PostTitle = styled.h4`
  color: #333;
  margin-bottom: 5px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InfoLabel = styled.p`
  color: #666;
  margin-right: 10px;
  margin-bottom: 5px;
  min-width: 60px;
`;

const InfoValue = styled.p`
  color: #333;
  margin-bottom: 5px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  text-align: center;
  flex: 1;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 20px;
`;

const ToggleBtn = styled.input`
  position: relative;
  height: 30px;
  width: 60px;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  border-radius: 30px;
  background-color: ${({ isApproved }) => (isApproved ? "#2ecc71" : "#ff6b81")};
  transition: background-color 0.3s ease;
  outline: none;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: ${({ isApproved }) => (isApproved ? "calc(100% - 25px)" : "5px")};
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    transition: left 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:checked::before {
    left: ${({ isApproved }) => (isApproved ? "5px" : "calc(100% - 25px)")};
  }
`;

const NoSearchContainer = styled.div`
  display: flex;
  font-size: larger;
  justify-content: center;
  align-items: center;
  height: 30%;
  margin-left: 140px;
`;

const filterPosts = (posts, searchTerm) => {
  return posts.filter((post) => {
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    const { volunteerName, childName, activityId, dateInfo } = post;
    return (
      (volunteerName &&
        volunteerName.toLowerCase().includes(lowercaseSearchTerm)) ||
      (childName && childName.toLowerCase().includes(lowercaseSearchTerm)) ||
      (activityId && activityId.toString().includes(searchTerm)) ||
      (dateInfo && dateInfo.includes(searchTerm)) // 작성시간 검색 추가
    );
  });
};

const ActiveLeft = () => {
  const [posts, setPosts] = useState([]);
  const [approvePosts, setApprovePosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const isApproval = useSelector((state) => state.adminApproveBtn.value);
  const urlInfo = getEnv("API_URL");
  const userInfo = useSelector((state) => state.user);
  const centerId = userInfo.value.centerId;
  const stateCheck = useSelector((state) => state.adminAddFriend);
  const dispatch = useDispatch();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${urlInfo}/activityLog/manager/disapprovedList/${centerId}`
      );
      // console.log(response.data, "ActiveManage 승인안된 활동일지리스트");
      setPosts(response.data);
      dispatch(adminAddFriend(false));
    } catch (error) {
      console.error("Error ActiveLeft", error);
    }
  };

  const fetchApprovePosts = async () => {
    try {
      const response = await axios.get(
        `${urlInfo}/activityLog/manager/approvedList/${centerId}`
      );
      // console.log(response.data, "ActiveManage 승인되어버린 활동일지리스트");
      setApprovePosts(response.data);
      dispatch(adminAddFriend(false));
    } catch (error) {
      console.error("Error ActiveLeft", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchApprovePosts();
  }, [stateCheck]);

  const filteredPosts = filterPosts(posts, searchTerm);
  const filteredApprovePosts = filterPosts(approvePosts, searchTerm);

  const onClick = (activityId, relationId, index) => {
    if (index === selectedPostIndex) {
      setSelectedPostIndex(null);
    } else {
      dispatch(adminSelectAcitve({ activityId, relationId }));
      setSelectedPostIndex(index);
    }
  };

  const toggleApprovalStatus = () => {
    dispatch(adminApproveBtn());
    setSelectedPostIndex(null);
  };

  useEffect(() => {
    dispatch(
      adminNoList({
        filteredListLen: filteredPosts.length,
        filteredApproveListLen: filteredApprovePosts.length,
      })
    );
  }, [filteredPosts.length, filteredApprovePosts.length, isApproval]);

  return (
    <>
      <LeftContainer>
        <Header>
          <Title>
            {isApproval
              ? "승인이 '완료된' 활동일지 목록"
              : "승인이 '필요한' 활동일지 목록"}{" "}
            {isApproval ? <span>&#128036;</span> : <span>&#128035;</span>}
          </Title>
        </Header>
        <SearchContainer>
          <SearchBar
            type="text"
            placeholder="봉사자, 학생, 작성날짜으로 검색 가능"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ToggleContainer>
            <ToggleBtn
              type="checkbox"
              checked={isApproval}
              onChange={toggleApprovalStatus}
              title={
                isApproval ? "미승인 목록으로 변경" : "승인된 목록으로 변경"
              }
            />
          </ToggleContainer>
        </SearchContainer>
        {isApproval ? (
          <ActiveList>
            {filteredApprovePosts.length > 0 ? (
              filteredApprovePosts.map((post, index) => (
                <PostContainer
                  key={index}
                  onClick={() =>
                    onClick(post.activityId, post.relationId, index)
                  }
                  className={index === selectedPostIndex ? "selected" : ""}
                >
                  <PostTitle>봉사 날짜: {post.dateInfo}</PostTitle>
                  <Info>
                    <InfoLabel>봉사자:</InfoLabel>
                    <InfoValue>{post.volunteerName}</InfoValue>
                  </Info>
                  <Info>
                    <InfoLabel>아동:</InfoLabel>
                    <InfoValue>{post.childName}</InfoValue>
                  </Info>
                </PostContainer>
              ))
            ) : (
              <LeftContainer>
                <NoSearchContainer>검색 결과가 없습니다.</NoSearchContainer>
              </LeftContainer>
            )}
          </ActiveList>
        ) : (
          <ActiveList>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <PostContainer
                  key={index}
                  onClick={() =>
                    onClick(post.activityId, post.relationId, index)
                  }
                  className={index === selectedPostIndex ? "selected" : ""}
                >
                  <PostTitle>봉사 날짜: {post.dateInfo}</PostTitle>
                  <Info>
                    <InfoLabel>봉사자:</InfoLabel>
                    <InfoValue>{post.volunteerName}</InfoValue>
                  </Info>
                  <Info>
                    <InfoLabel>아동:</InfoLabel>
                    <InfoValue>{post.childName}</InfoValue>
                  </Info>
                </PostContainer>
              ))
            ) : (
              <LeftContainer>
                <NoSearchContainer>검색 결과가 없습니다.</NoSearchContainer>
              </LeftContainer>
            )}
          </ActiveList>
        )}
      </LeftContainer>
    </>
  );
};

export default ActiveLeft;
