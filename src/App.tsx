import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Crossword from './Crossword';
import * as levels from './levels';

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100vh;
`;

const DescContainer = styled.div`
    margin: 0 5vw;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.5;
    white-space: pre-wrap;
`;

const BoardContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Desc = styled.div<{ is_focused: boolean }>`
    padding: 0 5px;
    border: ${({ is_focused }) => (is_focused ? '1px dotted black' : 'none')};
`;

const Board = styled.table`
    border-collapse: collapse;
`;

const Cell = styled.td`
    position: relative;
    padding: 0;
    border: ${({ content }) => (content !== ' ' ? '1px solid black' : 'none')};
`;

const Index = styled.div`
    position: absolute;
    top: 0;
    left: 1px;
    font-size: 10px;

    &::selection {
        background: transparent;
    }
`;

const Input = styled.input`
    border: hidden;
    width: 30px;
    height: 30px;
    text-align: center;
    font-size: 20px;
    caret-color: transparent;
    background-color: transparent;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px black;
    }

    &::selection {
        background: transparent;
    }
`;

const App: React.FC = () => {
    const crossword: Crossword = new Crossword(levels.l1);

    const [board, set_board] = useState<string[][]>(crossword.empty_board);
    const [focused, set_focused] = useState<number[]>([0, 0]);
    const [prev_move, set_prev_move] = useState(0);

    const input_refs = useRef<(HTMLInputElement | null)[][]>([]);
    for (let row = 0; row < crossword.rows; row++) {
        input_refs.current[row] = Array(crossword.cols).fill(0);
    }

    const handle_board_change = (row: number, col: number, val: string) => {
        const new_board = board.map((r, r_idx) => r_idx === row ? r.map((c, c_idx) => (c_idx === col ? val : c)) : r);
        if ((/^[a-zа-я]*$/).test(val)) {
            set_board(new_board);
        }
    };

    const handle_key_down = (e: React.KeyboardEvent<HTMLInputElement>, row: number, col: number) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Backspace') {
            e.preventDefault();
        }
        if (e.key === 'ArrowRight' && col < crossword.cols - 1) {
            input_refs.current[row][col + 1]?.focus();
        } else if (e.key === 'ArrowLeft' && col > 0) {
            input_refs.current[row][col - 1]?.focus();
        } else if (e.key === 'ArrowDown' && row < crossword.rows - 1) {
            input_refs.current[row + 1][col]?.focus();
        } else if (e.key === 'ArrowUp' && row > 0) {
            input_refs.current[row - 1][col]?.focus();
        } else if (e.key === 'Backspace') {
            handle_board_change(row, col, '');
            if (focused[0] !== 0 && row > 0 && crossword.board[row - 1][col] !== ' ' && crossword.words[focused[0] - 1].is_down
                && focused[1] !== 0 && col > 0 && crossword.board[row][col - 1] !== ' ' && !crossword.words[focused[1] - 1].is_down) {
                if (prev_move === 0) {
                    input_refs.current[row - 1][col]?.focus();
                } else {
                    input_refs.current[row][col - 1]?.focus();
                }
            } else {
                if (focused[0] !== 0 && row > 0 && crossword.board[row - 1][col] !== ' ' && crossword.words[focused[0] - 1].is_down) {
                    input_refs.current[row - 1][col]?.focus();
                    set_prev_move(0);
                }
                if (focused[1] !== 0 && col > 0 && crossword.board[row][col - 1] !== ' ' && !crossword.words[focused[1] - 1].is_down) {
                    input_refs.current[row][col - 1]?.focus();
                    set_prev_move(1);
                }
            }
        } else if ((/^[a-zа-я]*$/).test(e.key)) {
            handle_board_change(row, col, e.key);
            if (focused[0] !== 0 && row < crossword.rows - 1 && crossword.board[row + 1][col] !== ' ' && crossword.words[focused[0] - 1].is_down
                && focused[1] !== 0 && col < crossword.cols - 1 && crossword.board[row][col + 1] !== ' ' && !crossword.words[focused[1] - 1].is_down) {
                if (prev_move === 0) {
                    input_refs.current[row + 1][col]?.focus();
                } else {
                    input_refs.current[row][col + 1]?.focus();
                }
            } else {
                if (focused[0] !== 0 && row < crossword.rows - 1 && crossword.board[row + 1][col] !== ' ' && crossword.words[focused[0] - 1].is_down) {
                    input_refs.current[row + 1][col]?.focus();
                    set_prev_move(0);
                }
                if (focused[1] !== 0 && col < crossword.cols - 1 && crossword.board[row][col + 1] !== ' ' && !crossword.words[focused[1] - 1].is_down) {
                    input_refs.current[row][col + 1]?.focus();
                    set_prev_move(1);
                }
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
                                        onKeyDown={(e) => handle_key_down(e, row_idx, col_idx)}
                                        onFocus={() => set_focused(crossword.words_idx[row_idx][col_idx])}
                                        onBlur={() => set_focused([0, 0])}
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
