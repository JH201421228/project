import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CommonSidePanel from "../../components/side_panels/CommonSidePanel";
import NormalNav from "../../components/navs/NormalNav";
import PostIt from "../../components/volunteer/post_it/PostIt";
import SelectedPostit from "../../components/volunteer/post_it/SelectedPostit";
import ActiveDocs from "../../components/volunteer/active_docs/AcitveDocs";
import ActivityCalendar from "../../components/volunteer/calendar/ActivityCalendar";
import { useSelector } from "react-redux";

import Correct from '../../components/dinosaur/Correct';
import Wrong from '../../components/dinosaur/Wrong';

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

const TextandimageBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 400px;
`

const NoChild = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 400px;
`

const ActiveDoc = () => {
  const childInfo = useSelector((state) => state.child.value)
  const childrenInfo = useSelector((state) => state.children.value)

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
          <CommonSidePanel />
            <RightSide>
              {childInfo?
                <ActivityCalendar />
                :
                <>
                {childrenInfo?
                  <TextandimageBox>
                    <h1>
                      함께할 아이를 선택해주세요
                    </h1>
                    <Correct/>
                  </TextandimageBox>
                  :
                  <NoChild>
                    <p>
                      연결된 아동이 없어요
                    </p> 
                  <Wrong/>
                  </NoChild>
                }
              </>
            }
            </RightSide>

            <div
              style={{ width: "10%", backgroundColor: "rgb(255, 226, 123)" }}
            >
              <PostIt message={"/volunteer_video_chatting_start"} />
              <SelectedPostit message={"/volunteer_active_doc"} />
              <PostIt message={"/volunteer_whispher"} />
              <PostIt message={"/volunteer_raise_egg"} />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              right: "2%",
              top: "10rem",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ActiveDoc;