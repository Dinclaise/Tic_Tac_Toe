import React, {useState} from 'react';
import cls from './Game.module.css'

class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square value={this.props.squares[i]} 
          onClick={() => {this.props.onClick(i)}} />
      )
    }
  
    render() {
  
      return (
        <div>
          {/* <div className={cls.statusPlayer}>{status}</div> */}
          <div className={cls.blockSquares}>
            <div className={cls.boardRow}>
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className={cls.boardRow}>
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className={cls.boardRow}>
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
          </div>
        </div>
      );
    }
  }


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;

    
}


// managed component from Board
function Square(props) {
    return (
        <button className={cls.square}  onClick={() => props.onClick()}>
            {props.value}
        </button>
    )
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
        return;
    }
    
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      console.log(current.squares);


      const moves = history.map((step, move) => {
        const desc = move ? "Предыдущий ход № " + move : "К началу игры";
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        )
      });


      let status;
      if (winner) {
        status = 'Выиграл: ' + winner;
      } else {
        status = (this.state.stepNumber === 9 ? 'Ничья!' :  'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O'));
      } 

      return (
        <div className={cls.game}>
          <div className={cls.gameBoard}>
            <Board squares={current.squares}
                  onClick={(i) => this.handleClick(i)} />
          </div>
          <div className={cls.gameInfo}>
            <div className={cls.playerStatus}>{status}</div>
            <ol className={cls.gameMove}>{moves}</ol>
          </div>
        </div>
      );
    }
}

export default Game