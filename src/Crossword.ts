interface Word {
  n: number;
  text: string;
  desc: string;
  col: number;
  row: number;
  isDown: boolean;
}

export default class Crossword {
  words: Word[];
  rows: number;
  cols: number;
  board: string[][];
  emptyBoard: string[][];
  downDesc: string[];
  acrossDesc: string[];
  wordsN: number[][][];
  wordsStartN: number[][];
  descToN: number[][];
  nToIdx: number[][];

  constructor(words: Word[]) {
    this.words = words;

    this.rows = 0;
    this.cols = 0;
    this.calcSize();

    this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill(' '));
    this.emptyBoard = Array.from({ length: this.rows }, () => Array(this.cols).fill(' '));
    this.createBoard();

    this.downDesc = [];
    this.acrossDesc = [];
    this.descToN = Array.from({ length: 2 }, () => Array(this.words.length).fill(0));
    this.createDescription();

    this.wordsN = Array.from({ length: this.rows }, () => Array.from({ length: this.cols }, () => Array(2).fill(0)));
    this.wordsStartN = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
    this.createWordsN();

    this.nToIdx = Array.from({ length: 2 }, () => Array(this.words[this.words.length - 1].n + 1).fill(0));
    this.createNToIdx();
  }

  private calcSize(): void {
    for (let word of this.words) {
      this.rows = word.isDown ? Math.max(this.rows, word.row + word.text.length) : Math.max(this.rows, word.row + 1);
      this.cols = word.isDown ? Math.max(this.cols, word.col + 1) : Math.max(this.cols, word.col + word.text.length);
    }
  }

  private createBoard(): void {
    for (let word of this.words) {
      for (let i = 0; i < word.text.length; i++) {
        this.board[word.row + (word.isDown ? i : 0)][word.col + (!word.isDown ? i : 0)] = word.text[i];
        this.emptyBoard[word.row + (word.isDown ? i : 0)][word.col + (!word.isDown ? i : 0)] = '';
      }
    }
  }

  private createDescription(): void {
    for (let word of this.words) {
      (word.isDown ? this.downDesc : this.acrossDesc).push(`${word.n}.${word.n < 10 ? '   ' : ' '}${word.desc}`);
      this.descToN[word.isDown ? 0 : 1][(word.isDown ? this.downDesc : this.acrossDesc).length - 1] = word.n;
    }
  }

  private createWordsN(): void {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        for (let word of this.words) {
          if (word.row === row && word.col === col) {
            this.wordsStartN[row][col] = word.n;
            for (let j = 0; j < word.text.length; j++) {
              this.wordsN[row + (word.isDown ? j : 0)][col + (!word.isDown ? j : 0)][word.isDown ? 0 : 1] = word.n;
            }
          }
        }
      }
    }
  }

  private createNToIdx(): void {
    for (let [i, word] of this.words.entries()) {
      this.nToIdx[word.isDown ? 0 : 1][word.n] = i;
    }
  }

  public canMoveUp(focusedWordDown: number, row: number, col: number, board: string[][]): boolean {
    return focusedWordDown !== 0 && row > 0 && board[row - 1][col] !== ' ' && this.words[this.nToIdx[0][focusedWordDown]].isDown;
  }

  public canMoveLeft(focusedWordAcross: number, row: number, col: number, board: string[][]): boolean {
    return focusedWordAcross !== 0 && col > 0 && board[row][col - 1] !== ' ' && !this.words[this.nToIdx[1][focusedWordAcross]].isDown;
  }

  public canMoveDown(focusedWordDown: number, row: number, col: number, board: string[][]): boolean {
    return focusedWordDown !== 0 && row < this.rows - 1 && board[row + 1][col] !== ' ' && this.words[this.nToIdx[0][focusedWordDown]].isDown;
  }

  public canMoveRight(focusedWordAcross: number, row: number, col: number, board: string[][]): boolean {
    return focusedWordAcross !== 0 && col < this.cols - 1 && board[row][col + 1] !== ' ' && !this.words[this.nToIdx[1][focusedWordAcross]].isDown;
  }

  public descOnFocus(isDown: boolean, focusedWord: number[], descIdx: number): boolean {
    return this.descToN[isDown ? 0 : 1][descIdx] === focusedWord[isDown ? 0 : 1];
  }

  public indexOnFocus(focusedCellDown: number, focusedCellAcross: number, row: number, col: number): boolean {
    return this.wordsStartN[row][col] === 0 || (focusedCellDown === row && focusedCellAcross === col);
  }

  public cellInWord(focusedWordDown: number, focusedWordAcross: number, row: number, col: number): boolean {
    return (focusedWordDown !== 0 && this.wordsN[row][col][0] === focusedWordDown) || (focusedWordAcross !== 0 && this.wordsN[row][col][1] === focusedWordAcross);
  }
}
