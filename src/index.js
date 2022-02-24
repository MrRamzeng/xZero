import React, { useState } from "react";
import reactDom from "react-dom";
import './index.scss';
import { classd } from "classd";

function Card(props) {
    let [hovered, setHovered] = useState(0);
    const images = props.images
    return (
        <>
            {images.map((image, i) => (
                <div key={i + 1}
                    className={classd`carousel-card card ${{
                        "carousel-card__hovered": hovered === i,
                    }}`}
                    onMouseOver={(e) => setHovered(i)}
                >
                    <>
                        <img className="carousel-card__image card-img" src={image.url} alt={"carousel_image_" + i} />
                        <div className="carousel-card__overlay text-uppercase">
                            <div className="dropdown-divider"></div>
                            <p className="card-text carousel-card__type">tour type</p>
                            <h5 className="card-title">tour name</h5>
                            <p className="card-text text-lowercase">price </p>
                        </div>
                    </>
                </div>
            ))}
        </>
    )
}

function Carousel() {
    let [active, setActive] = useState(0);
    const pages = [{
        images: [
            { url: require('./1.jpg') },
            { url: require('./2.png') },
            { url: require('./3.jpg') }
        ]
    }, {
        images: [
            { url: require('./2.png') },
            { url: require('./1.jpg') },
            { url: require('./3.jpg') }
        ]
    }, {
        images: [
            { url: require('./2.png') },
        ]
    }];

    function changeActive(delta) {
        setActive((active + delta + pages.length) % pages.length);
    }
    return (
        <div className="carousel-grid">
            <div className="carousel-grid__text">
                <h3>Подборки туров</h3>
                <p><b>Trip House</b> - это незабываемые впечатления и гарантированный заряд положительных эмоций</p>
                <p>Драйв и яркие впечатления, полное сопровождение.</p>
                <a href="#tours"><button className="btn rounded-circle btn-primary carousel-control-next-icon"></button>Все туры</a>
            </div>

            <div className="carousel-inner">
                {pages.map((page, i) => (
                    <div key={"page" + i} className={classd`carousel-item ${{ "active": active === i }}`}>
                        <div className="d-flex justify-content-evenly align-items-center">
                            <Card images={page.images} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="carousel-grid__indicators">
                <div className="page-indicator">
                    {pages.map((page, i) => (
                        <button key={"page" + i} type="button" className={"btn " + (
                            active === i ? "btn-primary" : "btn-light"
                        )} onClick={() => setActive(i)}></button>
                    ))}
                </div>

                <button type="button" className="btn-sm rounded-circle" onClick={() => {
                    changeActive(-1);
                }}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button type="button" className="btn-sm rounded-circle" onClick={() => {
                    changeActive(1);
                }}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    );
}

reactDom.render(
    // <React.StrictMode>
    //     <Game />
    // </React.StrictMode>,
    <Carousel />,
    document.getElementById('root')
);



// const fieldSize = 3
// class Game extends React.Component {
//     constructor(props) {
//         super(props);
//         const initialFieldSize = 3
//         this.state = {
//             fieldSize: initialFieldSize,
//             squares: Array(initialFieldSize).fill(null),
//             xIsNext: true,
//         };
//         this.handleClick = this.handleClick.bind(this)
//     }
//     handleClick(i) {
//         const squares = this.state.squares.slice();
//         squares[i] = this.state.xIsNext ? 'X' : '0';
//         this.setState({
//             squares: squares,
//             xIsNext: !this.state.xIsNext,
//         });
//     }
//     setFieldSize(newFieldSize) {
//         const size = parseInt(newFieldSize)
//         this.setState({
//             fieldSize: size,
//             squares: Array(size).fill(null),
//             xIsNext: true
//         })
//     }
//     render() {
//         if (!this.state.fieldSize) {
//             return (<>...</>)
//         } else {
//             return (
//                 <>
//                     <input type="number" value={this.state.fieldSize} min={3}
//                         onChange={e => this.setFieldSize(e.target.value)} />
//                     <div className="game">
//                         <div className="game-board">
//                             <Board fieldSize={this.state.fieldSize}
//                                 squares={this.state.squares} xIsNext={this.state.xIsNext}
//                                 handleClick={this.handleClick} />
//                         </div>
//                         <div className="game-info">
//                             <div>{ }</div>
//                             <ol>{ }</ol>
//                         </div>
//                     </div>
//                 </>
//             )
//         }
//     }
// }
// class Board extends React.Component {
//     constructor(props) {
//         super(props);
//         this.renderSquare = this.renderSquare.bind(this);
//     }
//     renderSquare(i, j) {
//         return (
//             <Square key={j} value={this.props.squares[i]}
//                 onClick={() => this.props.handleClick(i)} />
//         );
//     }
//    render() {
//         const winner = calculateWinner(this.props.squares);
//         console.log(this.props.squares)
//         let status;
//         let fieldArray = makeSizeArray(this.props.fieldSize)
//         if (winner) {
//             status = winner + 'win';
//         } else {
//             status = 'next move: ' + (this.props.xIsNext ? 'X' : '0');
//         }
//         return (
//             <div>
//                 <div className="status">{status}</div>
//                 {fieldArray.map((row, i) => <div key={i} className="board-row">
//                     {fieldArray.map((col, j) => this.renderSquare(row * this.props.fieldSize + col, j))}
//                 </div>)}
//             </div>
//         )
//     }
// }
// class Square extends React.Component {
//     render() {
//         return (
//             <button className="square" onClick={this.props.onClick}>
//                 {this.props.value}
//             </button>
//         )
//     }
// }
// function calculateWinner(squares) {
//     const winLines = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6]
//     ];
//     for (let i = 0; i < winLines.length; i++) {
//         const [a, b, c] = winLines[i];
//         if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//             return squares[a];
//         }
//     }
//     return null
// }
// function makeSizeArray(fieldSize) {
//     return new Array(fieldSize).fill().map((_, i) => i);
//     // const lenField = [];
//     // for (let i = 0; i < fieldSize; i++) {
//     //     lenField.push(i)
//     // }
//     // return lenField
// }
// window.makeSizeArray = makeSizeArray
// let winLines = [];
// for (let line = 0; line < fieldSize; line++) {
//     let cols = [];
//     let rows = [];
// 	for (let square = 0; square < fieldSize; square++) {
//         cols.push(line * fieldSize + square)
//         rows.push(line + fieldSize * square)
//     }
//     winLines.push(cols, rows)
// }
// console.log(winLines)