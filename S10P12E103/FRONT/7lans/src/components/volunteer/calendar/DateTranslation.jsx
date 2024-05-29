
//localdateTime => (Number) 20240202
export const dateToNumber = (day) => {
    let dateString = String(day.getFullYear())
    if(day.getMonth() < 9){
     dateString += "0" 
    }
    dateString += String(day.getMonth()+1)
    if(day.getDate() < 10){
      dateString += "0"
    }
    dateString += String(day.getDate())

    return Number(dateString)
}

//localdateTime => 2024년2월2일
export const dateToString = (day) => {
    let dayString = String(day.getFullYear()) + "년"
        dayString += String(day.getMonth()+1) + "월"
        dayString += String(day.getDate()) + "일 ";

    return dayString
}

//localdateTime => 2024-02-02T
export const dateToHyphen = (selectedDate) => {
    let day = String(selectedDate.getFullYear()) + "-"
      //월                
    if(selectedDate.getMonth() < 9){
        day += "0";
    }

    day += String(selectedDate.getMonth()+1) + "-"
    //일
    if(selectedDate.getDate() < 10){
        day += "0";
    }

    day += String(selectedDate.getDate()) + "T";

    return day
}

//14-> 14:00:00형식으로 변환
export const calTime = (time) => {
    // console.log("time" + time)
    //%1해서 0.5나오면 30분을 추가
    let returnTime = "";

    //시간
    if(time%1 == 0.5){
        //시
        if(time < 10){
        returnTime += "0"
        }
    
        returnTime += String(time-0.5) + ":";
    
        //분, 초
        returnTime += "30" + ":00"
    }
    else{
        if(time < 10){
            returnTime += "0"
        }
        returnTime += String(time) + ":";
        returnTime += "00" + ":00"
    }

    // console.log("returnTime" + returnTime)

    return returnTime;
}



