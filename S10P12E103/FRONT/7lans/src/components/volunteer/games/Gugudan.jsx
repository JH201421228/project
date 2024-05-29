import React, {useState, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import { Session } from 'openvidu-browser';
import PropTypes from "prop-types";
import {gameChange} from '../../../store/isPlayGameNow';
import GugudanSetup from "./GugudanSetup";
import GugudanPrompt from "./GugudanPrompt.jsx";
import QuizResult from "./QuizResult.jsx";

const Gugudan = ({
                   session,
                   setGameChangeable
                 }) => {
  const [currDan, setCurrDan] = useState();  // 선택된 현재 단
  const [multipleNum, setMultipleNum] = useState()  // 현재 배수
  const [currInputAns, setCurrInputAns] = useState() // 현재 입력중인 답
  const [submittedAns, setSubmittedAns] = useState()  // 제출된 답
  const [isCorrect, setIsCorrect] = useState()    //  정답 여부
  const [isGugudanStarted, setIsGugudanStarted] = useState(false);  // 구구단 게임 시작 여부

  const inputRef = useRef(null)




  /**
   * 주어진 단에 대한 구구단 게임을 시작합니다.
   * @function
   * @param {number} dan - 구구단 게임을 시작할 단의 수
   */
  const startGame = (dan) => {
    setIsGugudanStarted(true)
    setCurrDan(dan);
    setMultipleNum(1)
    setGameChangeable(false)
    setCurrInputAns()
  }


  /**
   * 구구단 게임을 초기 상태로 리셋합니다.
   * @function
   */
  const resetGame = () => {
    setIsGugudanStarted(false)
    setCurrDan(undefined)
    setIsCorrect(undefined)
    setGameChangeable(true)
  }


  /**
   * useEffect hook을 사용하여 게임의 상태에 따른 동작을 핸들링합니다.
   * 구구단 문제의 답을 모두 맞혔을 때 게임을 리셋하고,
   * 틀린 답을 제출했을 경우 다시 풀 수 있도록 합니다.
   * @function
   */
  useEffect(() => {
    let gameHandleTimeout;
    if (multipleNum === 10) {  // 구구단을 모두 풀었을 경우 게임을 리셋
      gameHandleTimeout = setTimeout(() => {
        resetGame()
      }, 500);
    } else if (isCorrect !== undefined) {  // 오답을 제출했을 경우 다시 풀도록 돌아가기
      gameHandleTimeout = setTimeout(() => {
        setIsCorrect(undefined)
      }, 500);
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
    return () => clearTimeout(gameHandleTimeout);
  }, [multipleNum, isCorrect])


  /**
   * 사용자가 제출한 구구단 답안을 검증하는 함수입니다.
   * 사용자의 답과 현재 단계의 구구단 결과를 비교하고, 그 결과에 따라 게임을 진행합니다.
   * - 정답일 경우, 다음 구구단 문제로 넘어갑니다.
   * - 오답일 경우, 현재 문제를 유지합니다.
   * @function
   */
  const checkAnswer = () => {
    if (currDan * multipleNum === submittedAns) {
      setIsCorrect(true);
      setMultipleNum(multipleNum + 1);
    } else {
      setIsCorrect(false);
    }
    setCurrInputAns(undefined);
    setSubmittedAns(undefined);
  }


  useEffect(() => {
    if (submittedAns !== undefined) {
      checkAnswer();
    }
  }, [submittedAns]);


  /**
   * 구구단 게임 시작 신호를 보내는 함수입니다.
   * 다른 사용자에게 선택된 단으로 구구단 게임이 시작됨을 알리는 신호를 전송합니다.
   * @function
   */
  const gugudanStartSignal = (() => {
    session.signal({
      type: 'gugudanStart',
      data: JSON.stringify(currDan),
    })
      .then(() => console.log('구구단 게임 시작'))
      .catch(err => console.log(err))
  })


  /**
   * 구구단 게임 초기화 신호를 보내는 함수입니다.
   * 다른 사용자들에게 게임이 초기화 됨을 알리는 신호를 전송합니다.
   * @function
   */
  const resetGugudanSignal = (() => {
    session.signal({
      type: 'resetGugudan'
    })
      .then(() => console.log('구구단 게임 종료'))
      .catch(err => console.log(err))
  })

  /**
   * 사용자가 제출한 구구단 답안을 다른 사용자에게 전송하는 함수입니다.
   * 답안 제출 요청이 들어왔을 때, 해당 답안을 'submitGugudanAns' 신호 형태로 전송합니다.
   * @function
   * @param {number} gugudanAns - 사용자가 입력한 구구단 답안
   */
  const submitGugudanAnsSignal = ((gugudanAns) => {
    session.signal({
      type: 'submitGugudanAns',
      data: JSON.stringify(gugudanAns)
    })
      .then(() => console.log(`구구단 정답 제출 : ${gugudanAns}`))
      .catch(err => console.log(err))
  })


  /**
   * 다른 사용자가 시작한 구구단 게임 시작 신호를 받아 처리하는 함수입니다.
   * 다른 사용자가 시작한 구구단 게임에 참가하며, 해당 게임의 단 수에 따라 자신의 게임을 설정합니다.
   * @function
   * @param {Object} event - 'gugudanStart' 신호를 포함한 이벤트 객체
   */
  const receiveGugudanStartSignal = ((event) => {
    const targetDan = JSON.parse(event.data)
    startGame(targetDan);
  })


  /**
   * 다른 사용자가 발신한 구구단 게임 리셋 신호를 수신하여 게임을 초기화하는 함수입니다.
   * 게임 리셋 신호가 수신되면, 사용자의 구구단 게임 상태를 초기화합니다.
   * @function
   * @param {Object} event - 'resetGugudan' 신호를 포함한 이벤트 객체
   */
  const receiveResetGugudanSignal = (() => {
    resetGame()
  })


  /**
   * 다른 사용자가 제출한 구구단 답안을 수신하는 함수입니다.
   * 'submitGugudanAns' 신호를 수신하면, 해당 신호에 담긴 답안을 이용하여 사용자의 구구단 답안을 업데이트합니다.
   * @function
   * @param {Object} event - 'submitGugudanAns' 신호를 포함한 이벤트 객체
   */
  const receiveGugudanAnsSignal = ((event) => {
    setSubmittedAns(parseInt(event.data, 10))
  })


  /**
   * 사용자가 Enter 키를 눌러 답안을 제출하는 이벤트를 처리하는 함수입니다.
   * Enter 키 이벤트가 발생하면, 현재 입력된 답안을 'submitGugudanAns' 신호로 전송합니다.
   * @function
   * @param {Object} e - 키 이벤트 객체
   */
  const handleSubmitAnswer = (e) => {
    if (e.key === 'Enter') {
      submitGugudanAnsSignal(currInputAns);
    }
  }

  const receiveGugudanInput = (event) => {
    const tempInput = event.data;
    setCurrInputAns(tempInput);
  }


  // 이벤트 핸들링
  useEffect(() => {
      session.on('signal:gugudanStart', receiveGugudanStartSignal);
      session.on('signal:resetGugudan', receiveResetGugudanSignal);
      session.on('signal:submitGugudanAns', receiveGugudanAnsSignal);
      session.on('signal:gugudanInput', receiveGugudanInput)
      return () => {
        session.off('signal:gugudanStart', receiveGugudanStartSignal);
        session.off('signal:resetGugudan', receiveResetGugudanSignal);
        session.off('signal:submitGugudanAns', receiveGugudanAnsSignal);
        session.off('signal:gugudanInput', receiveGugudanInput)
      };
    },
    [session]);


  // 이하 렌더링 영역
  const renderGugudanGame = () => {
    if (currDan !== undefined && isCorrect === undefined) {
      return (
        <GugudanPrompt
          currDan={currDan}
          multipleNum={multipleNum}
          inputRef={inputRef}
          handleSubmitAnswer={handleSubmitAnswer}
          setCurrInputAns={setCurrInputAns}
          currInputAns={currInputAns}
          resetGame={resetGugudanSignal}
        />
      )
    }
    return (
      <QuizResult
        ansCorrect={isCorrect}
        ans
      />
    )


  }

  const renderGugudan = () => {
    if (isGugudanStarted === false) {
      return (
        <GugudanSetup
          currDan={currDan}
          setCurrDan={setCurrDan}
          onClickStart={gugudanStartSignal}
        />
      )
    }
    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '0'}}>
        {renderGugudanGame(isGugudanStarted)}
      </div>
    )

  }

  return (
    renderGugudan()
  );
};


Gugudan.propTypes = {
  session: PropTypes.instanceOf(Session).isRequired, // session이 Session의 인스턴스인지 확인
};

export default Gugudan;
