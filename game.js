var prompt = require('prompt');

var gameStart = function (test) {
  //init game board
  //print empty board
  prompt.start();
  if(test) {
    tests();
  }
  var board = [
    [0, 0, 0], 
    [0, 0, 0], 
    [0, 0, 0]
  ];
  playTurn(board, true)
};

var playTurn = function(board, turn) {
  renderBoard(board);
  if (turn) {
    console.log('Player one\'s turn.  Where do you want to play? ')
    prompt.get(['play'], (err, results) => {
      var move = results.play;
      console.log(typeof move);
      if (move === undefined || typeof parseInt(move) !== 'number' || move > 9 || move < 0) {
        console.log('invalid move!\n');
        playTurn(board, turn);
        return
      } else {
        var row = parseInt(move) % 3;
        var col = Math.floor(parseInt(move) / 3)
        board[col][row] = 1;
      }
      var cont = gameContinues(board);
      if (cont !== 0) {
        renderBoard(board);
        console.log('Player ' + cont + 'wins!');
        return
      }
      playTurn(board, !turn)
      return
    })
  } else {
    console.log('Player two\'s turn.  Where do you want to play? ')
    prompt.get(['play'], (err, results) => {
      var move = results.play
      if (move === undefined || typeof parseInt(move) !== 'number' || move > 9 || move < 0) {
        console.log('invalid move!\n');
        playTurn(board, turn);
        return
      } else {
        var row = parseInt(move) % 3;
        var col = Math.floor(parseInt(move) / 3)
        board[col][row] = 2;
      }
      var cont = gameContinues(board);
      if (cont !== 0) {
        renderBoard(board);
        console.log('Player ' + cont + 'wins!');
        return
      }
      playTurn(board, !turn)
      return
    })
  }
  
}

var gameContinues = function (board) {
  for (var i = 0; i < 3; i ++) {
    var check = true;
    var firstCol = board[0][i];
    var firstRow = board[i][0];
    for (var j = 0; j < 3; j++) {
      var curCol = board[j][i];
      if (curCol !== firstCol) {
        check = false;
      } else if (curCol === firstCol && j === 2 && check) {
        return curCol;
      }
    }
    var check = true;
    for (var j = 0; j < 3; j++) {
      var curRow = board[i][j];
      if (curRow !== firstRow) {
        var check = false;
      } else if (curRow === firstRow && j === 2 && check) {
        return curRow;
      }
    }
  }
  var check = true;
  var firstDiag = board[0][0];
  for (var d = 0; d < 3; d++) {
    var curDiag = board[d][d];
    if (curDiag !== firstDiag) {
      var check = true;
    } else if (curDiag === firstDiag && d === 2 && check) {
      return curDiag;
    }
  }
  var fistDiag = board[0][2];
  for (var d = 0; d < 3; d++) {
    var curDiag = board[d][2 - d];
    if (curDiag !== firstDiag) {
      var check = true;
    } else if (curDiag === firstDiag && d === 2 && check) {
      return curDiag;
    }
  }
  return 0;
};

var renderBoard = function (board) {
  var tempBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (board[i][j] === 1) {
        tempBoard[i][j] = 'X'
      } else if (board[i][j] === 2) {
        tempBoard[i][j] = 'O';
      } else {
        tempBoard[i][j] = '-';
      }
    }
  }
  console.log(tempBoard[0] + '\n' + tempBoard[1] + '\n' + tempBoard[2] + '\n');
}

var tests = function () {
  var board = [
    [0, 0, 0], 
    [0, 0, 0], 
    [0, 0, 0]
  ];
  console.log(0 === gameContinues(board));
  var board = [
    [2, 2, 2], 
    [0, 0, 0], 
    [0, 0, 0]
  ];
  console.log(2 === gameContinues(board));
  var board = [
    [1, 0, 0], 
    [1, 0, 0], 
    [1, 0, 0]
  ];
  console.log(1 === gameContinues(board));
  var board = [
    [1, 0, 0], 
    [0, 1, 0], 
    [0, 0, 1]
  ];
  console.log(1 === gameContinues(board));

}

gameStart(true);




