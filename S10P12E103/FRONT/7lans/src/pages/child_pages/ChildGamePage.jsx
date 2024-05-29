import React from "react";
import {GrGamepad} from "react-icons/gr";
import {motion} from "framer-motion";
import Chat from "../../components/volunteer/games/Chatting"
import Gugudan from "../../components/child/games/Gugudan"
import Quiz from "../../components/child/games/Quiz"
import Words from "../../components/child/games/Words"
import CardFind from "../../components/child/games/CardFind"


const ChildGamePage = ({
                             session,
                             renderUserVideoComponent,
                             mainStreamManager,
                             subscribers,
                             toggleMyCamera,
                             toggleMyMic,
                             isMyCameraOn,
                             isMyMicOn,
                             isVolunteerCameraOn,
                             isVolunteerMicOn,
                             selectedGameIdx,
                             setGameChangeable
                           }) => {

  const renderGame = () => {
    if (selectedGameIdx === 1) {
      return <Quiz
        session={session}
        setGameChangeable={setGameChangeable}
      />;
    }
    if (selectedGameIdx === 2) {
      return <CardFind
        session={session}
        setGameChangeable={setGameChangeable}
      />;
    }
    if (selectedGameIdx === 3) {
      return <Gugudan
        session={session}
        setGameChangeable={setGameChangeable}
      />;
    }
    if (selectedGameIdx === 4) {
      return <Words
        session={session}
        setGameChangeable={setGameChangeable}/>;
    }
    return (
      <div
        className="center"
        style={{
          fontSize: "45px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        게임을 골라주세요.
        <motion.div
          animate={{
            scale: [1, 1.5, 1.5, 1, 1],
            rotate: [0, 0, 180, 360, 0],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          <GrGamepad/>
        </motion.div>
      </div>
    );
  };

  return (
    <>
      <div>
        <Chat
          renderUserVideoComponent={renderUserVideoComponent}
          mainStreamManager={mainStreamManager}
          subscribers={subscribers}
          session={session}
          toggleMyCamera={toggleMyCamera}
          toggleMyMic={toggleMyMic}
          isMyCameraOn={isMyCameraOn}
          isMyMicOn={isMyMicOn}
          isChildCameraOn={isVolunteerCameraOn}
          isChildMicOn={isVolunteerMicOn}
        />
      </div>
      <div>
        {renderGame()}
      </div>
    </>
  );
};

export default ChildGamePage;
