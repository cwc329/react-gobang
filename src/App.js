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
  console.log('render');
  const [ki, setKi] = useState(status);
  const [gameStatus, setGameStatus] = useState(
    {
      playing: 'black',
      order: 1,
      winner: '',
      records: []
    }
  );

  const handlers = {
    placeKi: e => {
      const x = Number(e.target.attributes['data-x'].value);
      const y = Number(e.target.attributes['data-y'].value);
      if (gameStatus.winner || ki[y][x].kiColor) return
      setKi(ki.map(row => {
        return row.map(square => {
          return ((square.x === x) && (square.y === y))
            ? {...square, kiColor: gameStatus.playing}
            : square
        });
      }))
      setGameStatus({
        ...gameStatus,
        playing: gameStatus.playing === 'black' ? 'white' : 'black',
        order: gameStatus.order + 1,
        records: [...gameStatus.records, {order: gameStatus.order, x, y, color:gameStatus.playing}]
      });
    },

    whoWin: (x, y) => {
      const color = ki[y][x].kiColor;
      const lines = [
        {
          startPoint: {x: x, y: y - 4},
          dx: 0,
          dy: 1
        },
        {
          startPoint: {x: x - 4, y: y},
          dx: 1,
          dy: 0
        },
        {
          startPoint: {x: x - 4, y: y - 4},
          dx: 1,
          dy: 1
        },
        {
          startPoint: {x: x - 4, y: y + 4},
          dx: 1, 
          dy: -1
        }
      ]
      for (const line of lines) {
        let startX = line.startPoint.x;
        let startY = line.startPoint.y;
        
        let kies = 0;
        for (let i = 0; i < 5; i++) {
          if (ki[startY] === undefined || ki[startY][startX] === undefined || ki[startY][startX].kiColor !== color) {
            kies = 0;
            startX += line.dx;
            startY += line.dy;
            continue;
          };
          kies = 1;
          //console.log({startX, startY})
          let currentX = startX + line.dx;
          let currentY = startY + line.dy;
          for (let j = 0; j < 4; j++) {
            //console.log({currentX, currentY});
            if (ki[currentY] === undefined || ki[currentY][currentX] === undefined || ki[currentY][currentX].kiColor !== color) {
              kies = 0;
              continue;
            };
            kies += 1;
            currentX += line.dx;
            currentY += line.dy;
            //console.log({kies})
            //console.log('lll',{color})
            if (kies === 5) {
              return setGameStatus(
                {
                  ...gameStatus,
                  winner: color
                }
              )
            };
          }
        }
      }
    }
  }

  useEffect(() => {
    const { records } = gameStatus;
    if (records.length !== 0) {
      console.log('deciding');
      const { x, y } = records[records.length - 1];
      console.log({x,y})
      handlers.whoWin(x, y);
    }
    console.log('useEffect', gameStatus);
  }, [ki])

  useEffect(() => {
    if (gameStatus.winner) 
      {
        alert(`${gameStatus.winner === 'black' ? '黑子' : '白子'}勝`)
      }
  }, [gameStatus.winner])

  return (
    <AppWrappre className="App">
      <h1>小遊戲-五子棋</h1>
      <h3>Now Playing: <span><PlayingKi kiColor={gameStatus.playing}/></span></h3>
      <Board ki={ki} handlers={handlers}/>
    </AppWrappre>
  );
}

export default App;
