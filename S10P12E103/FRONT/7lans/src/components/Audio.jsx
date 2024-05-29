import React, { useState, useCallback } from "react";
import { Howl, Howler } from "howler";
import styled from "styled-components";
import { Tooltip } from "react-tooltip";
import Tree from "../images/tree.png"

const Buttondiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin-left: 10px;
  height: 270px;
`;

const Button = styled.button`
  background: linear-gradient(
    300deg,
    rgba(255, 184, 36, 1),
    rgba(255, 237, 140, 1)
  );
  background-image: url(${Tree}); // 이미지를 배경으로 사용합니다.
  background-size: 250px 300px; 
  background-repeat: no-repeat;
  /* border: 3px solid rgba(45, 45, 45); */
  border: none;
  /* border-radius: 100px; */
  width: 250px;
  height: 300px;
  font-size: 30px;
  padding-top: 210px;
  font-weight: bolder;
`;

const ChildAudioPlay = ({ dinoState, setdinoState }) => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [disabled, setDisabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    if (isRecording) {
      // If currently recording, stop recording
      offRecAudio();
    } else {
      // If not currently recording, start recording
      onRecAudio();
    }
    // Toggle recording state
    setIsRecording(!isRecording);
  };

  const onRecAudio = () => {
    setDisabled(true);

    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지 했을 때
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();

    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();

    if (audioUrl) {
      URL.createObjectURL(audioUrl); // 출력된 링크에서 녹음된 오디오 확인 가능
    }

    // File 생성자를 사용해 파일로 변환
    const sound = new File([audioUrl], "soundBlob", {
      lastModified: new Date().getTime(),
      type: "audio",
    });

    setDisabled(false);
    // console.log(sound); // File 정보 출력
  };

  const play = () => {
    setdinoState(true);
    const audio = new Audio(URL.createObjectURL(audioUrl));
    const sound = new Howl({
      src: [audio.src],
      format: ["mp3", "ogg"],
      volume: 1,
      rate: 1.5, // 속도를 조절하여 음성을 변조
      onend: function () {
        // 재생이 끝나면 호출될 콜백 함수, 공룡 상태 변경
        setdinoState(false);
      },
    });
    // console.log(audio.src);

    sound.play();
  };

  return (
    <>
      <Buttondiv>
        <a data-tooltip-id="record_tooltip">
          <Button
            onClick={toggleRecording}
            // image={Tree}
            title={isRecording ? '' : '녹음을 하면 공룡이 따라 말해요'}
          >
            {isRecording ? "녹음완료" : "녹음시작"}
          </Button>{" "}
        </a>
        <Tooltip id="record_tooltip">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>버튼을 누르면</span>
            <span>녹음이 시작되요!</span>
            <span>공룡에게 듣고싶은말이 있나요?</span>
          </div>
        </Tooltip>

        <a data-tooltip-id="start-tooltip">
          <Button onClick={play} disabled={disabled}>
            재생
          </Button>
        </a>
        <Tooltip id="start-tooltip">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>버튼을 누르면</span>
            <span>녹음한 대사 그대로</span>
            <span>공룡이 말을 해요!!</span>
          </div>
        </Tooltip>
      </Buttondiv>
    </>
  );
};

export default ChildAudioPlay;
