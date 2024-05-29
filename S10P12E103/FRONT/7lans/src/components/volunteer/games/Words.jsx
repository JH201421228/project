import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import PropTypes from "prop-types";
import {Session} from "openvidu-browser";
import {gameChange} from '../../../store/isPlayGameNow'
import WordsInput from "./WordsInput";
import WordsForm from "./WordsForm";

const Words = ({
                 session,
                 setGameChangeable
               }) => {
  // const [nowWord, setNowWord] = useState('')
  // const word = useSelector((state) => state.words.value)

  const [currentInputWord, setCurrentInputWord] = useState("")
  const [submittedWord, setSubmittedWord] = useState("")

  const dispatch = useDispatch()

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
   * 현재 입력된 단어를 제출하는 함수입니다.
   * 입력된 단어가 있으면 세션에 'submitWord' 시그널을 보냅니다.
   * 입력된 단어가 없는 경우 경고창을 표시합니다.
   */
  const submitWord = (() => {
    if (currentInputWord && currentInputWord.trim().length > 0) {
      const inputWord = currentInputWord.trim();
      setCurrentInputWord('');

      session.signal({
        type: 'submitWord', data: inputWord,
      })
        .then(() => console.log(`단어 제시 : ${inputWord}`))
        .catch(err => console.log(err))
    } else {
      window.alert('입력 없음')
    }
  })


  /**
   * 현재 입력된 문장들을 제출하는 함수입니다.
   * 네 개의 문장이 모두 비어있지 않은 경우, 그 문장들을 배열로 만든 후 세션에 'submitSentences' 타입의 시그널을 보냅니다.
   * 하나 이상의 문장이 비어있는 경우 경고창을 표시합니다.
   */
  const submitSentences = (() => {
    if (sentence1.trim().length > 0 &&
      sentence2.trim().length > 0 &&
      sentence3.trim().length > 0 &&
      sentence4.trim().length > 0) {

      const inputSentences = [sentence1, sentence2, sentence3, sentence4].map(sentence => sentence.trim());

      session.signal({
        type: 'submitSentences', data: JSON.stringify(inputSentences),
      })
        .then(() => console.log(`문장 제출 : ${inputSentences}`))
        .catch(err => console.log(err))
    } else {
      window.alert('입력 없음')
    }
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
    setCurrentInputWord('')
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

    // 추후 로직 처리 예정 우선 리셋함
    reset()
  };

  const receiveSentenceInput = (event) => {
    const sentences = JSON.parse(event.data);
    setSentence1(sentences.sentence1);
    setSentence2(sentences.sentence2);
    setSentence3(sentences.sentence3);
    setSentence4(sentences.sentence4);
  }

  /**
   * 컴포넌트가 마운트 될 때 세션에서 'submitWord'와 'submitSentences' 시그널을 리스닝하게 설정하고,
   * 컴포넌트가 언마운트 될 때 이벤트 리스너를 제거합니다.
   */
  useEffect(() => {
    session.on('signal:submitWord', receiveWord);
    session.on('signal:submitSentences', receiveSentences);
    session.on('signal:sentenceInputChange', receiveSentenceInput);
    return () => {
      session.off('signal:submitWord', receiveWord);
      session.off('signal:submitSentences', receiveSentences);
      session.off('signal:sentenceInputChange', receiveSentenceInput);
    }
  }, [session]);


  if (submittedWord === '') {
    return (
      <WordsInput
        currentInputWord={currentInputWord}
        setCurrentInputWord={setCurrentInputWord}
        submitWord={submitWord}
      />
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
        submitSentences={submitSentences}
      />
    )
  }
}

Words.propTypes = {
  session: PropTypes.instanceOf(Session).isRequired, // session이 Session의 인스턴스인지 확인
};

export default Words