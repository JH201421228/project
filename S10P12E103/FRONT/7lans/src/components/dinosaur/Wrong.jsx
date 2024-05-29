import React from 'react'
import { useSelector } from 'react-redux'
import getEnv from "../../utils/getEnv.jsx";
import { useLocation } from 'react-router-dom';

const Wrong = () => {
    const userDino = useSelector((state) => state.dino.value)
    const location = useLocation()
    return (
      <div>
        {location.pathname === '/volunteer_video_chatting/:meetingId' ? 
          <h1> <strong>다음엔 정답일 거에요!</strong></h1>
        :
          ''
        }
          <img style={{width: '350', height: '480px'}} src={`${getEnv("PUBLIC_URL")}/dinosourImage/dinosaur${userDino}_sad.png`} alt="" />
      </div>
    )
}

export default Wrong