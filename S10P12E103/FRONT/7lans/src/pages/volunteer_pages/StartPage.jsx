import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CommonSidePanel from '../../components/side_panels/CommonSidePanel';
import NormalNav from '../../components/navs/NormalNav';
import PostIt from '../../components/volunteer/post_it/PostIt';
import Correct from '../../components/dinosaur/Correct';
import { useDispatch, useSelector } from 'react-redux';
import Wrong from '../../components/dinosaur/Wrong';
import { updateChildInfo } from '../../store/childSlice';


const RightSide = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  border-radius: 0 20px 20px 0;
  background-color: rgb(255, 255, 255, 0.9);
  /* border: 2px solid rgb(255, 183, 58);
  border-left: none; */

`

const TextandimageBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 400px;
`

const StartPage = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateChildInfo(''))
  }, [])

  const childInfo = useSelector((state) => state.child.value)
  const childrenInfo = useSelector((state) => state.children.value)

  // console.log(childInfo)
  // console.log(childrenInfo)
  
  return (
    <>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
    }}>
      <NormalNav />
      <div style={{ marginTop: "5.7%" }}></div>
        <div
          style={{
            height: "650px",
            padding: "30px",
            paddingBottom: "20px",
            backgroundColor: "rgb(255, 226, 123)",
          }}
        >
        <div style={{height: '100%', 
                      width: '100%', 
                      display: 'flex', 
                      flexDirection: 'row',
                      borderRadius: '20px', 
                      backgroundColor: 'rgb(255, 226, 123)'}}>
          <CommonSidePanel />
          <RightSide>
            {childrenInfo?
              <TextandimageBox>
                <h1>
                함께할 아이를 선택해주세요
                </h1>
                <Correct/>
              </TextandimageBox>
              :
              <TextandimageBox>
                <h1 style={{paddingTop: '4rem'}}>
                  함께 할 아이가 없어요
                </h1>
                <Wrong />
              </TextandimageBox>
            }
          </RightSide>
          {childrenInfo?
            <div style={{width: '10%', backgroundColor: 'rgb(255, 226, 123)'}}>
              <PostIt message={'/volunteer_video_chatting_start'}/>
              <PostIt message={'/volunteer_active_doc'}/>
              <PostIt message={'/volunteer_whispher'}/>
              <PostIt message={'/volunteer_raise_egg'}/>
            </div>
            :
            ''
          }
        </div>
          <div style={{display: 'flex', flexDirection: 'column', position: 'absolute', right: '2%', top: '10rem'}}>
          </div>
      </div>
    </div>
    </>
  );
};

export default StartPage;
