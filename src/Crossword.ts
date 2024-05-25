interface Word {
    text: string;
    desc: string;
    x: number;
    y: number;
    is_down: boolean;
}

export default class Crossword {
    words: Word[];
    h: number;
    w: number;
    board: string[][];
    down_desc: string[];
    across_desc: string[];

    constructor(words: Word[]) {
        this.words = words;
        this.h = 0;
        this.w = 0;
        this.board = [];
        this.down_desc = [];
        this.across_desc = [];
        this.calc_size();
        this.create_board();
        this.create_description();
    }

    private calc_size(): void {
        for (let word of this.words) {
            if (word.is_down) {
                this.h = Math.max(this.h, word.y + word.text.length);
                this.w = Math.max(this.w, word.x + 1);
            } else {
                this.h = Math.max(this.h, word.y + 1);
                this.w = Math.max(this.w, word.x + word.text.length);
            }
        }
    }

    private create_board(): void {
        for (let i = 0; i < this.h; i++) {
            this.board[i] = Array(this.w).fill(' ');
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

// import * as fs from 'fs';
//
// const crossword = new Crossword(JSON.parse(fs.readFileSync('./src/levels/1.json', 'utf-8')));
//
// console.log(`Size: ${crossword.h} x ${crossword.w}`);
//
// for (let i = 0; i < crossword.h; i++) {
//     console.log(crossword.board[i].join(' '));
// }
//
// console.log(`Down:\n${crossword.down_desc.join('\n')}`);
// console.log(`Across:\n${crossword.across_desc.join('\n')}`);
