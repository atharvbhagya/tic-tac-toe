import React from 'react';


class Square extends React.Component {
  constructor(props){
    super(props);
    this.state={
      symToShow: null,
      toShow: false
    }
  }
  render() {
    //var this.= this.props.sym;
    
    return (
      <button className="square" onClick={ ()=>{ this.props.onClickHandle(this.props.squareIndex); if(!this.props.winnerFound){this.setState({symToShow:this.props.sym, toShow: true}); }    } }>
        {this.state.toShow && this.state.symToShow}
      </button>
    );
  }
}

class Board extends React.Component {
 // this.props.clickHandle = this.props.clickHandle.bind(this);
 
  renderSquare(i) {
   
    return <Square squareIndex={i} onClickHandle= {this.props.clickHandle} sym={this.props.nxtSym} winnerFound={this.props.winnerFound}/>;
  }

  render() {
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
  constructor(props){
    super(props);
    this.winnerFound= false;
    this.isFindWinner= this.isFindWinner.bind(this);
    this.onClickHandle = this.onClickHandle.bind(this);
    this.state={
      squares: [[null,null,null],[null,null,null],[null,null,null]],
      nxtSym: 'X',
      nxtPlayer: '1',
      leftBlocks : 9,
      Winner: false,
      moves: []
      
    }
  }
   isFindWinner(matrix){
    const slots= [[['H1','V1','S1'],['H1','V2'],['H1','V3','S2']],[['H2','V1'],['H2','V2','S1','S2'],['H2','V3']],[['H3','V1','S2'],['H3','V2'],['H3','V3','S1']]];
    var xFill= new Map();
    var oFill= new Map();
    slots.forEach((hBar)=>{
      hBar.forEach((block)=>{
          block.forEach((slot)=>{
              xFill.set(slot,0);
              oFill.set(slot,0);
          })
      })
    });
    for(var i=0; i<3; ++i){
        for(var j=0; j<3; ++j){
            if(matrix[i][j] !=undefined){
                if(matrix[i][j] == 'X'){
                    slots[i][j].forEach((slot)=>{
                        var temp= xFill.get(slot);
                        temp++;
                       
                        xFill.set(slot,temp);
                        if(temp >= 3){
                          console.log('I was here bruhhh! true to Winner!')
                            this.winnerFound= true;
                        }
                    })
                }else if (matrix[i][j] == 'O'){
                  slots[i][j].forEach((slot)=>{
                      var temp= oFill.get(slot);
                      temp++;
                     
                      oFill.set(slot,temp);
                      if(temp >= 3){
                        this.winnerFound= true;
                    }
                  })
                }
            }
        }
    }
    console.log("this is xFill", xFill, "   This is the oFill", oFill);
   // return false;
  }
   onClickHandle(squareIndex){
     if(this.winnerFound){
       return;
     }
     console.log('Type of Winner state is', typeof(this.state.Winner));
    let i = Math.floor(squareIndex/3);
    let j = (squareIndex%3);
    var newSquares= this.state.squares;
    newSquares[i][j]= this.state.nxtSym;
    var nxtSym2= ((this.state.nxtSym === 'X') ? 'O': 'X');
    var nxtPlayer2= ((this.state.nxtPlayer === '1')? '2' : '1');
    var leftBlocks2= this.state.leftBlocks;
    leftBlocks2--;
     this.isFindWinner(newSquares);
    // if(winnerFound){
    //   return;
    // }
    console.log("this is newSquares", newSquares);
    console.log('has winner been found', this.winnerFound, "An the type is", typeof(this.winnerFound));
    // if(leftBlocks2 === 0){
    //    winnerFound = ;
    // }
    this.setState({squares: newSquares, 
                   nxtSym: nxtSym2 , 
                   nxtPlayer: nxtPlayer2, 
                   leftBlocks: leftBlocks2, 
                   Winner: this.winnerFound});
    
  
   
  }
  render() {
    const status1 = `Next player: ${this.state.nxtPlayer} and Next Symbol: ${this.state.nxtSym}`;
    var winner= null;
    if(this.winnerFound){
      winner= (this.state.nxtPlayer === '1')? '2': '1';
    }
    const status2 = `Winner is ${winner}`;
    const finalStatus= (this.winnerFound)? status2: status1;
    return (
      <div className="game">
        <div className="game-board">
          <Board clickHandle={this.onClickHandle} winnerFound={this.winnerFound} nxtSym= {this.state.nxtSym} nxtPlayer={this.state.nxtPlayer}/>
        </div>
        <div className="game-info">
          <div className="status">{finalStatus}</div>
          <ol>{}</ol>
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
