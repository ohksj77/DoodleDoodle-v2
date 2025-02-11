import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router';
import GameBGImg from '../components/GameBGImg';
import MobileResultMulti from '../components/MobileResultMulti';
import ResultButtons from '../components/ResultButtons';
import ResultMulti from '../components/ResultMulti';
import '../scrollbar.css';

const backBaseUrl = process.env.REACT_APP_BACKEND_URL;
const getInfoURL = `${backBaseUrl}/results/games/`;

function ResultMany() {
  const [playersInfo, setPlayersInfo] = useState([]);
  const [randword, setRandword] = useState('');
  const [infoLoading, setInfoLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const gameId = useRef(-1);

  const isMobile = useMediaQuery({
    query: '(max-width: 700px)',
  });
  const isPc = useMediaQuery({
    query: '(min-width: 701px)',
  });

  function setGameid() {
    gameId.current = queryParams.get('game-id');
  }

  function setResultString(drawno, word, similarity) {
    if (similarity < 30) {
      return `AI는 player${drawno}의 ${word}을 ${similarity}% 밖에 예측못했네요...`;
    }
    if (similarity < 60) {
      return `AI는 player${drawno}의 ${word}을 ${similarity}% 정도로 예측했네요.`;
    }
    return `AI는 player${drawno}의 ${word}을 ${similarity}% 나, 예측했어요!`;
  }

  async function getData() {
    const heders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    };

    await axios.get(getInfoURL + gameId.current.toString(), heders).then(response => {
      setRandword(response.data.random_word);
      setPlayersInfo(response.data.results);
      setInfoLoading(loading => !loading);
    });
  }
  useEffect(() => {
    setGameid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getData();
  }, [gameId]);

  useEffect(() => {
    // console.log('infoLoading', infoLoading);
  }, [infoLoading]);

  return (
    <div id="resultmanypage" className={`relative flex w-screen h-screen ${isMobile ? 'bg-primary' : 'bg-primary-1'}`}>
      <GameBGImg pageName="ResultMany" />
      <div
        className="deskTop:py-[2rem] mobile:pt-[7vh] w-full h-[100vh] absolute overflow-y-auto 
        scrollSection overflow-x-hidden inline-box text-center
      "
      >
        <h1
          className="text-black font-cookierun text-left
          deskTop:text-5xl mobile:text-[6.5vw] my-[4rem] deskTop:ml-[4rem] mobile:text-center mobile:my-[2rem]"
        >
          누가 더 똑같이 그렸을까요?
        </h1>
        {isMobile && infoLoading && (
          <div
            className="scrollSection deskTop:h-[25rem] mobile:h-[50vh] 
            deskTop:py-[2rem] px-[0.8rem] overflow-y-auto text-center m-auto mb-[1.5rem]"
          >
            {playersInfo.map((player, index) => (
              <MobileResultMulti
                rank={index + 1}
                percentage={player.similarity}
                doodle={player.image_url}
                player={player.player_no}
                key={player.draw_id}
                drawid={player.draw_id}
                gameId={gameId.current}
              />
            ))}
          </div>
        )}
        {isPc && infoLoading && (
          <div
            className="flex flex-wrap place-content-around w-[85%] 
          justify-center m-auto"
          >
            {playersInfo.map((player, index) => (
              <ResultMulti
                rank={index + 1}
                percentage={player.similarity}
                doodle={player.image_url}
                player={player.player_no}
                key={player.draw_id}
                drawid={player.draw_id}
                number={playersInfo.length}
                gameId={gameId.current}
              />
            ))}
          </div>
        )}
        {infoLoading && (
          <div
            className="mobile:absolute mobile:text-center mobile:bottom-[9vh]
            mobile:items-center mobile:w-[100%] deskTop:w-[40vw] deskTop:max-w-[65vh]
            deskTop:fixed deskTop:bottom-[6vh] deskTop:right-[8vw]"
          >
            <ResultButtons
              isforOne={false}
              isFromGamePage={-1}
              userNum={playersInfo.length}
              img={playersInfo[0].image_url}
              resultString={setResultString(playersInfo[0].player_no, randword, playersInfo[0].similarity)}
              id={gameId.current}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default ResultMany;
