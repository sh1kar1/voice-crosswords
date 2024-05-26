interface Word {
    text: string;
    desc: string;
    x: number;
    y: number;
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

    constructor(words: Word[]) {
        this.words = words;
        this.rows = 0;
        this.cols = 0;
        this.board = [];
        this.empty_board = [];
        this.down_desc = [];
        this.across_desc = [];
        this.calc_size();
        this.create_board();
        this.create_description();
    }

    private calc_size(): void {
        for (let word of this.words) {
            if (word.is_down) {
                this.rows = Math.max(this.rows, word.y + word.text.length);
                this.cols = Math.max(this.cols, word.x + 1);
            } else {
                this.rows = Math.max(this.rows, word.y + 1);
                this.cols = Math.max(this.cols, word.x + word.text.length);
            }
        }
    }

    private create_board(): void {
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = Array(this.cols).fill(' ');
            this.empty_board[i] = Array(this.cols).fill(' ');
        }
        for (let word of this.words) {
            for (let i = 0; i < word.text.length; i++) {
                if (word.is_down) {
                    this.board[word.y + i][word.x] = word.text[i];
                } else {
                    this.board[word.y][word.x + i] = word.text[i];
                }
            }
        }
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.empty_board[i][j] = this.board[i][j] !== ' ' ? '' : ' ';
            }
        }
    }

    private create_description(): void {
        for (let i = 0; i < this.words.length; i++) {
            if (this.words[i].is_down) {
                this.down_desc.push(`${i + 1}. ${this.words[i].desc}`);
            } else {
                this.across_desc.push(`${i + 1}. ${this.words[i].desc}`);
            }
        }
    }
}
