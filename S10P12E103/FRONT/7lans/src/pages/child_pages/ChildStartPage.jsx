import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NormalNav from '../../components/navs/NormalNav';
import Correct from '../../components/dinosaur/Correct';
import { useDispatch, useSelector } from 'react-redux';
import Wrong from '../../components/dinosaur/Wrong';
import ChildPostit from '../../components/volunteer/post_it/ChildPostit';
import ChildCommonSidePanel from '../../components/side_panels/ChildCommonSidePanel';
import { updateVolInfo } from '../../store/volSlice';


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

const ChildStartPage = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateVolInfo(''))
  }, [])

  const volInfo = useSelector((state) => state.vol.value)
  const volsInfo = useSelector((state) => state.vols.value)

  // console.log(volInfo)
  // console.log(volsInfo)
  
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
      <div style={{ height: '650px',
                    padding: '30px',
                    paddingBottom: '20px',
                    backgroundColor: 'rgb(255, 226, 123)'}}>
        <div style={{height: '100%', 
                      width: '100%', 
                      display: 'flex', 
                      flexDirection: 'row',
                      borderRadius: '20px', 
                      backgroundColor: 'rgb(255, 226, 123)'}}>
          <ChildCommonSidePanel />
          <RightSide>
            {volsInfo?
              <TextandimageBox>
                <h1>
                함께할 선생님을 선택해주세요
                </h1>
                <Correct/>
              </TextandimageBox>
              :
              <TextandimageBox>
                <h1 style={{paddingTop: '4rem'}}>
                  함께 할 선생님이 없어요
                </h1>
                <Wrong />
              </TextandimageBox>
            }
          </RightSide>
          {volsInfo?
            <div style={{width: '10%', backgroundColor: 'rgb(255, 226, 123)'}}>
              <ChildPostit message={'/child_video_chatting_start'}/>
              <ChildPostit message={'/child_whispher'}/>
              <ChildPostit message={'/child_raise_egg'}/>
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

export default ChildStartPage;