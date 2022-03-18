class Square extends React.Component {
    render() {
      var symToShow= null;
      return (
        <button className="square" onClick={ ()=>{ symToShow= this.props.nxtSym;  this.props.onClickHandle(this.props.squareIndex)} }>
          {symToShow}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return <Square squareIndex={i} onClickHandle= {this.props.clickHandle} sym={this.props.nxtSym}/>;
    }
  
    render() {
      const status = `Next player: ${this.props.nxtPlayer}`;
  
      return (
        <div>
          <div className="status">{status}</div>
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
      this.isFindWinner= this.isFindWinner.bind(this);
      this.onClickHandle = this.onClickHandle.bind(this);
      this.state={
        squares: [[null,null,null],[null,null,null],[null,null,null]],
        nxtSym: 'X',
        nxtPlayer: '1',
        leftBlocks : 9,
        Winner: false
      }
    }
    slots= [[['H1','V1','S1'],['H1','V2'],['H1','V3','S2']],[['H2','V1'],['H2','V2','S1','S2'],['H2','V3']],[['H3','V1','S2'],['H3','V2'],['H3','V3','S1']]];
     isFindWinner(matrix){
      let xFill,oFill= new Map();
      slots.forEach((hBar)=>{
        hBar.forEach((block)=>{
            block.forEach((slot)=>{
                xFill.set(slot,0);
                oFill.set(slot,0);
            })
        })
      });
      for( i=0; i<3; ++i){
          for(j=0; j<3; ++j){
              if(matrix[i][j] !=undefined){
                  if(matrix[i][j] === 'X'){
                      slots[i][j].forEach((slot)=>{
                          var temp= xFill.get(slot);
                          temp++;
                          if(temp === 3){
                              return true;
                          }
                          xFill.set(slot,temp);
                      })
                  }else{
                    slots[i][j].forEach((slot)=>{
                        var temp= oFill.get(slot);
                        temp++;
                        if(temp === 3){
                            return true;
                        }
                        oFill.set(slot,temp);
                    })
                  }
              }
          }
      }
      return false;
    }
     onClickHandle(squareIndex){
      let i = Math.round(squareIndex/3);
      let j = (squareIndex%3);
      var newSquares= this.state.squares;
      newSquares[i][j]= this.state.nxtSym;
      var nxtSym2= ((this.state.nxtSym === 'X') ? 'O': 'X');
      var nxtPlayer2= ((this.state.nxtPlayer === '1')? '2' : '1');
      var leftBlocks2= this.state.leftBlocks;
      leftBlocks2--;
      var winnerFound= isFindWinner(newSquares);
      // if(leftBlocks2 === 0){
      //    winnerFound = ;
      // }
      this.setState({squares: newSquares, 
                     nxtSym: nxtSym2 , 
                     nxtPlayer: nxtPlayer2, 
                     leftBlocks: leftBlocks2, 
                     Winner: winnerFound});
      
    
     
    }
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board clickHandle={this.onClickHandle} nxtSym= {this.state.nxtSym} nxtPlayer={this.state.nxtPlayer}/>
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
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