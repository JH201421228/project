import React, { useEffect, useRef } from "react";

const OpenViduVideoComponent = (props) => {
  const videoRef = useRef();

  useEffect(() => {
    if (props.streamManager && videoRef.current) {
      props.streamManager.addVideoElement(videoRef.current);
    }
  }, [props.streamManager]);

  return (
    <video
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "15px",
        // border: "3px solid rgb(35,35,35)",
      }}
      autoPlay
      ref={videoRef}
    />
  );
};

export default OpenViduVideoComponent;
