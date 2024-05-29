import axios from "axios";
import getEnv from "../../../utils/getEnv";

const urlInfo = getEnv('API_URL')

export const getMeetingList = (relationId, year, month, setMeetings) => {
    axios
      .post(`${urlInfo}/meetingSchedue`, {
        relationId: relationId,
        year: year,
        month: month,
      })
      .then((res) => {
        setMeetings(res.data);
        // console.log(res);
      })
      .catch((err) => {});

}

export const createMeetingSession = (meetingId, relationId, currentMonth, setMeetings) => {
  axios.put(`${urlInfo}/meetingSchedue/open`,{
    meetingId: meetingId
  })
  .then((res) => {
    getMeetingList(
      relationId, 
      currentMonth.getFullYear(), 
      currentMonth.getMonth()+1, 
      setMeetings
    )
    
  })
  .catch((err) => {
  });
}