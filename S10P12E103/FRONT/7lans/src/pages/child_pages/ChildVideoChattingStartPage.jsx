import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import NormalNav from '../../components/navs/NormalNav';
import { useDispatch, useSelector } from 'react-redux';
import Wrong from '../../components/dinosaur/Wrong';
import SelectedChildPostit from '../../components/volunteer/post_it/SelectedChildPostit';
import ChildPostit from '../../components/volunteer/post_it/ChildPostit';
import ChildCommonSidePanel from '../../components/side_panels/ChildCommonSidePanel';
import ChildCalendar from '../../components/volunteer/calendar/ChildCalendar';
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

const ChildVideoChattingStartPage = () => {
  const [data, setData] = useState(0);
  const volInfo = useSelector((state) => state.vol.value)
  const volsInfo = useSelector((state) => state.vols.value)
  const dispatch = useDispatch()
  // console.log(volInfo)

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
          <ChildCommonSidePanel />
          <RightSide>
            {volInfo? 
              <ChildCalendar 
                child={data}
              />
              :
              <>
                {volsInfo?
                  <TextandimageBox>
                    <h1>
                      함께할 선생님을 선택해주세요
                    </h1>
                    <Correct/>
                  </TextandimageBox>
                  :
                  <NoChild>
                    <p>
                      연결된 선생님이 없어요
                    </p> 
                  <Wrong/>
                  </NoChild>
                }
              </>
            }     
          </RightSide>

          <div style={{width: '10%', backgroundColor: 'rgb(255, 226, 123)'}}>
            <SelectedChildPostit message={'/child_video_chatting_start'}/>
            <ChildPostit message={'/child_whispher'}/>
            <ChildPostit message={'/child_raise_egg'}/>
          </div>
        </div>
          <div style={{display: 'flex', flexDirection: 'column', position: 'absolute', right: '2%', top: '10rem'}}>
          </div>
      </div>
      </div>
    </>
  );
};

export default ChildVideoChattingStartPage;
