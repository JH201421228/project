import React from 'react'
import Correct from "../../dinosaur/Correct.jsx";
import Wrong from "../../dinosaur/Wrong.jsx";


const QuizResult = ({ansCorrect, ans}) => {
    if (ansCorrect === '') {
        return null;
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15%',
            paddingLeft: '262px',
            textAlign: 'center'
        }}>
            {ansCorrect === ans ?
                <Correct/>
                :
                <Wrong/>
            }
        </div>
    );
}

export default QuizResult;