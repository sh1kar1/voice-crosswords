interface Word {
    n: number;
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
    words_n: number[][][];
    words_start_n: number[][];
    desc_to_n: number[][];
    n_to_idx: number[][];

    constructor(words: Word[]) {
        this.words = words;

        this.rows = 0;
        this.cols = 0;
        this.calc_size();

        this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill(' '));
        this.empty_board = Array.from({ length: this.rows }, () => Array(this.cols).fill(' '));
        this.create_board();

        this.down_desc = [];
        this.across_desc = [];
        this.desc_to_n = Array.from({ length: 2 }, () => Array(this.words.length).fill(0));
        this.create_description();

        this.words_n = Array.from({ length: this.rows }, () => Array.from({ length: this.cols }, () => Array(2).fill(0)));
        this.words_start_n = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
        this.create_words_n();

        this.n_to_idx = Array.from({ length: 2 }, () => Array(this.words[this.words.length - 1].n + 1).fill(0));
        this.create_n_to_idx();
    }

    private calc_size(): void {
        for (let word of this.words) {
            this.rows = word.is_down ? Math.max(this.rows, word.row + word.text.length) : Math.max(this.rows, word.row + 1);
            this.cols = word.is_down ? Math.max(this.cols, word.col + 1) : Math.max(this.cols, word.col + word.text.length);
        }
    }

    private create_board(): void {
        for (let word of this.words) {
            for (let i = 0; i < word.text.length; i++) {
                this.board[word.row + (word.is_down ? i : 0)][word.col + (!word.is_down ? i : 0)] = word.text[i];
                this.empty_board[word.row + (word.is_down ? i : 0)][word.col + (!word.is_down ? i : 0)] = '';
            }
        }
    }

    private create_description(): void {
        for (let word of this.words) {
            (word.is_down ? this.down_desc : this.across_desc).push(`${word.n}.${word.n < 10 ? '   ' : ' '}${word.desc}`);
            this.desc_to_n[word.is_down ? 0 : 1][(word.is_down ? this.down_desc : this.across_desc).length - 1] = word.n;
        }
    }

    private create_words_n(): void {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                for (let word of this.words) {
                    if (word.row === row && word.col === col) {
                        this.words_start_n[row][col] = word.n;
                        for (let j = 0; j < word.text.length; j++) {
                            this.words_n[row + (word.is_down ? j : 0)][col + (!word.is_down ? j : 0)][word.is_down ? 0 : 1] = word.n;
                        }
                    }
                }
            }
        }
    }

    private create_n_to_idx(): void {
        for (let [i, word] of this.words.entries()) {
            this.n_to_idx[word.is_down ? 0 : 1][word.n] = i;
        }
    }
}
