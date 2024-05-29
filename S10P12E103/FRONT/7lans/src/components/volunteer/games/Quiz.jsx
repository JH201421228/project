import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Session} from "openvidu-browser";
import PropTypes from "prop-types";
import {addProblem} from '../../../store/quizSlice'
import {gameChange} from '../../../store/isPlayGameNow'
import QuizResult from "./QuizResult.jsx";
import QuizProblemDisplay from "./QuizProblemDisplay.jsx";
import QuizProblemSetup from "./QuizProblemSetup.jsx";

// import * as tf from '@tensorflow/tfjs';
// import * as tmPose from '@teachablemachine/pose';

const Quiz = ({
                session,
                setGameChangeable
              }) => {
  const userInfo = useSelector((state) => state.user.value)
  const [ans, setAns] = useState('')
  const [ansCorrect, setAnsCorrect] = useState('')
  const [nowProblem, setNowProblem] = useState('')
  const [problem, setProblem] = useState('')
  const [model, setModel] = useState(null);
  const [webcam, setWebcam] = useState(null);

  useEffect(() => {
    if (ansCorrect !== '') {
      const timeoutId = setTimeout(() => {
        setAns('')
        setProblem('')
        setAnsCorrect('')
      }, 3000)
      return () => clearTimeout(timeoutId)
    }
  }, [ansCorrect, problem])





  // 세션 관련 메소드들

  // 시그널 송신 메소드
  // 문제 만들기 송신 메소드
  const submitProblem = (() => {
    if (ans && ans.trim().length > 0 && nowProblem.trim() !== '') {
      const submittedProblem = nowProblem;
      const submittedAnswer = ans;
      setNowProblem('');

      const problemData = {
        problem: submittedProblem,
        answer: submittedAnswer,
      }

      session.signal({
        type: 'submitProblem', data: JSON.stringify(problemData),
      })
        .then(() => console.log(`문제 제출 : ${submittedProblem}`))
        .catch(err => console.log(err))
    } else {
      window.alert('입력 없음')
    }
  })

  // 문제 정답 제출 메소드
  const submitAnswer = ((submittedAnswer) => {
    session.signal({
      type: 'submitAnswer', data: submittedAnswer,
    })
      .then(() => console.log(`정답 제출 : ${submittedAnswer}`))
      .catch(err => console.log(err))
  });


  // 시그널 수신 메소드
  // 문제 변경 설정 수신
  const changeProblem = (submittedData) => {
    setProblem(submittedData.problem);
    setAns(submittedData.answer);
    setGameChangeable(false)
  }

  // 문제 만들기 수신
  const receiveProblem = ((event) => {
    const receivedData = JSON.parse(event.data)

    changeProblem(receivedData);
  })

  // 문제 정답 제출 수신
  const receiveAns = ((event) => {
    const submittedAns = event.data;
    setAnsCorrect(submittedAns);
    setGameChangeable(true)
  })

  useEffect(() => {
    session.on('signal:submitProblem', receiveProblem);
    session.on('signal:submitAnswer', receiveAns);
    return () => {
      session.off('signal:submitProblem', receiveProblem);
      session.off('signal:submitAnswer', receiveAns);
    }
  }, [session]);



  async function predict() {
    webcam.update()
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    const prediction = await model.predict(posenetOutput);
    // console.log(prediction[0].probability)
    // console.log(prediction[1].probability)
    // console.log(prediction[2].probability)

    for(let i = 0; i < prediction.length; i++){
      const classPrediction = prediction[i].className;

      if(classPrediction === 'O Answer' && prediction[i].probability > 0.9) {
        submitAnswer('O');
        setWebcam(null);
      } else if(classPrediction === 'X answer' && prediction[i].probability > 0.9) {
        submitAnswer('X');
        setWebcam(null);
      }
    }
  }

  // 웹캠 및 모델 초기화
  useEffect(() => {
    const URL = "https://teachablemachine.withgoogle.com/models/DcV5YEju3/";

    if (problem) {
      async function setup() {
        if (!model) {
          const modelURL = `${URL  }model.json`;
          const metadataURL = `${URL  }metadata.json`;
          const loadedModel = await tmPose.load(modelURL, metadataURL);
          setModel(loadedModel);
        }

        const size = 200;  // video size (can change this to whatever you want)
        const flip = true; // whether to flip the webcam
        const webcamRef = new tmPose.Webcam(size, size, flip); // width, height, flip
        await webcamRef.setup();
        await webcamRef.play();
        setWebcam(webcamRef);
      }
      setup();
    }
  }, [problem]);

  useEffect(() => {
    if (webcam && model) {
      const interval = setInterval(() => {
        predict();
      }, 1000);
      return () => {
        clearInterval(interval);
      }
    }
  }, [webcam, model]);



  if (problem === '') {
    return (
      <QuizProblemSetup
        ans={ans}
        setAns={setAns}
        nowProblem={nowProblem}
        setNowProblem={setNowProblem}
        submitProblem={submitProblem}
      />
    );
  } else if (ansCorrect !== '') {
    return (
      <QuizResult
        ansCorrect={ansCorrect}
        ans={ans}
        userInfo={userInfo}
      />
    );
  } else {
    return (
      <QuizProblemDisplay
        submitAnswer={submitAnswer}
        setAnsCorrect={setAnsCorrect}
        problem={problem}
        gameChange={gameChange}
      />
    );
  }
}


Quiz.propTypes = {
  session: PropTypes.instanceOf(Session).isRequired, // session이 Session의 인스턴스인지 확인
};
export default Quiz