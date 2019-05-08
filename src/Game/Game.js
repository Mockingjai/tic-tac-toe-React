import React, { Component } from 'react';
import Board from "../Board/Board";

const _styles = {
    button_reset: {
        position: 'absolute',
        top: '75px',
        left: '410px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        height: '25px',
        color: 'white',
        backgroundColor: 'skyblue',
        boxShadow: '2px 2px 2px grey',
        borderRadius: '4px 3px 4px 3px',
    },
    turn_status: {
        fontSize: '16px',
        padding: '10px 0 0 0',
        fontFamily: 'monospace',
        color: 'brown',
    },
    history_button: {
        fontSize: '16px',
        height: '25px',
        color: 'white',
        backgroundColor: 'green',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '4px 2px 4px black',
        borderRadius: '2px 3px 2px 3px',
        margin: '0 0 5px 0',
    }
};

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                }
            ],
            stepNumber: 0,
            xlsNext: true,
        };
    }

    handleClick = ( i ) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xlsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xlsNext: !this.state.xlsNext,
        });
    };

    handleReset = (  ) => {
        this.setState({
            history: [
                {
                    squares: Array(9).fill(null),
                }
            ],
            stepNumber: 0,
            xlsNext: true,
        })
    };

    jumpTo = ( step ) => {
        this.setState({
            stepNumber: step,
            xlsNext: ( step % 2 ) === 0
        });
    };

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button
                        style={ {..._styles.history_button } }
                        onClick={() => this.jumpTo(move)}>{desc}
                    </button>
                </li>
            );
        });
        let status,
            _winner;
        if(winner) {
            _winner = `Winner ${ winner }`;
            const showWinner = new Promise((resolve, reject) => {
                if(_winner === `Winner ${ winner }` ) {
                    resolve(_winner)
                }
            });
            showWinner.then((_winner) => alert(_winner));
        } else {
            status = `Next player: ${(this.state.xlsNext ? "X" : "O")}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <button
                        style={ { ..._styles.button_reset } }
                        onClick={() => this.handleReset()}>Reset game
                    </button>
                    <div style={ { ..._styles.turn_status } }>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}