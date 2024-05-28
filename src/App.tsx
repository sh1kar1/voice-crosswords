import React, { useState, useRef } from 'react';
import { Container, DescContainer, BoardContainer, Desc, Board, Cell, Index, Input } from './Components'
import Crossword from './Crossword';
import * as levels from './levels';

const App: React.FC = () => {
    const crossword: Crossword = new Crossword(levels.l1);

    const [board, set_board] = useState<string[][]>(crossword.empty_board);
    const [focused, set_focused] = useState<number[]>([0, 0]);
    const [prev_move, set_prev_move] = useState(0);

    const input_refs = useRef<(HTMLInputElement | null)[][]>([]);
    input_refs.current = Array.from({ length: crossword.rows }, () => Array(crossword.cols).fill(0));

    const handle_key_down = (key: string, row: number, col: number) => {
        if (key === 'ArrowRight' && col < crossword.cols - 1) {
            input_refs.current[row][col + 1]?.focus();
        } else if (key === 'ArrowLeft' && col > 0) {
            input_refs.current[row][col - 1]?.focus();
        } else if (key === 'ArrowDown' && row < crossword.rows - 1) {
            input_refs.current[row + 1][col]?.focus();
        } else if (key === 'ArrowUp' && row > 0) {
            input_refs.current[row - 1][col]?.focus();

        } else if (key === 'Backspace') {
            set_board(board.map((r, r_idx) => r_idx === row ? r.map((c, c_idx) => (c_idx === col ? '' : c)) : r));
            const move_up = focused[0] !== 0 && row > 0 && crossword.board[row - 1][col] !== ' ' && crossword.words[focused[0] - 1].is_down;
            const move_left = focused[1] !== 0 && col > 0 && crossword.board[row][col - 1] !== ' ' && !crossword.words[focused[1] - 1].is_down;
            if (move_up && move_left) {
                prev_move === 0 ? input_refs.current[row - 1][col]?.focus() : input_refs.current[row][col - 1]?.focus();
            } else if (move_up) {
                input_refs.current[row - 1][col]?.focus();
                set_prev_move(0);
            } else if (move_left) {
                input_refs.current[row][col - 1]?.focus();
                set_prev_move(1);
            }

        } else if ((/^[a-zа-я]*$/).test(key)) {
            set_board(board.map((r, r_idx) => r_idx === row ? r.map((c, c_idx) => (c_idx === col ? key : c)) : r));
            const move_down = focused[0] !== 0 && row < crossword.rows - 1 && crossword.board[row + 1][col] !== ' ' && crossword.words[focused[0] - 1].is_down;
            const move_right = focused[1] !== 0 && col < crossword.cols - 1 && crossword.board[row][col + 1] !== ' ' && !crossword.words[focused[1] - 1].is_down;
            if (move_down && move_right) {
                prev_move === 0 ? input_refs.current[row + 1][col]?.focus() : input_refs.current[row][col + 1]?.focus();
            } else if (move_down) {
                input_refs.current[row + 1][col]?.focus();
                set_prev_move(0);
            } else if (move_right) {
                input_refs.current[row][col + 1]?.focus();
                set_prev_move(1);
            }
        }
    };

    return (
        <Container>
            <DescContainer>
                <div>
                    <Desc is_focused={false}><strong>По вертикали:</strong></Desc>
                    {crossword.down_desc.map((desc, idx) => (
                        <Desc key={idx} is_focused={crossword.desc_to_idx[0][idx] === focused[0]}>{desc}</Desc>
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
                                    {crossword.words_start_idx[row_idx][col_idx] !== 0 &&
                                        <Index>{crossword.words_start_idx[row_idx][col_idx]}</Index>}
                                    <Input
                                        hidden={cell === ' '}
                                        type='text'
                                        value={cell}
                                        maxLength={1}
                                        ref={(el) => input_refs.current[row_idx][col_idx] = el}
                                        onFocus={() => set_focused(crossword.words_idx[row_idx][col_idx])}
                                        onBlur={() => set_focused([0, 0])}
                                        onKeyDown={(e) => { e.preventDefault(); handle_key_down(e.key, row_idx, col_idx); }}
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
                        <Desc key={idx} is_focused={crossword.desc_to_idx[1][idx] === focused[1]}>{desc}</Desc>
                    ))}
                </div>
            </DescContainer>
        </Container>
    );
};

export default App;
