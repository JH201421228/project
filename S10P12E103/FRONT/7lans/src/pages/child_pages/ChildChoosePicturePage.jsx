import React from 'react';
import { useNavigate } from 'react-router-dom';
import NormalNav from '../../components/navs/NormalNav'
import ChildCommonSidePanel from '../../components/side_panels/ChildCommonSidePanel'
import Picture from '../../components/volunteer/calendar/Picture'
import PostIt from '../../components/volunteer/post_it/PostIt';
import SelectedPostit from '../../components/volunteer/post_it/SelectedPostit';
import styled from 'styled-components';

const RightSide = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-content: center;
  border-radius: 0 20px 20px 0;
  background-color: rgb(29, 73, 11);
`

const ChildChoosePicturePage = () => {
  const navigate = useNavigate(); // useNavigate 함수를 호출하여 navigate 함수를 가져옴
  
  return (
    <>

      <NormalNav />
      <div style={{ marginTop: "5.7%" }}>
        <div
          style={{
            height: "650px",
            padding: "30px",
            paddingBottom: "20px",
            backgroundColor: "rgb(255, 226, 123)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              borderRadius: "20px",
              backgroundColor: "rgb(255, 226, 123)",
            }}
          >
          <ChildCommonSidePanel/>
          <RightSide>
            <Picture/>
          </RightSide>

          
          <div style={{width: '10%', backgroundColor: 'rgb(255, 226, 123)'}}>
            <SelectedPostit message={'/child_video_chatting_start'}/>
            <PostIt message={'/child_whispher'}/>
            <PostIt message={'/child_raise_egg'}/>
          </div>
        </div>
          <div style={{display: 'flex', flexDirection: 'column', position: 'absolute', right: '2%', top: '10rem'}}>
          </div>
        </div>
      </div>      
    </>
  );
}

export default ChildChoosePicturePage