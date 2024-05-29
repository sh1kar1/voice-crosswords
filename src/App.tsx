import React, { useState, useRef, useEffect } from 'react';
import { Container, DescContainer, BoardContainer, Desc, Board, Cell, Index, Input } from './Components';
import Crossword from './Crossword';
import * as levels from './levels';
const level = [levels.l0, levels.l1];

const App: React.FC = () => {
    const [crossword, set_crossword] = useState<Crossword>(new Crossword(level[1]));
    const [board, set_board] = useState<string[][]>(crossword.board.map(row => [...row]));
    const [mistakes, set_mistakes] = useState<boolean[][]>(Array.from({ length: crossword.rows }, () => Array(crossword.cols).fill(false)));
    const [focused_word, set_focused_word] = useState<number[]>([0, 0]);
    const [prev_move_across, set_prev_move_across] = useState<boolean>(false);
    const [solved, set_solved] = useState<boolean>(false);

    const input_refs = useRef<(HTMLInputElement | null)[][]>([]);
    input_refs.current = Array.from({ length: crossword.rows }, () => Array(crossword.cols).fill(null));

    useEffect(() => {
        const handle_key_down = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                (document.activeElement as HTMLElement)?.blur();
                const new_mistakes = Array.from({ length: crossword.rows }, () => Array(crossword.cols).fill(false));
                let solve = true;
                for (let row = 0; row < crossword.rows; row++) {
                    for (let col = 0; col < crossword.cols; col++) {
                        if (board[row][col] !== crossword.board[row][col]) {
                            new_mistakes[row][col] = true;
                            solve = false;
                        }
                    }
                }
                set_mistakes(new_mistakes);
                set_solved(solve);

            } else if ((/^[0-9]+$/).test(e.key)) {
                // TODO -------------------------------------
            }
        };

        window.addEventListener('keydown', handle_key_down);
        return () => window.removeEventListener('keydown', handle_key_down);
    }, [board]);

    const handle_input_key_down = (row: number, col: number, key: string) => {
        const change_board = (val: string) => {
            const new_board = board.map(row => [...row]);
            new_board[row][col] = val;
            set_board(new_board);
        };

        const change_mistakes = (val: boolean) => {
            const new_mistakes = mistakes.map(row => [...row]);
            new_mistakes[row][col] = val;
            set_mistakes(new_mistakes);
        };

        const move_up_left = () => {
            const move_up = focused_word[0] !== 0 && row > 0 && board[row - 1][col] !== ' ' && crossword.words[crossword.n_to_idx[0][focused_word[0]]].is_down;
            const move_left = focused_word[1] !== 0 && col > 0 && board[row][col - 1] !== ' ' && !crossword.words[crossword.n_to_idx[1][focused_word[1]]].is_down;
            if (move_up && move_left) {
                !prev_move_across ? input_refs.current[row - 1][col]?.focus() : input_refs.current[row][col - 1]?.focus();
            } else if (move_up) {
                input_refs.current[row - 1][col]?.focus();
                set_prev_move_across(false);
            } else if (move_left) {
                input_refs.current[row][col - 1]?.focus();
                set_prev_move_across(true);
            }
        };

        const move_down_right = () => {
            const move_down = focused_word[0] !== 0 && row < crossword.rows - 1 && board[row + 1][col] !== ' ' && crossword.words[crossword.n_to_idx[0][focused_word[0]]].is_down;
            const move_right = focused_word[1] !== 0 && col < crossword.cols - 1 && board[row][col + 1] !== ' ' && !crossword.words[crossword.n_to_idx[1][focused_word[1]]].is_down;
            if (move_down && move_right) {
                !prev_move_across ? input_refs.current[row + 1][col]?.focus() : input_refs.current[row][col + 1]?.focus();
            } else if (move_down) {
                input_refs.current[row + 1][col]?.focus();
                set_prev_move_across(false);
            } else if (move_right) {
                input_refs.current[row][col + 1]?.focus();
                set_prev_move_across(true);
            }
        };

        if (key === 'ArrowRight' && col < crossword.cols - 1 && board[row][col + 1] !== ' ') {
            input_refs.current[row][col + 1]?.focus();
            set_prev_move_across(true);
        } else if (key === 'ArrowLeft' && col > 0 && board[row][col - 1] !== ' ') {
            input_refs.current[row][col - 1]?.focus();
            set_prev_move_across(true);
        } else if (key === 'ArrowDown' && row < crossword.rows - 1 && board[row + 1][col] !== ' ') {
            input_refs.current[row + 1][col]?.focus();
            set_prev_move_across(false);
        } else if (key === 'ArrowUp' && row > 0 && board[row - 1][col] !== ' ') {
            input_refs.current[row - 1][col]?.focus();
            set_prev_move_across(false);
        } else if (key === 'Backspace') {
            change_board('');
            change_mistakes(false);
            move_up_left();
        } else if (key === ' ') {
            change_board('');
            change_mistakes(false);
            move_down_right();
            console.log(prev_move_across);
            console.log(focused_word);
        } else if ((/^[a-zа-я]*$/).test(key)) {
            change_board(key);
            change_mistakes(false);
            move_down_right();
        }
    };

    return (
        <Container>
            <DescContainer>
                <div>
                    <Desc is_focused={false}><strong>По вертикали:</strong></Desc>
                    {crossword.down_desc.map((desc, idx) => (
                        <Desc key={idx} is_focused={crossword.desc_to_n[0][idx] === focused_word[0]}>{desc}</Desc>
                    ))}
                </div>
            </DescContainer>
            <BoardContainer>
                <Board>
                    <tbody>
                    {board.map((row, row_idx) => (
                        <tr key={row_idx}>
                            {row.map((cell, col_idx) => (
                                <Cell key={col_idx} content={cell}>
                                    {crossword.words_start_n[row_idx][col_idx] !== 0 &&
                                        <Index hidden={crossword.words_n[row_idx][col_idx][0] === focused_word[0] && focused_word[0] !== 0 || crossword.words_n[row_idx][col_idx][1] === focused_word[1] && focused_word[1] !== 0}>{crossword.words_start_n[row_idx][col_idx]}</Index>}
                                    <Input
                                        hidden={cell === ' '}
                                        disabled={solved}
                                        type='text'
                                        value={cell}
                                        maxLength={1}
                                        ref={(el) => input_refs.current[row_idx][col_idx] = el}
                                        is_word={crossword.words_n[row_idx][col_idx][0] === focused_word[0] && focused_word[0] !== 0 || crossword.words_n[row_idx][col_idx][1] === focused_word[1] && focused_word[1] !== 0}
                                        is_mistake={mistakes[row_idx][col_idx]}
                                        is_solved={solved}
                                        onFocus={() => set_focused_word(crossword.words_n[row_idx][col_idx])}
                                        onBlur={() => set_focused_word([0, 0])}
                                        onKeyDown={(e) => { e.preventDefault(); handle_input_key_down(row_idx, col_idx, e.key); }}
                                    />
                                </Cell>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </Board>
            </BoardContainer>
            <DescContainer>
                <div>
                    <Desc is_focused={false}><strong>По горизонтали:</strong></Desc>
                    {crossword.across_desc.map((desc, idx) => (
                        <Desc key={idx} is_focused={crossword.desc_to_n[1][idx] === focused_word[1]}>{desc}</Desc>
                    ))}
                </div>
            </DescContainer>
        </Container>
    );
};

export default App;
