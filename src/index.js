import React from "react";
import reactDom from "react-dom";
import './index.css';

class Game extends React.Component {
    constructor(props) {
        super(props);
        const initialFieldSize = 3
        this.state = {
            fieldSize: initialFieldSize,
            squares: Array(initialFieldSize).fill(null),
            xIsNext: true,
        };
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? 'X' : '0';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    setFieldSize(newFieldSize) {
        const size = parseInt(newFieldSize)
        this.setState({
            fieldSize: size,
            squares: Array(size).fill(null),
            xIsNext: true
        })
    }

    render() {
        if (!this.state.fieldSize) {
            return (<>...</>)
        } else {
            return (
                <>
                    <input type="number" value={this.state.fieldSize} min={3} 
                        onChange={e => this.setFieldSize(e.target.value)} />
                    <div className="game">
                        <div className="game-board">
                            <Board fieldSize={this.state.fieldSize} 
                                squares={this.state.squares} xIsNext={this.state.xIsNext}
                                handleClick={this.handleClick} />
                        </div>
                        <div className="game-info">
                            <div>{ }</div>
                            <ol>{ }</ol>
                        </div>
                    </div>
                </>
            )
        }
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.renderSquare = this.renderSquare.bind(this);
    }

    renderSquare(i, j) {
        return (
            <Square key={j} value={this.props.squares[i]}
                onClick={() => this.props.handleClick(i)} />
        );
    }
    
    render() {
        const winner = calculateWinner(this.props.squares);
        console.log(this.props.squares)
        let status;
        let fieldArray = makeSizeArray(this.props.fieldSize)
        if (winner) {
            status = winner + 'win';
        } else {
            status = 'next move: ' + (this.props.xIsNext ? 'X' : '0');
        }
        return (
            <div>
                <div className="status">{status}</div>
                {fieldArray.map((row, i) => <div key={i} className="board-row">
                    {fieldArray.map((col, j) => this.renderSquare(row * this.props.fieldSize + col, j))}
                </div>)}
            </div>
        )
    }
}

class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={this.props.onClick}>
                {this.props.value}
            </button>
        )
    }
}

function makeSizeArray(fieldSize) {
    return new Array(fieldSize).fill().map((_, i) => i);
}
window.makeSizeArray = makeSizeArray

reactDom.render(
    <React.StrictMode>
        <Game />
    </React.StrictMode>,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const winLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < winLines.length; i++) {
        const [a, b, c] = winLines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null
}
