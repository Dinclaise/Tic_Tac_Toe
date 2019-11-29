import React from 'react';
import cls from './Game.module.css'

class Square extends React.Component {
    render() {
        return (
            <button className={cls.square}>
                {this.props.value}
            </button>
        )
    }
}


class Board extends React.Component {
    renderSquare(i) {
        return <Square value={i}/>
    }

    render() {
        const status = "Next player: X"

        return (
            <div>
                <div className={cls.statusPlayer}>{status}</div>
                <div className={cls.blockSquares}>
                    <div className={cls.borderRowSquares}>
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className={cls.borderRowSquares}>
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className={cls.borderRowSquares}>
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                </div>
            </div>
        )
    }
}


class Game extends React.Component {
    render() {
        return(
            <div className={cls.game}>
                <div className={cls.gameBoard}>
                    <Board />
                </div>
                <div className={cls.gameInfo}>
                    <div>//Result</div>
                    <ol>//Show score</ol>
                </div>
            </div>
        )
    }
}

export default Game