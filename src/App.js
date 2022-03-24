import React from "react";

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symToShow: null,
            toShow: false
        };
    }
    render() {
        //var this.= this.props.sym;
        const i = Math.floor(this.props.squareIndex / 3);
        const j = this.props.squareIndex % 3;
        var symPresent = this.props.squares[i][j];

        return (
            <button
                className="square"
                onClick={() => {
                    if (symPresent == undefined) {
                        this.props.onClickHandle(this.props.squareIndex);
                        if (!this.props.winnerFound) {
                            this.setState({
                                symToShow: this.props.sym,
                                toShow: true
                            });
                        }
                        symPresent = this.props.sym;
                    }
                }}
            >
                {this.state.toShow && symPresent}
            </button>
        );
    }
}

class Board extends React.Component {
    // this.props.clickHandle = this.props.clickHandle.bind(this);

    renderSquare(i) {
        return (
            <Square
                squareIndex={i}
                squares={this.props.squares}
                onClickHandle={this.props.clickHandle}
                sym={this.props.nxtSym}
                winnerFound={this.props.winnerFound}
            />
        );
    }

    render() {
        console.log(
            "This is the squares matrix when Board is rendered xo",
            this.props.squares
        );
        //console.log(this.props.clickHandle);
        // const status = `Next player: ${this.props.nxtPlayer} and Next Symbol: ${this.props.nxtSym}`;

        return (
            <div>
                {/* <div className="status">{status}</div> */}
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.winnerFound = false;
        this.isFindWinner = this.isFindWinner.bind(this);
        this.onClickHandle = this.onClickHandle.bind(this);
        this.navClickHandle = this.navClickHandle.bind(this);
        this.state = {
            squares: [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ],
            nxtSym: "X",
            nxtPlayer: "1",
            leftBlocks: 9,
            Winner: false,
            currentIndex: 0,
            history: [
                {
                    squares: [
                        [null, null, null],
                        [null, null, null],
                        [null, null, null]
                    ],
                    nxtSym: "X",
                    nxtPlayer: "1",
                    leftBlocks: 9,
                    Winner: false
                }
            ]
        };
    }
    isFindWinner(matrix) {
        const slots = [
            [
                ["H1", "V1", "S1"],
                ["H1", "V2"],
                ["H1", "V3", "S2"]
            ],
            [
                ["H2", "V1"],
                ["H2", "V2", "S1", "S2"],
                ["H2", "V3"]
            ],
            [
                ["H3", "V1", "S2"],
                ["H3", "V2"],
                ["H3", "V3", "S1"]
            ]
        ];
        var xFill = new Map();
        var oFill = new Map();
        slots.forEach((hBar) => {
            hBar.forEach((block) => {
                block.forEach((slot) => {
                    xFill.set(slot, 0);
                    oFill.set(slot, 0);
                });
            });
        });
        for (var i = 0; i < 3; ++i) {
            for (var j = 0; j < 3; ++j) {
                if (matrix[i][j] != undefined) {
                    if (matrix[i][j] == "X") {
                        slots[i][j].forEach((slot) => {
                            var temp = xFill.get(slot);
                            temp++;

                            xFill.set(slot, temp);
                            if (temp >= 3) {
                                console.log(
                                    "I was here bruhhh! true to Winner!"
                                );
                                this.winnerFound = true;
                            }
                        });
                    } else if (matrix[i][j] == "O") {
                        slots[i][j].forEach((slot) => {
                            var temp = oFill.get(slot);
                            temp++;

                            oFill.set(slot, temp);
                            if (temp >= 3) {
                                this.winnerFound = true;
                            }
                        });
                    }
                }
            }
        }
        console.log("this is xFill", xFill, "   This is the oFill", oFill);
        // return false;
    }

    ///
    onClickHandle(squareIndex) {
        if (this.winnerFound) {
            return;
        }
        console.log("Type of Winner state is", typeof this.state.Winner);

        //   var leftBlocks2 = this.state.leftBlocks;
        // leftBlocks2--;
        // this.isFindWinner(newSquares);
        // if(winnerFound){
        //   return;
        // }

        console.log(
            "has winner been found",
            this.winnerFound,
            "An the type is",
            typeof this.winnerFound
        );
        // if(leftBlocks2 === 0){
        //    winnerFound = ;
        // }
        // var tmpHistory = this.state.history.slice(0, this.state.currentIndex);

        // tmpHistory.push({
        //     squares: newSquares,
        //     nxtSym: nxtSym2,
        //     nxtPlayer: nxtPlayer2,
        //     Winner: this.winnerFound,
        //     leftBlocks: leftBlocks2
        // });
        // console.log("this is the val of tmpHistory", tmpHistory);
        //  const tmpIndex = this.state.currentIndex;
        // this.setState(
        //     {
        //         squares: newSquares,
        //         nxtSym: nxtSym2,
        //         nxtPlayer: nxtPlayer2,
        //         leftBlocks: leftBlocks2,

        //         Winner: this.winnerFound,
        //         currentIndex: tmpIndex + 1,
        //         history: tmpHistory
        //     },
        //     () => {
        //         console.log("Set State done from here lol!");
        //     }
        // );

        //Another way to write down the setState function using prevState and props
        this.setState((prevState) => {
            //squares matrix

            let i = Math.floor(squareIndex / 3);
            let j = squareIndex % 3;
            var newSquares = prevState.squares;
            newSquares[i][j] = prevState.nxtSym;
            const finalSquare = newSquares;
            console.log("this is newSquares", newSquares);
            var nxtSym2 = prevState.nxtSym === "X" ? "O" : "X";
            var nxtPlayer2 = prevState.nxtPlayer === "1" ? "2" : "1";
            var leftBlocks2 = prevState.leftBlocks;
            leftBlocks2--;
            this.isFindWinner(newSquares);
            var tmpIndex = prevState.currentIndex;
            var tmpHistory = prevState.history.slice(0, tmpIndex + 1);
            console.log("Thsi is the value of tmpHistory sliced", tmpHistory);
            tmpHistory.push({
                squares: finalSquare,
                nxtSym: nxtSym2,
                nxtPlayer: nxtPlayer2,
                Winner: this.winnerFound,
                leftBlocks: leftBlocks2
            });
            return {
                squares: newSquares,
                nxtSym: nxtSym2,
                nxtPlayer: nxtPlayer2,
                leftBlocks: leftBlocks2,
                Winner: this.winnerFound,
                currentIndex: tmpIndex + 1,
                history: tmpHistory
            };
        });
    }

    navClickHandle(historyIndex) {
        // const stateToSet= this.state.history[historyIndex];
        //this.setState(stateToSet);
        const tmpStateVals = this.state.history[historyIndex];
        console.log(
            "This is the value of history part to be fed in tmpStateVal",
            this.state.history
        );

        console.log("This is the tmpStateVals", tmpStateVals);
        // this.setState(
        //     {
        //         squares: tmpStateVals.squares,
        //         nxtPlayer: tmpStateVals.nxtPlayer,
        //         nxtSym: tmpStateVals.nxtSym,
        //         leftBlocks: tmpStateVals.leftBlocks,
        //         Winner: tmpStateVals.Winner,
        //         currentIndex: historyIndex,
        //         history: this.state.history
        //     },
        //     () => {
        //         console.log("Set State done from the nav click handle");
        //     }
        // );
    }
    render() {
        const status1 = `Next player: ${this.state.nxtPlayer} and Next Symbol: ${this.state.nxtSym}`;
        var winner = null;
        if (this.winnerFound) {
            winner = this.state.nxtPlayer === "1" ? "2" : "1";
        }
        const status2 = `Winner is ${winner}`;
        const finalStatus = this.winnerFound ? status2 : status1;
        const navBtns = this.state.history.map((history, index) => {
            return (
                <li>
                    {/* {console.log(
                        "Value of this in the histroy map for buttons is",
                        this
                    )} */}
                    <button onClick={() => this.navClickHandle(index)}>
                        {`Go to move #${index}`}
                    </button>
                </li>
            );
        });
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={this.state.squares}
                        clickHandle={this.onClickHandle}
                        winnerFound={this.winnerFound}
                        nxtSym={this.state.nxtSym}
                        nxtPlayer={this.state.nxtPlayer}
                    />
                </div>
                <div className="game-info">
                    <div className="status">{finalStatus}</div>
                    <ol>{navBtns}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

// ReactDOM.render(
//   <Game />,
//   document.getElementById('root')
// );

export default Game;
