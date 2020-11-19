import './App.css';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Board, KiSquares } from './components/Board';

const AppWrappre = styled.div`
  max-width: 1920px;
`

const PlayingKi = styled(KiSquares)`
  border: 1px solid black;
  margin: 0;
`

const status = [];

for (let y = 0; y < 19; y++) {
  status[y] = [];
  for (let x = 0; x < 19; x++) {
    status[y][x] = {
      x,
      y,
      kiColor: '',
      counter: 1
    }
  }
}

function App() {

  const handlers = {
    placeKi: e => {
      const x = Number(e.target.attributes['data-x'].value);
      const y = Number(e.target.attributes['data-y'].value);
      if (ki[y][x].kiColor) return
      setKi(ki.map(row => {
        return row.map(square => {
          return ((square.x === x) && (square.y === y))
            ? {...square, kiColor: gameStatus.playing}
            : square
        });
      }))
      setGameStatus({
        playing: gameStatus.playing === 'black' ? 'white' : 'black',
        order: gameStatus.order + 1,
      })
    },

    whoWin: (x, y) => {
      const color = ki[y][x].kiColor;
      const lins = {
        vertical: { dx: x - 4, dy: y}
      }

    }
  }

  const [ki, setKi] = useState(status);
  const [gameStatus, setGameStatus] = useState(
    {
      playing: 'black',
      order: 1,
    }
  );

  useEffect(() => {
    let x = Math.floor(Math.random()*19);
    let y = Math.floor(Math.random()*19);
    console.log('useEffect: ',ki[y][x]);
  }, [ki])

  return (
    <AppWrappre className="App">
      <h1>小遊戲-五子棋</h1>
      <h3>Now Playing: <span><PlayingKi kiColor={gameStatus.playing}/></span></h3>
      <Board ki={ki} handlers={handlers}/>
    </AppWrappre>
  );
}

export default App;
