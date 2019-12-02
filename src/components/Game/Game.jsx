import React, {useState} from 'react';
import cls from './Game.module.css'

let turn = 'X'

let gameIsOver = false

let board = ['', '', '',
             '', '', '',
             '', '', '']


let checkTheGameWinner = (gameState) => {
    
    let winnerCombination = [[0,1,2],[3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]];
    
    winnerCombination.forEach(c => {
        let isFine = true
        for(let i = 0; i < c.length; i++) {
            if(gameState[c[i]] !== turn || gameState[c[i]] === '') {
                isFine = false
            }
        }


        
        if(isFine) {
            console.log(turn, 'is winner')
            let elem = document.getElementsByClassName(cls.square)

            c.forEach(i => {
                elem[i].style.color = 'red'
                elem[i].style.fontSize = 5 + 'rem'
            })

            // squares.forEach(square => {
            //     square.textContent = ''
            // })
            gameIsOver = true
        }
    })

    if(gameState.join('').length === 9) {
        console.log('draw')
        gameIsOver = true
    }
}

const clearBoard = () => {
    let elem = document.getElementsByClassName(cls.square);
    for (let e of elem) {
        e.textContent = ''
        e.style = ''
    }

    turn = 'X'
    board = ['', '', '',
             '', '', '',
             '', '', '']
    gameIsOver = false
}

let nextStep = (e, squareIndex) => {
    if (!gameIsOver) {
        if (e.target.textContent == '') {
            
            e.target.textContent = turn
            //отрисовать значения под определенный индекс
    
            board[squareIndex] = turn
            checkTheGameWinner(board)
            turn === 'X' ? turn = 'O' : turn = 'X'
        }
        
    }
} 


class Square extends React.Component {
    render() {
        return (
            <div onClick={(e) => nextStep(e, this.props.index)} className={cls.square}>
                
            </div>
        )
    }
}


class Board extends React.Component {
    // renderSquare(index) {
    //     return <Square index={index}> </Square>
    // }

    render() {
        

        this.state = {
        }
        
        
        const status = `Next player: ${this.state.player}`

        return (
            <div>
                <div className={cls.statusPlayer}>{status}</div>
                <div className={cls.blockSquares}>
                    {board.map( (sq, i) => {
                        return <Square index={i}/>
                    })}
                </div>
            </div>
        )
    }
}

let squares = document.getElementsByClassName(cls.square);
class Game extends React.Component {
    render() {
        return(
            <div className={cls.game}>
                <div className={cls.gameBoard}>
                    <Board />
                </div>
                <button onClick={clearBoard}>Clear</button>
                <div className={cls.gameInfo}>
                    <div>//Result</div>
                    <ol>//Show score</ol>
                </div>
            </div>
        )
    }
}

export default Game