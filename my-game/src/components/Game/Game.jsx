import React, {useState} from 'react';
import cls from './Game.module.css'

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        }
        
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        })
    }

    renderSquare(i) {
      return <Square value={this.state.squares[i]} 
        onClick={() => {this.handleClick(i)} } />;
    }
  
    render() {
        const winner = calculateWinner(this.state.squares);
        console.log(this.state.squares);
        let status;

        if (winner) {
            return `Player: ${winner} win!`;
        } else {
            status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
        }
  
      return (
        <div>
          <div className={cls.statusPlayer}>{status}</div>
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
        <button className={cls.square}  onClick={() => props.onClick()} >
            {props.value}
        </button>
    )
}


class Game extends React.Component {
    render() {
      return (
        <div className={cls.game}>
          <div className={cls.gameBoard}>
            <Board />
          </div>
          <div className={cls.gameInfo}>
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
}

export default Game