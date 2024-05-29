import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import CommonSidePanel from '../../components/side_panels/CommonSidePanel';
import NormalNav from '../../components/navs/NormalNav';
import PostIt from '../../components/volunteer/post_it/PostIt';
import SelectedPostit from '../../components/volunteer/post_it/SelectedPostit';
import VolunteerCalendar from '../../components/volunteer/calendar/VolunteerCalendar';
import { useDispatch, useSelector } from 'react-redux';

import Wrong from '../../components/dinosaur/Wrong';
import Correct from '../../components/dinosaur/Correct';

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

const NoChild = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 400px;
`

const TextandimageBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 400px;
`

const VideoChattingStartPage = () => {
  const [data, setData] = useState(0);
  const childInfo = useSelector((state) => state.child.value)
  const childrenInfo = useSelector((state) => state.children.value)

  // const dispatch = useDispatch()
  // console.log(childInfo)

  
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
          <CommonSidePanel 
            volunteerId={1}
            />
          <RightSide>
            {childInfo? 
              <VolunteerCalendar 
                child={data}
              />
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

          <div style={{width: '10%', backgroundColor: 'rgb(255, 226, 123)'}}>
            <SelectedPostit message={'/volunteer_video_chatting_start'}/>
            <PostIt message={'/volunteer_active_doc'}/>
            <PostIt message={'/volunteer_whispher'}/>
            <PostIt message={'/volunteer_raise_egg'}/>
          </div>
        </div>
          <div style={{display: 'flex', flexDirection: 'column', position: 'absolute', right: '2%', top: '10rem'}}>
          </div>
      </div>
      </div>
    </>
  );
};

export default VideoChattingStartPage;
