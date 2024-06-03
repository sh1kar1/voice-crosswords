// App.tsx
// the main file in the project
// all rendering logic is here

import React, { useState, useEffect, useRef } from 'react';
import { ButtonContainer, LevelContainer, DescContainer, BoardContainer, Title, Subtitle, ButtonIndex, ButtonDesc, Button, DescHeader, Desc, Board, Cell, Index, Input } from './Components';
import Crossword from './Crossword';
import * as l from './Levels';

const levels = [l.l1, l.l2, l.l3, l.l4, l.l5, l.l6, l.l7, l.l8, l.l9, l.l10];  // TODO: CHANGE THIS ARRAY AFTER ADDING A NEW LEVEL

// page with board and description
const Level: React.FC<{ level: number, setLevel: any }> = ({ level, setLevel }) => {
  const [crossword] = useState<Crossword>(new Crossword(levels[level]));                                                                   // crossword instance matching current level
  const [board, setBoard] = useState<string[][]>(crossword.emptyBoard.map(row => [...row]));                                               // actual board (after user inputs)
  const [mistakes, setMistakes] = useState<boolean[][]>(Array.from({ length: crossword.rows }, () => Array(crossword.cols).fill(false)));  // cells with wrong letters
  const [focusedWord, setFocusedWord] = useState<number[]>([0, 0]);                                                                        // number of the focused word (vertical and horizontal)
  const [focusedCell, setFocusedCell] = useState<number[]>([-1, -1]);                                                                      // row and column of the focused cell
  const [prevMoveVertical, setPrevMoveVertical] = useState<boolean>(true);                                                                 // true if the previous move by arrows was vertical
  const [solved, setSolved] = useState<boolean>(false);                                                                                    // true if the crossword was solved

  const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);                                                                             // refs for moving focus
  inputRefs.current = Array.from({ length: crossword.rows }, () => Array(crossword.cols).fill(null));

  useEffect(() => {
    // callback for hotkeys
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        // looking for mistakes or solve
        (document.activeElement as HTMLElement)?.blur();
        const newMistakes = Array.from({ length: crossword.rows }, () => Array(crossword.cols).fill(false));
        let solve = true;
        for (let row = 0; row < crossword.rows; row++) {
          for (let col = 0; col < crossword.cols; col++) {
            if (board[row][col] !== crossword.board[row][col]) {
              newMistakes[row][col] = true;
              solve = false;
            }
          }
        }
        setMistakes(newMistakes);
        setSolved(solve);

      } else if (e.key === 'Escape') {
        // back to levels menu
        setLevel(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [board]);

  // callback for user's input in cells
  const handleInputKeyDown = (row: number, col: number, key: string) => {
    const changeBoard = (val: string) => {
      const newBoard = board.map(row => [...row]);
      newBoard[row][col] = val;
      setBoard(newBoard);
    };

    const changeMistakes = (val: boolean) => {
      const newMistakes = mistakes.map(row => [...row]);
      newMistakes[row][col] = val;
      setMistakes(newMistakes);
    };

    const moveUpLeft = () => {
      const moveUp = crossword.canMoveUp(focusedWord[0], row, col, board);
      const moveLeft = crossword.canMoveLeft(focusedWord[1], row, col, board);
      if (moveUp && moveLeft) {
        prevMoveVertical ? inputRefs.current[row - 1][col]?.focus() : inputRefs.current[row][col - 1]?.focus();
      } else if (moveUp) {
        inputRefs.current[row - 1][col]?.focus();
        setPrevMoveVertical(true);
      } else if (moveLeft) {
        inputRefs.current[row][col - 1]?.focus();
        setPrevMoveVertical(false);
      }
    };

    const moveDownRight = () => {
      const moveDown = crossword.canMoveDown(focusedWord[0], row, col, board);
      const moveRight = crossword.canMoveRight(focusedWord[1], row, col, board);
      if (moveDown && moveRight) {
        prevMoveVertical ? inputRefs.current[row + 1][col]?.focus() : inputRefs.current[row][col + 1]?.focus();
      } else if (moveDown) {
        inputRefs.current[row + 1][col]?.focus();
        setPrevMoveVertical(true);
      } else if (moveRight) {
        inputRefs.current[row][col + 1]?.focus();
        setPrevMoveVertical(false);
      }
    };

    if (key === 'ArrowRight' && col < crossword.cols - 1 && board[row][col + 1] !== ' ') {
      inputRefs.current[row][col + 1]?.focus();
      setPrevMoveVertical(false);
    } else if (key === 'ArrowLeft' && col > 0 && board[row][col - 1] !== ' ') {
      inputRefs.current[row][col - 1]?.focus();
      setPrevMoveVertical(false);
    } else if (key === 'ArrowDown' && row < crossword.rows - 1 && board[row + 1][col] !== ' ') {
      inputRefs.current[row + 1][col]?.focus();
      setPrevMoveVertical(true);
    } else if (key === 'ArrowUp' && row > 0 && board[row - 1][col] !== ' ') {
      inputRefs.current[row - 1][col]?.focus();
      setPrevMoveVertical(true);
    } else if (key === 'Backspace') {
      changeBoard('');
      changeMistakes(false);
      moveUpLeft();
    } else if (key === ' ') {
      changeBoard('');
      changeMistakes(false);
      moveDownRight();
    } else if ((/^[a-zа-я]*$/).test(key)) {
      changeBoard(key);
      changeMistakes(false);
      moveDownRight();
    }
  };

  return (
    <LevelContainer>
      <DescContainer>
        <div>
          <DescHeader>По вертикали:</DescHeader>
          {crossword.downDesc.map((desc, descIdx) => (
            <Desc key={descIdx} isFocused={crossword.descOnFocus(true, focusedWord, descIdx)}>{desc}</Desc>
          ))}
        </div>
      </DescContainer>
      <BoardContainer>
        <Board>
          <tbody>
          {board.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, colIdx) => (
                <Cell key={colIdx} content={cell}>
                  <Index hidden={crossword.indexOnFocus(focusedCell[0], focusedCell[1], rowIdx, colIdx)}>{crossword.cellToWordsStartN[rowIdx][colIdx]}</Index>
                  <Input
                    hidden={cell === ' '}
                    disabled={solved}
                    type='text'
                    value={cell}
                    maxLength={1}
                    ref={(el) => inputRefs.current[rowIdx][colIdx] = el}
                    inWord={crossword.cellInWord(focusedWord[0], focusedWord[1], rowIdx, colIdx)}
                    isMistake={mistakes[rowIdx][colIdx]}
                    isSolved={solved}
                    onFocus={() => { setFocusedWord(crossword.cellToWordsN[rowIdx][colIdx]); setFocusedCell([rowIdx, colIdx]); }}
                    onBlur={() => { setFocusedWord([0, 0]); setFocusedCell([-1, -1]); }}
                    onKeyDown={(e) => { e.preventDefault(); handleInputKeyDown(rowIdx, colIdx, e.key); }}
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
          {crossword.acrossDesc.map((desc, descIdx) => (
            <Desc key={descIdx} isFocused={crossword.descOnFocus(false, focusedWord, descIdx)}>{desc}</Desc>
          ))}
        </div>
      </DescContainer>
    </LevelContainer>
  );
};

// page with levels menu
const App: React.FC = () => {
  const [level, setLevel] = useState<number>(0);  // current level (0 if user in menu)

  return (
    <>
      {level === 0 ? (
        <div>
          <Title>Кроссворды</Title>
          <Subtitle>Выберите уровень:</Subtitle>
          <ButtonContainer>
            {levels.map((lvl, lvlIdx) => (
              <Button onClick={() => setLevel(lvlIdx + 1)}>
                <ButtonIndex>{lvlIdx + 1}</ButtonIndex>
                <ButtonDesc>«{new Crossword(lvl).words[0].desc}»</ButtonDesc>
              </Button>
            ))}
          </ButtonContainer>
        </div>
      ) : (
        <Level key={level} level={level - 1} setLevel={setLevel}/>
      )}
    </>
  );
};

export default App;
