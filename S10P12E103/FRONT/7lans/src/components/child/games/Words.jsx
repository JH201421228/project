import React, {useEffect, useState} from 'react'
import PropTypes from "prop-types";
import {Session} from "openvidu-browser";
import {toast} from 'react-toastify';
import Waiting from "./Waiting.jsx";
import WordsForm from "./WordsForm";

const Words = ({
                 session,
                 setGameChangeable
               }) => {
  // const [nowWord, setNowWord] = useState('')
  // const word = useSelector((state) => state.words.value)

  const [submittedWord, setSubmittedWord] = useState("")

  const [sentence1, setSentence1] = useState('')
  const [sentence2, setSentence2] = useState('')
  const [sentence3, setSentence3] = useState('')
  const [sentence4, setSentence4] = useState('')


  useEffect(() => {
    if (submittedWord !== '') {
      setGameChangeable(false)
    } else {
      setGameChangeable(true)
    }
  }, [submittedWord])





  // 세션 관련 메소드들
  // 시그널 송신 메소드
  /**
   * 현재 입력된 문장들을 제출하는 함수입니다.
   * 네 개의 문장이 모두 비어있지 않은 경우, 그 문장들을 배열로 만든 후 세션에 'submitSentences' 타입의 시그널을 보냅니다.
   * 하나 이상의 문장이 비어있는 경우 경고창을 표시합니다.
   */
  const submitSentences = (() => {
    const inputSentences = [sentence1, sentence2, sentence3, sentence4].map(sentence => sentence.trim());

    // 각 문장을 확인합니다.
    for (let i = 0; i < inputSentences.length; i++) {
      const sentence = inputSentences[i];

      if (sentence.length === 0) {
        // 입력이 없는 문장이 있습니다.
        toast.error("입력이 되지 않은 문장이 있어요!", {
          position: "bottom-right"
        });
        return;
      } else if (!sentence.includes(submittedWord)) {
        // 제시된 단어를 포함하지 않는 문장이 있습니다.
        toast.error(`${i + 1}번째 문장을 다시 확인하세요!`,{
          position: "bottom-right"
        });
        return;
      }
    }
    session.signal({
      type: 'submitSentences', data: JSON.stringify(inputSentences),
    })
      .then(() => console.log(`문장 제출 : ${inputSentences}`))
      .catch(err => console.log(err))
  });


  // 시그널 수신 메소드
  // 단어 제시 수신 메소드
  /**
   * 'submitWord' 타입의 시그널을 수신하여 제출된 단어를 상태로 설정하는 함수입니다.
   * @param {Object} event - submitWord 시그널 이벤트
   */
  const receiveWord = ((event) => {
    const inputWord = event.data;
    setSubmittedWord(inputWord);
  })

  /**
   * 단어와 문장들의 상태를 초기화하는 함수입니다.
   */
  const reset = () => {
    setSubmittedWord('')
    setSentence1('')
    setSentence2('')
    setSentence3('')
    setSentence4('')
  }


  /**
   * 'submitSentences' 타입의 시그널을 수신하여 제출된 문장들을 상태로 설정하는 함수입니다.
   * 수신된 문장들은 바로 출력되고 리셋함수를 통해 초기화 됩니다.
   * @param {Object} event - submitSentences 시그널 이벤트
   */
  const receiveSentences = (event) => {
    const sentences = JSON.parse(event.data);
    // console.log(`수신한 문장들 : ${sentences}`);

    // TODO 제출하면 리셋되는게 끝인데 기능 추가가 필요할 수도 있음
    reset()
  };

  const sentenceInputSignal = () => {
    session.signal({
      type: 'sentenceInputChange',
      data: JSON.stringify({
        sentence1,
        sentence2,
        sentence3,
        sentence4
      })
    })
      .then()
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    sentenceInputSignal();
  }, [sentence1, sentence2, sentence3, sentence4]);


  /**
   * 컴포넌트가 마운트 될 때 세션에서 'submitWord'와 'submitSentences' 시그널을 리스닝하게 설정하고,
   * 컴포넌트가 언마운트 될 때 이벤트 리스너를 제거합니다.
   */
  useEffect(() => {
    session.on('signal:submitWord', receiveWord);
    session.on('signal:submitSentences', receiveSentences);

    return () => {
      session.off('signal:submitWord', receiveWord);
      session.off('signal:submitSentences', receiveSentences);

    }
  }, [session]);


  if (submittedWord === '') {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        width: '900px',
        marginLeft: '0%',
        marginTop: '5%'
      }}>
        <Waiting
          problemType="단어퀴즈"/>
      </div>
    )
  } else {
    return (
      <WordsForm
        submittedWord={submittedWord}
        setSentence1={setSentence1}
        setSentence2={setSentence2}
        setSentence3={setSentence3}
        setSentence4={setSentence4}
        sentence1={sentence1}
        sentence2={sentence2}
        sentence3={sentence3}
        sentence4={sentence4}
        sentenceInputSignal={sentenceInputSignal}
        submitSentences={submitSentences}
      />
    )
  }
}

Words.propTypes = {
  session: PropTypes.instanceOf(Session).isRequired, // session이 Session의 인스턴스인지 확인
};

export default Words