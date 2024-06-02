import React, { useState, useEffect, useRef } from 'react';
import { ButtonContainer, LevelContainer, DescContainer, BoardContainer, Title, Subtitle, ButtonIndex, ButtonDesc, Button, DescHeader, Desc, Board, Cell, Index, Input } from './Components';
import Crossword from './Crossword';
import * as l from './Levels';
const levels = [l.l1, l.l2, l.l3, l.l4, l.l5, l.l6, l.l7, l.l8, l.l9, l.l10];

const Level: React.FC<{ level: number, set_level: any }> = ({ level, set_level }) => {
    const [crossword] = useState<Crossword>(new Crossword(levels[level]));
    const [board, set_board] = useState<string[][]>(crossword.board.map(row => [...row]));
    const [mistakes, set_mistakes] = useState<boolean[][]>(Array.from({ length: crossword.rows }, () => Array(crossword.cols).fill(false)));
    const [focused_word, set_focused_word] = useState<number[]>([0, 0]);
    const [focused_cell, set_focused_cell] = useState<number[]>([-1, -1]);
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
            } else if (e.key === 'Escape') {
                set_level(0);
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
            const move_up = crossword.can_move_up(focused_word[0], row, col, board);
            const move_left = crossword.can_move_left(focused_word[1], row, col, board);
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
            const move_down = crossword.can_move_down(focused_word[0], row, col, board);
            const move_right = crossword.can_move_right(focused_word[1], row, col, board);
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
        <LevelContainer>
            <DescContainer>
                <div>
                    <DescHeader>По вертикали:</DescHeader>
                    {crossword.down_desc.map((desc, desc_idx) => (
                        <Desc key={desc_idx} is_focused={crossword.desc_on_focus(true, focused_word, desc_idx)}>{desc}</Desc>
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
                                    <Index hidden={crossword.index_on_focus(focused_cell[0], focused_cell[1], row_idx, col_idx)}>{crossword.words_start_n[row_idx][col_idx]}</Index>
                                    <Input
                                        hidden={cell === ' '}
                                        disabled={solved}
                                        type='text'
                                        value={cell}
                                        maxLength={1}
                                        ref={(el) => input_refs.current[row_idx][col_idx] = el}
                                        is_word={crossword.cell_in_word(focused_word[0], focused_word[1], row_idx, col_idx)}
                                        is_mistake={mistakes[row_idx][col_idx]}
                                        is_solved={solved}
                                        onFocus={() => { set_focused_word(crossword.words_n[row_idx][col_idx]); set_focused_cell([row_idx, col_idx]); }}
                                        onBlur={() => { set_focused_word([0, 0]); set_focused_cell([-1, -1]); }}
                                        onKeyDown={(e) => { e.preventDefault(); handle_input_key_down(row_idx, col_idx, e.key); }}
                                        readOnly
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
                    <DescHeader>По горизонтали:</DescHeader>
                    {crossword.across_desc.map((desc, desc_idx) => (
                        <Desc key={desc_idx} is_focused={crossword.desc_on_focus(false, focused_word, desc_idx)}>{desc}</Desc>
                    ))}
                </div>
            </DescContainer>
        </LevelContainer>
    );
};

const App: React.FC = () => {
    const [level, set_level] = useState<number>(0);

    return (
        <>
            {level === 0 ? (
                <div>
                    <Title>Кроссворды</Title>
                    <Subtitle>Выберите уровень:</Subtitle>
                    <ButtonContainer>
                        {levels.map((lvl, idx) => (
                            <Button onClick={() => set_level(idx + 1)}>
                                <ButtonIndex>{idx + 1}</ButtonIndex>
                                <ButtonDesc>«{new Crossword(lvl).words[0].desc}»</ButtonDesc>
                            </Button>
                        ))}
                    </ButtonContainer>
                </div>
            ) : (
                <Level key={level} level={level - 1} set_level={set_level} />
            )}
        </>
    );
};

export default App;
