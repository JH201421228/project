import React from 'react'
import { useSelector } from 'react-redux'
import getEnv from '../../utils/getEnv'
import { useLocation } from 'react-router-dom'

const Correct = () => {
  const userDino = useSelector((state) => state.dino.value)
  const location = useLocation()
  return (
    <div>
      {location.pathname === '/volunteer_video_chatting/:meetingId' ? 
        <h1> <strong>정답입니다</strong> </h1>
      :
        ''
      }
        <img style={{width: '350', height: '480px'}}
            src={`${getEnv("PUBLIC_URL")}/dinosourImage/dinosaur${userDino}_happy.png`} alt="" />
    </div>
  )
}

export default Correct