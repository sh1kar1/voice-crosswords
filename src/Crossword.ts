interface Word {
    text: string;
    desc: string;
    col: number;
    row: number;
    is_down: boolean;
}

export default class Crossword {
    words: Word[];
    rows: number;
    cols: number;
    board: string[][];
    empty_board: string[][];
    down_desc: string[];
    across_desc: string[];
    words_idx: number[][][];
    words_start_idx: number[][];
    desc_to_idx: number[][];

    constructor(words: Word[]) {
        this.words = words;
        this.rows = 0;
        this.cols = 0;
        this.board = [];
        this.empty_board = [];
        this.down_desc = [];
        this.across_desc = [];
        this.words_idx = [];
        this.words_start_idx = [];
        this.desc_to_idx = [];
        this.calc_size();
        this.create_board();
        this.create_description();
        this.create_words_idx();
    }

    private calc_size(): void {
        for (let word of this.words) {
            if (word.is_down) {
                this.rows = Math.max(this.rows, word.row + word.text.length);
                this.cols = Math.max(this.cols, word.col + 1);
            } else {
                this.rows = Math.max(this.rows, word.row + 1);
                this.cols = Math.max(this.cols, word.col + word.text.length);
            }
        }
    }

    private create_board(): void {
        for (let row = 0; row < this.rows; row++) {
            this.board[row] = Array(this.cols).fill(' ');
            this.empty_board[row] = Array(this.cols).fill(' ');
        }
        for (let word of this.words) {
            for (let i = 0; i < word.text.length; i++) {
                if (word.is_down) {
                    this.board[word.row + i][word.col] = word.text[i];
                } else {
                    this.board[word.row][word.col + i] = word.text[i];
                }
            }
        }
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.board[row][col] !== ' ') {
                    this.empty_board[row][col] = '';
                }
            }
        }
    }

    private create_description(): void {
        this.desc_to_idx[0] = Array(this.words.length).fill(0);
        this.desc_to_idx[1] = Array(this.words.length).fill(0);
        for (let i = 0; i < this.words.length; i++) {
            if (this.words[i].is_down) {
                this.down_desc.push(`${i + 1}.${i + 1 < 10 ? '   ' : ' '}${this.words[i].desc}`);
                this.desc_to_idx[0][this.down_desc.length - 1] = i + 1;
            } else {
                this.across_desc.push(`${i + 1}.${i + 1 < 10 ? '   ' : ' '}${this.words[i].desc}`);
                this.desc_to_idx[1][this.across_desc.length - 1] = i + 1;
            }
        }
    }

    private create_words_idx(): void {
        for (let row = 0; row < this.rows; row++) {
            this.words_start_idx[row] = Array(this.cols).fill(0);
            this.words_idx[row] = Array(this.cols);
            for (let col = 0; col < this.cols; col++) {
                this.words_idx[row][col] = [0, 0];
            }
        }
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                for (let i = 0; i < this.words.length; i++) {
                    if (this.words[i].row === row && this.words[i].col === col) {
                        this.words_start_idx[row][col] = i + 1;
                        for (let j = 0; j < this.words[i].text.length; j++) {
                            if (this.words[i].is_down) {
                                this.words_idx[row + j][col][0] = i + 1;
                            } else {
                                this.words_idx[row][col + j][1] = i + 1;
                            }
                        }
                    }
                }
            }
        }
    }
}
