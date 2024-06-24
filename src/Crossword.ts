// Crossword.ts
// contains class 'Crossword' with useful props and methods
// every 'Crossword' defines by an array of 'Word' interface instances
// these arrays are stored in the 'Levels.ts'

// word in crosswords
interface Word {
  n: number;        // word number (index in crossword)
  text: string;     // correct word
  desc: string;     // word description
  col: number;      // column number (where the first letter is located)
  row: number;      // row number (where the first letter is located)
  isDown: boolean;  // word is vertical or not (horizontal)
}

// crossword's class
export default class Crossword {
  words: Word[];                  // array of the words
  rows: number;                   // total number of rows in the board
  cols: number;                   // total number of columns in the board
  board: string[][];              // board filled with the correct words (' ' on empty cells)
  emptyBoard: string[][];         // board filled with '' instead of the words (' ' on empty cells)
  downDesc: string[];             // array of the vertical word descriptions
  acrossDesc: string[];           // array of the horizontal word descriptions
  cellToWordsN: number[][][];     // cellToWordsN[<0 if word-is-down else 1>][<row>][<col>] -> <number of the word in which the cell is> (else <0>)
  cellToWordsStartN: number[][];  // cellToWordsStartN[<row>][<col>] -> <number of the word which starts in the cell> (else <0>)
  descIdxToN: number[][];         // descIdxToN[<0 if word-is-down else 1>][<desk-idx>] -> <number of the word that matches this description> (else <0>)
  nToIdx: number[][];             // nToIdx[<0 if word-is-down else 1>][<n>] -> <index of the n-word in the array> (else <0>)

  // creates crossword from the words
  constructor(words: Word[]) {
    this.words = words;

    this.rows = 0;
    this.cols = 0;
    this.calcSize();

    this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill(' '));
    this.emptyBoard = Array.from({ length: this.rows }, () => Array(this.cols).fill(' '));
    this.calcBoard();

    this.downDesc = [];
    this.acrossDesc = [];
    this.descIdxToN = Array.from({ length: 2 }, () => Array(this.words.length).fill(0));
    this.calcDesc();

    this.cellToWordsN = Array.from({ length: this.rows }, () => Array.from({ length: this.cols }, () => Array(2).fill(0)));
    this.cellToWordsStartN = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
    this.calcWordsN();

