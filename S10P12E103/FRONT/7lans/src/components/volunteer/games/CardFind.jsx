import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import { Session } from 'openvidu-browser';
import getEnv from "../../../utils/getEnv.jsx";
import CardFin from './CardFin.jsx';

// 화면에서 나타날 카드 컴포넌트
// eslint-disable-next-line react/prop-types
const Card = ({num, isFlipped, isDisabled, handleClick}) => {
  const cardImageNum = num <= 10 ? num : num - 10;
  return (<button disabled={isDisabled}
                  style={{
                    transform: isFlipped ? 'rotateY(360deg)' : '',
                    transition: 'transform 0.4s',
                    fontSize: '2rem',
                    height: '120px',
                    width: '140px',
                    margin: '1rem',
                    marginBottom: '0',
                    
                    border: '3px solid rgb(240, 165, 8)',
                    borderRadius: '17px',
                    backgroundColor: 'rgb(255, 215, 3)',
                  }}
                  onClick={handleClick}>
    {isFlipped && (<img src={`${getEnv("PUBLIC_URL")}/cardImage/cardImage${cardImageNum}.png`}
                        alt=""
                        style={{
                          height: '60px', width: '60px'
                        }}/>)}
    <img src={`${getEnv("PUBLIC_URL")}/cardImage/cardImage${num}`} alt=""/>
  </button>);
}

const cardNum = Array.from({length: 20}, (_, index) => index + 1);
const CardFind = ({
                    session,
                  }) => {

  const [flippedCard, setFlippedCard] = useState([])
  const [nowCard, setNowCard] = useState([])
  const [flipping, setFlipping] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [gameStarted, setGameStarted] = useState(false);
  const [cardOrder, setCardOrder] = useState([]);

  // 카드 랜덤 셔플 함수
  const shuffleCards = () => {
    const newCardOrder = [...cardOrder];
    newCardOrder.sort(() => Math.random() - 0.5);
    return newCardOrder;
    // setCardOrder(newCardOrder);
  };

  // 카드를 선택하여서 nowCard 배열에 선택한 카드를 넣는 함수
  const handleCard = (num) => {

    setNowCard((prevCards) => [...prevCards, num]);
    // console.log(nowCard);
  };


  // 현재 선택된 카드의 선택이 해제되는 것을 처리
  const waitAndEmptyNowCard = () => {
    setFlipping(true);
    const timeout = setTimeout(() => {
      setNowCard([]);
      setFlipping(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };


  // 선택한 두 카드가 맞았을 때의 처리
  const handleMatch = () => {
    setFlippedCard([...flippedCard, ...nowCard]);
    waitAndEmptyNowCard();
  };

  // 선택한 두 카드가 다를 때의 처리
  const handleNoMatch = () => {
    waitAndEmptyNowCard();
  };

  // 모든 카드를 뒤집었을 때의 처리
  const handleGameWon = () => {
    setCorrect(true);
    const timeout = setTimeout(() => {
      setNowCard([]);
      setFlippedCard([]);
      setCorrect(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  };


  const gameStartSignal = (() => {
    session.signal({
      type: 'cardGameStart',
    })
      .then(() => console.log('카드 뒤집기 게임 시작'))
      .catch(err => console.log(err))
  })

  const shuffleCardSignal = (() => {
    const shuffledCards = shuffleCards()

    session.signal({
      type: 'shuffleCard', data: JSON.stringify(shuffledCards),
    })
      .then(() => console.log('카드 섞기'))
      .catch(err => console.log(err))
  })

  const selectCardSignal = ((num) => {
    session.signal({
      type: 'selectCard', data: num,
    })
      .then(() => console.log('카드 선택'))
      .catch(err => console.log(err))
  })

  const cardGameStartHandler = ((event) => {
    setGameStarted(true);
  });

  const shuffleCardHandler = ((event) => {
    const shuffledCard = JSON.parse(event.data);
    setCardOrder(shuffledCard);
  });

  const selectCardHandler = ((event) => {
    const num = parseInt(event.data, 10);
    handleCard(num);
  });

  // 컴포넌트가 실행되었을 때 카드 세팅
  useEffect(() => {
      setCardOrder([...cardNum]);

      session.on('signal:shuffleCard', shuffleCardHandler);
      session.on('signal:selectCard', selectCardHandler);
      session.on('signal:cardGameStart', cardGameStartHandler);

      return () => {
        session.off('signal:shuffleCard', shuffleCardHandler);
        session.off('signal:selectCard', selectCardHandler);
        session.off('signal:cardGameStart', cardGameStartHandler);
      };

    },
    [session]);


  // 게임이 시작되었을 때
  useEffect(() => {
    if (gameStarted) {
      shuffleCardSignal();
    }
  }, [gameStarted]);

  // 선택한 카드가 바뀔때마다 매칭 혹은 게임종료를 처리
  useEffect(() => {
    if (nowCard.length === 2) {
      const difference = Math.abs(nowCard[0] - nowCard[1]);
      if (difference === 10) {
        handleMatch();
      } else {
        handleNoMatch();
      }
    }
    if (flippedCard.length === 20) {
      handleGameWon();
    }
  }, [nowCard]);


  const renderCard = () => {
    if (correct) {
      return ( <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: '10%',
        // marginLeft: '5%',
        // paddingLeft: '40px',
        textAlign: 'center'
    }}>
        <CardFin/>
      </div>)
    }
    return (

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%',
        width: '100%',
        padding: '0',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {cardOrder.map((num) => {
          const isFlipped = nowCard.includes(num) || flippedCard.includes(num);
          return (<Card
            num={num}
            isFlipped={isFlipped}
            isDisabled={flippedCard.includes(num) || flipping}
            handleClick={() => selectCardSignal(num)}
          />)
        })}
      </div>


    );


  }
  return (<div style={{
    display: 'flex',
     justifyContent: 'center', 
     alignItems: 'center', 
     height: '80vh',
     width: '900px', 
     marginLeft: '0%',
     marginTop: '5%'
  }}>
    {!gameStarted && <button
      onClick={() => gameStartSignal()}
      style={{
        backgroundColor: 'rgb(255, 215, 3)',  // 버튼의 배경색
        color: 'white',
        fontSize: '30px',
        fontWeight: 'bold',
        padding: '20px 40px',
        borderRadius: '15px',
        border: '3px solid rgb(240, 165, 8)',
        cursor: 'pointer',
        marginLeft: '7%',
        width: '250px',
        height: '130px'
      }}
    >
      게임 시작
    </button>}
    {gameStarted && renderCard()}
  </div>)
}

CardFind.propTypes = {
  session: PropTypes.instanceOf(Session).isRequired, // session이 Session의 인스턴스인지 확인
};

export default CardFind