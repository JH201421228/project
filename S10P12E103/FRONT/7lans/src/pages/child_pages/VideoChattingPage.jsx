import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux"
import {useNavigate, useParams} from 'react-router-dom';
import ChildGameNav from "../../components/navs/ChildGameNav.jsx";
import UseOpenViduSession from "../../helpers/useOpenViduSession.jsx";
import VideoChattingLobby from "./VideoChattingLobby.jsx";
import ChildGamePage from "./ChildGamePage.jsx";
import VideoChattingExit from "./VideoChattingExit.jsx";
import {getMeetingDetail} from "../../api/axioses"


const VideoChattingPage = () => {
  const {
    session, mainStreamManager, subscribers,
    sessionCreatedAt,
    joinSession, renderUserVideoComponent,
    toggleCamera, toggleMic,
    mySessionId, setMySessionId
  } = UseOpenViduSession();

  // TODO 현재 작업중 (네브바 게임 인덱스 원활하게 수정중)
  const [selectedGameIdx, setSelectedGameIdx] = useState(0)
  const [gameChangeable, setGameChangeable] = useState(true)

  const [meetingValid, setMeetingValid] = useState(true)
  const userInfo = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  const [isMyCameraOn, setIsMyCameraOn] = useState(true)
  const [isMyMicOn, setIsMyMicOn] = useState(true)
  const [isVolunteerCameraOn, setIsVolunteerCameraOn] = useState(true)
  const [isVolunteerMicOn, setIsVolunteerMicOn] = useState(true)

  const [isSessionEnd, setIsSessionEnd] = useState(false);
  const [capturedImages, setCapturedImages] = useState([
  ]);

  const { meetingId } = useParams();

  // 페이지 로드시 세션 아이디를 미팅 아이디로 연결
  useEffect(() => {
    if (meetingValid) {
      setMySessionId(meetingId)
    }
  }, [meetingValid]);

  // 미팅아이디가 확정됐을 때 해당 세션명으로 세션 생성
  useEffect(() => {
    if (mySessionId.trim()) {
      joinSession();
    }
  }, [mySessionId]);

  // 페이지 이탈시 세션 디스커넥트하게 설정
  useEffect(() => {
    return () => {
      if (session) {
        session.disconnect();
      }
    }
  }, [session]);


  /**
   * 로그인된 사용자가 해당 미팅에 참여할 수 있는지 확인합니다.
   * - 로그인된 사용자 정보가 있으면 미팅의 세부 정보를 가져옵니다.
   * - 미팅의 참여자 ID가 사용자 ID와 일치하지 않으면, 메인 페이지로 이동합니다.
   * - 일치하면, 미팅 참여 상태를 true로 설정합니다.
   */
  useEffect(() => {
    const fetchData = async () => {
      if (userInfo !== null) {
        const meetingData = await getMeetingDetail(meetingId);
        // console.log(meetingData)
        if (meetingData.childId !== userInfo.memberId &&
          meetingData.volunteerId !== userInfo.memberId) {
          navigate('/'); // 메인페이지로 이동
        } else {
          setMeetingValid(true);
        }
      }
    }
    fetchData();
  }, [userInfo, navigate]);


  const toggleMyCamera = () => {
    const prevState = isMyCameraOn;
    setIsMyCameraOn(!prevState);
    toggleCamera(!prevState);
    session.signal({
      type: 'toggleCamera',
      data: JSON.stringify({
        userId: userInfo.memberId,
        status: !prevState,
      })
    })
      .then(() => console.log(`카메라 토글 신호 보냄`))
      .catch(err => console.log(err))
  }


  const toggleMyMic = () => {
    const prevState = isMyMicOn;
    setIsMyMicOn(!prevState);
    toggleMic(!prevState);
    session.signal({
      type: 'toggleMic',
      data: JSON.stringify({
        userId: userInfo.memberId,
        status: !prevState,
      })
    })
      .then(() => console.log(`마이크 토글 신호 보냄`))
      .catch(err => console.log(err))
  }

  const toggleGameStarted = () => {
    setGameStarted(prevState => !prevState);
  };


  const signalToggleGameStarted = () => {
    session.signal({
      type: 'toggleGame'
    })
      .then(() => console.log(`게임 상태 토글됨`))
      .catch(err => console.log(err))
  }

  const receiveToggleGameStarted = () => {
    toggleGameStarted();
  }


  const receiveToggleCamera = (event) => {
    const signalData = JSON.parse(event.data);
    const cameraStatus = signalData.status;
    const signalUser = signalData.userId;
    if (signalUser !== userInfo.memberId && isMyMicOn) {
      setIsVolunteerCameraOn(cameraStatus);
    }


  }

  const receiveToggleMic = (event) => {
    const signalData = JSON.parse(event.data);
    const micStatus = signalData.status;
    const signalUser = signalData.userId;

    if (signalUser !== userInfo.memberId && isMyMicOn) {
      setIsVolunteerMicOn(micStatus);
    }
  }

  const exitSessionSignal = () => {
    session.signal({
      type: 'exitSession'
    })
      .then(() => console.log(`세션 종료 신호 보냄`))
      .catch(err => console.log(err))
  }

  const receiveExitSessionSignal = ((event) => {
    setIsSessionEnd(true);
  })

  useEffect(() => {
    if (session) {
      session.on('signal:toggleGame', receiveToggleGameStarted);
      session.on('signal:toggleCamera', receiveToggleCamera);
      session.on('signal:toggleMic', receiveToggleMic);
      session.on('signal:exitSession', receiveExitSessionSignal);
    }

    return () => {
      if (session) {
        session.off('signal:toggleGame', receiveToggleGameStarted);
        session.off('signal:toggleCamera', receiveToggleCamera);
        session.off('signal:toggleMic', receiveToggleMic);
        session.off('signal:exitSession', receiveExitSessionSignal);
      }
    }
  }, [session]);


  // const [selectedGameIdx, setSelectedGameIdx] = useState(0)
  // const [gameChangeable, setGameChangeable] = useState(true)
  return (
    <>
      <ChildGameNav
        exitSessionSignal={exitSessionSignal}
        setCapturedImages={setCapturedImages}
        sessionCreatedAt={sessionCreatedAt}
        session={session}
        capturedImages={capturedImages}
        setSelectedGameIdx={setSelectedGameIdx}
        gameChangeable={gameChangeable}
        setGameChangeable={setGameChangeable}
      />
      <div style={{marginTop: "5.7%", display: 'flex', flexDirection: 'row', gap: '40px' }}>
        {!isSessionEnd ? ( // Change here
          selectedGameIdx > 0
            ? <ChildGamePage
              renderUserVideoComponent={renderUserVideoComponent}
              mainStreamManager={mainStreamManager}
              subscribers={subscribers}
              session={session}
              toggleMyCamera={toggleMyCamera}
              toggleMyMic={toggleMyMic}
              isMyCameraOn={isMyCameraOn}
              isMyMicOn={isMyMicOn}
              isVolunteerCameraOn={isVolunteerCameraOn}
              isVolunteerMicOn={isVolunteerMicOn}
              selectedGameIdx={selectedGameIdx}
              setGameChangeable={setGameChangeable}
            />
            : <VideoChattingLobby
              renderUserVideoComponent={renderUserVideoComponent}
              mainStreamManager={mainStreamManager}
              subscribers={subscribers}
              toggleMyCamera={toggleMyCamera}
              toggleMyMic={toggleMyMic}
              isMyCameraOn={isMyCameraOn}
              isMyMicOn={isMyMicOn}
              isVolunteerCameraOn={isVolunteerCameraOn}
              isVolunteerMicOn={isVolunteerMicOn}
              />
        ) : (
            <VideoChattingExit
              capturedImages={capturedImages}
              session={session}/>
          )

        }
      </div>
    </>
  );
};

export default VideoChattingPage;