    this.nToIdx = Array.from({ length: 2 }, () => Array(this.words[this.words.length - 1].n + 1).fill(0));
    this.calcNToIdx();
  }

  // calculates rows and cols
  private calcSize(): void {
    for (let word of this.words) {
      this.rows = word.isDown ? Math.max(this.rows, word.row + word.text.length) : Math.max(this.rows, word.row + 1);
      this.cols = word.isDown ? Math.max(this.cols, word.col + 1) : Math.max(this.cols, word.col + word.text.length);
    }
  }

  // calculates board
  private calcBoard(): void {
    for (let word of this.words) {
      for (let i = 0; i < word.text.length; i++) {
        this.board[word.row + (word.isDown ? i : 0)][word.col + (!word.isDown ? i : 0)] = word.text[i];
        this.emptyBoard[word.row + (word.isDown ? i : 0)][word.col + (!word.isDown ? i : 0)] = '';
      }
    }
  }

  // calculates description
  private calcDesc(): void {
    for (let word of this.words) {
      (word.isDown ? this.downDesc : this.acrossDesc).push(`${word.n}.${word.n < 10 ? '   ' : ' '}${word.desc}`);
      this.descIdxToN[word.isDown ? 0 : 1][(word.isDown ? this.downDesc : this.acrossDesc).length - 1] = word.n;
    }
  }

  // calculates cellToWordsN and cellToWordsStartN
  private calcWordsN(): void {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        for (let word of this.words) {
          if (word.row === row && word.col === col) {
            this.cellToWordsStartN[row][col] = word.n;
            for (let j = 0; j < word.text.length; j++) {
              this.cellToWordsN[row + (word.isDown ? j : 0)][col + (!word.isDown ? j : 0)][word.isDown ? 0 : 1] = word.n;
            }
          }
        }
      }
    }
  }

  // calculates NToIdx
  private calcNToIdx(): void {
    for (let [i, word] of this.words.entries()) {
      this.nToIdx[word.isDown ? 0 : 1][word.n] = i;
    }
  }

  // true if we can move focus on <board[row - 1][col]>
  public canMoveUp(focusedWordDown: number, row: number, col: number, board: string[][]): boolean {
    return focusedWordDown !== 0 && row > 0 && board[row - 1][col] !== ' ' && this.words[this.nToIdx[0][focusedWordDown]].isDown;
  }

  // true if we can move focus on <board[row][col - 1]>
  public canMoveLeft(focusedWordAcross: number, row: number, col: number, board: string[][]): boolean {
    return focusedWordAcross !== 0 && col > 0 && board[row][col - 1] !== ' ' && !this.words[this.nToIdx[1][focusedWordAcross]].isDown;
  }

  // true if we can move focus on <board[row + 1][col]>
  public canMoveDown(focusedWordDown: number, row: number, col: number, board: string[][]): boolean {
    return focusedWordDown !== 0 && row < this.rows - 1 && board[row + 1][col] !== ' ' && this.words[this.nToIdx[0][focusedWordDown]].isDown;
  }

  // true if we can move focus on <board[row][col + 1]>
  public canMoveRight(focusedWordAcross: number, row: number, col: number, board: string[][]): boolean {
    return focusedWordAcross !== 0 && col < this.cols - 1 && board[row][col + 1] !== ' ' && !this.words[this.nToIdx[1][focusedWordAcross]].isDown;
  }

  // true if the word this description index <descIdx> is focused
  public descOnFocus(isDown: boolean, focusedWord: number[], descIdx: number): boolean {
    return this.descIdxToN[isDown ? 0 : 1][descIdx] === focusedWord[isDown ? 0 : 1];
  }

  // true if <board[row][col]> is focused
  public indexOnFocus(focusedCellDown: number, focusedCellAcross: number, row: number, col: number): boolean {
    return this.cellToWordsStartN[row][col] === 0 || (focusedCellDown === row && focusedCellAcross === col);
  }

  // true if <board[row][col]> is the part of the focused word
  public cellInWord(focusedWordDown: number, focusedWordAcross: number, row: number, col: number): boolean {
    return (focusedWordDown !== 0 && this.cellToWordsN[row][col][0] === focusedWordDown) || (focusedWordAcross !== 0 && this.cellToWordsN[row][col][1] === focusedWordAcross);
  }

  //
  public getWord(n: number, isDown: boolean): Word | null {
    for (let word of this.words) {
      if (word.n == n && word.isDown == isDown) {
        return word;
      }
    }
    return null;
  }

  //
  public setWord(board: string[][], word: Word, text: string): string[][] {
    const newBoard = board.map(row => [...row]);
    for (let i = 0; i < text.length; i++) {
      newBoard[word.row + (word.isDown ? i : 0)][word.col + (!word.isDown ? i : 0)] = text[i];
    }
    return newBoard;
  }

  //
  public deleteWord(board: string[][], word: Word): string[][] {
    const newBoard = board.map(row => [...row]);
    for (let i = 0; i < word.text.length; i++) {
      const orthoN = this.cellToWordsN[word.row + (word.isDown ? i : 0)][word.col + (!word.isDown ? i : 0)][word.isDown ? 1 : 0];
      if (orthoN !== 0) {
        const orthoWord = this.words[this.nToIdx[word.isDown ? 1 : 0][orthoN]];
        let filled = true;
        for (let j = 0; j < orthoWord.text.length; j++) {
          if (board[orthoWord.row + (orthoWord.isDown ? j : 0)][orthoWord.col + (!orthoWord.isDown ? j : 0)] === '') {
            filled = false;
          }
        }
        if (!filled) {
          newBoard[word.row + (word.isDown ? i : 0)][word.col + (!word.isDown ? i : 0)] = '';
        }
      } else {
        newBoard[word.row + (word.isDown ? i : 0)][word.col + (!word.isDown ? i : 0)] = '';
      }
    }
    return newBoard;
  }

  //
  public getMistakes(board: string[][]): boolean[][] {
    const newMistakes = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (board[row][col] !== this.board[row][col]) {
          newMistakes[row][col] = true;
        }
      }
    }
    return newMistakes;
  }
}
