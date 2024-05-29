import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";

import {toast} from 'react-toastify';
import ImgCaptureBtn from "../../img_upload/ImgCaptureBtn";
import Logo from "../../images/7lans_logo.png";

 

const NavBar = styled.nav`
  position: fixed;
  width: 100%;
  height: 100px;
  background-color: rgb(255, 215, 3);
  display: flex;
  padding-right: 15%;
  top: 0;
`;

const LogoImage = styled.img`
  height: 70px;
  margin-left: 40px;
  margin-top: 15px;
`;

const TimeZone = styled.div`
  width: 140px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
  font-size: 20px;
  border: none;
  border-radius: 20px;
  margin-top: 20px;
`;

const CloseImg = styled.img`
  height: 90px;
  width: 80px;
  padding-bottom: 1.5rem;
  margin-top: 0;
  cursor: pointer;
`;


const GameNav = ({
                   exitSessionSignal,
                   setCapturedImages,
                   sessionCreatedAt,
                   session,
                   capturedImages,
                   setSelectedGameIdx,
                   gameChangeable,
                   setGameChangeable
                 }) => {

  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsedTime = Math.floor((new Date().getTime() - sessionCreatedAt.getTime()) / 1000);

      // add 1 second to the elapsed time
      setElapsedSeconds(elapsedTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionCreatedAt]);

  const formattedElapsedSeconds = `${(`0${Math.floor(elapsedSeconds / 60)}`).slice(-2)
  }:${
    (`0${elapsedSeconds % 60}`).slice(-2)}`;



  const changeGameIdxSignal = (gameIdx) => {
    session.signal({
      type: 'changeGame',
      data: gameIdx,
    })
      .then(() => console.log(`${gameIdx}번 게임으로 전환`))
      .catch((err) => {
        console.log(err)
      })
  }

  const goToOtherGame = (gameIdx) => {
    if (gameChangeable === true) {
      changeGameIdxSignal(gameIdx)
    } else {
      toast.warn('게임중에는 게임을 변경할 수 없어요', {
        position: "bottom-right"
      })
    }
  };

  const receiveChangeGame = (event) => {
    const gameIdx = parseInt(event.data)
    setSelectedGameIdx(gameIdx);
  }


  useEffect(() => {
    if (session) {
      session.on('signal:changeGame', receiveChangeGame)
    }
    return () => {
      if (session) {
        session.off('signal:changeGame', receiveChangeGame);
      }
    }
  }, [session]);


  return (
    <NavBar className="shadow">
      <Link to="/volunteer_main">
        <LogoImage src={Logo} alt="logo"/>
      </Link>

      <div style={{display: "flex", width: "100%", marginLeft: "16%"}}>
        <motion.a
          whileHover={{scale: 1.1}}
          onHoverStart={(e) => {
          }}
          onHoverEnd={(e) => {
          }}
          style={{
            width: "130px",
            height: "55px",
            alignSelf: "center",
            fontWeight: "bolder",
            fontSize: "20px",
            border: "none",
            borderRadius: "20px",
            backgroundColor: "rgb(255, 237, 170)",
            margin: "0 2rem 0 0",
          }}
        >
          <button
            className="shadow"
            style={{
              width: "130px",
              height: "55px",
              alignSelf: "center",
              fontWeight: "bolder",
              fontSize: "20px",
              border: "none",
              borderRadius: "20px",
              backgroundColor: "rgb(255, 237, 170)",
              margin: "0 2rem 0 0",
            }}
            onClick={() => goToOtherGame(Number(1))}
          >
            {" "}
            퀴즈 출제
          </button>
        </motion.a>

        <motion.a
          whileHover={{scale: 1.1}}
          onHoverStart={(e) => {
          }}
          onHoverEnd={(e) => {
          }}
          style={{
            width: "130px",
            height: "55px",
            alignSelf: "center",
            fontWeight: "bolder",
            fontSize: "20px",
            border: "none",
            borderRadius: "20px",
            backgroundColor: "rgb(255, 237, 170)",
            margin: "0 2rem 0 0",
          }}
        >
          <button
            className="shadow"
            style={{
              width: "130px",
              height: "55px",
              alignSelf: "center",
              fontWeight: "bolder",
              fontSize: "20px",
              border: "none",
              borderRadius: "20px",
              backgroundColor: "rgb(255, 237, 170)",
              margin: "0 2rem 0 0",
            }}
            onClick={() => goToOtherGame(Number(2))}
          >
            {" "}
            카드 짝찾기
          </button>
        </motion.a>

        <motion.a
          whileHover={{scale: 1.1}}
          onHoverStart={(e) => {
          }}
          onHoverEnd={(e) => {
          }}
          style={{
            width: "130px",
            height: "55px",
            alignSelf: "center",
            fontWeight: "bolder",
            fontSize: "20px",
            border: "none",
            borderRadius: "20px",
            backgroundColor: "rgb(255, 237, 170)",
            margin: "0 2rem 0 0",
          }}
        >
          <button
            className="shadow"
            style={{
              width: "130px",
              height: "55px",
              alignSelf: "center",
              fontWeight: "bolder",
              fontSize: "20px",
              border: "none",
              borderRadius: "20px",
              backgroundColor: "rgb(255, 237, 170)",
              margin: "0 2rem 0 0",
            }}
            onClick={() => goToOtherGame(Number(3))}
          >
            {" "}
            구구단
          </button>
        </motion.a>

        <motion.a
          whileHover={{scale: 1.1}}
          onHoverStart={(e) => {
          }}
          onHoverEnd={(e) => {
          }}
          style={{
            width: "130px",
            height: "55px",
            alignSelf: "center",
            fontWeight: "bolder",
            fontSize: "20px",
            border: "none",
            borderRadius: "20px",
            backgroundColor: "rgb(255, 237, 170)",
            margin: "0",
          }}
        >
          <button
            className="shadow"
            style={{
              width: "130px",
              height: "55px",
              alignSelf: "center",
              fontWeight: "bolder",
              fontSize: "20px",
              border: "none",
              borderRadius: "20px",
              backgroundColor: "rgb(255, 237, 170)",
              margin: "0",
            }}
            onClick={() => goToOtherGame(Number(4))}
          >
            {" "}
            문장 만들기
          </button>
        </motion.a>
        <TimeZone>
          {formattedElapsedSeconds}
        </TimeZone>
        <motion.a
          className="shadow"
          whileHover={{scale: 1}}
          onHoverStart={(e) => {
          }}
          onHoverEnd={(e) => {
          }}
          style={{
            width: "100px",
            height: "54px",
            alignSelf: "center",
            fontWeight: "bolder",
            fontSize: "20px",
            border: "none",
            borderRadius: "20px",
            backgroundColor: "rgb(255, 237, 170)",
            margin: "0 1rem 0 0",
          }}
        >
          <ImgCaptureBtn
            setCapturedImages={setCapturedImages}
            session={session}
            capturedImages={capturedImages}
          />
        </motion.a>

        <div style={{display: "flex", marginTop: "12px", marginRight: "0"}}>
          <CloseImg
            src="/Close_video_chat.png"
            onClick={exitSessionSignal}
          />
        </div>
      </div>
    </NavBar>
  );
};

export default GameNav;
