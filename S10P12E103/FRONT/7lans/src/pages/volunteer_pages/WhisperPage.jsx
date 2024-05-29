import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonSidePanel from "../../components/side_panels/CommonSidePanel";
import NormalNav from "../../components/navs/NormalNav";
import PostIt from "../../components/volunteer/post_it/PostIt";
import SelectedPostit from "../../components/volunteer/post_it/SelectedPostit";
import WhisperFirst from "../../components/volunteer/whisper/WhisperFirst";
import WhisperLetter from "../../components/volunteer/whisper/WhisperLetter";
import styled from "styled-components";
import { viewLetter } from "../../store/viewLetterSlice";

const RightSide = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-content: center;
  border-radius: 0 20px 20px 0;
  background-color: rgb(255,255,255, 0.9);
`
const WhisperPage = () => {
  const change = useSelector((state) => state.viewletter.value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewLetter(false));
  }, []);

  const childInfo = useSelector((state) => state.child.value)

  return (
    <>
      <NormalNav />
      <div style={{ marginTop: "5.7%" }}>
      <div style={{ height: '650px',
                    padding: '30px', 
                    paddingBottom: "20px",
                    backgroundColor: 'rgb(255, 226, 123)'}}>
        <div style={{height: '100%', 
                      width: '100%', 
                      display: 'flex', 
                      flexDirection: 'row',
                      borderRadius: '20px', 
                      backgroundColor: 'rgb(255, 226, 123)'}}>
          <CommonSidePanel />

          <RightSide>
            {childInfo ? <WhisperLetter /> : <WhisperFirst />}
          </RightSide>

          <div style={{ width: "10%", backgroundColor: "rgb(255, 226, 123)" }}>
            <PostIt message={"/volunteer_video_chatting_start"} />
            <PostIt message={"/volunteer_active_doc"} />
            <SelectedPostit message={"/volunteer_whispher"} />
            <PostIt message={"/volunteer_raise_egg"} />
          </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', position: 'absolute', right: '2%', top: '10rem'}}>
          </div>
      </div>
      </div>
    </>
  );
};

export default WhisperPage;
