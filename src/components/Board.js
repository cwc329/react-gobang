import styled from 'styled-components';
import { useState } from 'react';

const BoardLayer1 = styled.div`
  width: 780px;
  height: 780px;
  position: relative;
  background: #965a35;
  margin: 0 auto;
  border: 2px solid black;
`;

const BoardLayer2 = styled.div`
  width: 760px;
  height: 760px;
  margin: 0 auto;
  position: absolute;
  left: 10px;
  top 10px;
`;

const BoardLayer3 = styled.div`
  width: 720px;
  height: 720px;
  margin: 0 auto;
  position: absolute;
  border: 0.5px solid black;
  left: 30px;
  top 30px;
`;

const KiSquares = styled.div`
  width: 30px;
  height: 30px;
  margin: 5px;
  display: inline-block;
  box-sizing: border-box;
  border-radius: 50%;
  background: ${props => props.kiColor};
  cursor: pointer;
`

const LineSquare = styled.div`
  width: 40px;
  height: 40px;
  display: inline-block;
  box-sizing: border-box;
  border: 2px solid black;
`

const setting = []
for (let i = 0; i < 18; i++) {
  setting.push([]);
  for (let j = 0; j < 18; j++) {
    setting[i].push([j, i]);
  }
}
function Board({ ki, handlers }) {
  const [boardSetting] = useState(setting);
  return(
  <div>
    <BoardLayer1>
      <BoardLayer3>
        {
          boardSetting.map( row => {
            return  row.map( square => {
              return <LineSquare key={square[0] * 100 + square[1]}>&nbsp;</LineSquare>
            })
          })
        }
      </BoardLayer3>
      <BoardLayer2>
        {
          ki.map(row => {
            return (
              row.map(square => {
                return (
                  <KiSquares
                    key={square.x * 100 + square.y}
                    kiColor={square.kiColor}
                    data-x={square.x}
                    data-y={square.y}
                    onClick={handlers.placeKi}
                  >
                    &nbsp;
                  </KiSquares>
                )
              })
            )
          })
        }
      </BoardLayer2>
    </BoardLayer1>
  </div>
  )
}

export { Board, KiSquares }