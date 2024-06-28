// App.tsx
// the main file in the project
// all rendering logic is here

import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { createAssistant, createSmartappDebugger, AssistantAppState } from '@salutejs/client';
import { LvlButtonContainer, LevelContainer, DescContainer, BoardContainer, Title, Subtitle, LvlButtonIndex, LvlButtonDesc, LvlButton, DescHeader, Desc, Board, Cell, Index, Input } from './Components';
import Crossword from './Crossword';
import * as l from './Levels';

const levels = [l.l1, l.l2, l.l3, l.l4, l.l5, l.l6, l.l7, l.l8, l.l9, l.l10];  // TODO: CHANGE THIS ARRAY AFTER ADDING A NEW LEVEL

const initializeAssistant = (getState: any) => {
  if (process.env.NODE_ENV === 'development') {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? '',
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      nativePanel: {screenshotMode: true},
      getState,
    });
  }
  return createAssistant({getState});
};

interface LevelRef {
  setWord: (text: string, n: number, isDown: boolean) => boolean;
  deleteWord: (n: number, isDown: boolean) => boolean;
  checkSolve: () => boolean;
}

interface LevelProps {
  level: number;
  setLevel: (level: number) => void;
}

interface MenuProps {
  level: number;
  setLevel: (level: number) => void;
  levelRef: React.RefObject<LevelRef>;
}

// page with board and description
const Level = React.forwardRef<LevelRef, LevelProps>(({ level, setLevel }, ref) => {
  const [crossword] = useState<Crossword>(new Crossword(levels[level]));                                                                   // crossword instance matching current level
  const [board, setBoard] = useState<string[][]>(crossword.emptyBoard.map(row => [...row]));                                                    // actual board (after user inputs)
  const [mistakes, setMistakes] = useState<boolean[][]>(Array.from({ length: crossword.rows }, () => Array(crossword.cols).fill(false)));  // cells with wrong letters
  const [focusedWord, setFocusedWord] = useState<number[]>([0, 0]);                                                                        // number of the focused word (vertical and horizontal)
  const [focusedCell, setFocusedCell] = useState<number[]>([-1, -1]);                                                                      // row and column of the focused cell
  const [prevMoveVertical, setPrevMoveVertical] = useState<boolean>(true);                                                                 // true if the previous move by arrows was vertical
  const [solved, setSolved] = useState<boolean>(false);                                                                                    // true if the crossword was solved

  const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);                                                                             // refs for moving focus
  inputRefs.current = Array.from({ length: crossword.rows }, () => Array(crossword.cols).fill(null));

  const navigate = useNavigate();

  useEffect(() => {
    // callback for hotkeys
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        // looking for mistakes or solve
        (document.activeElement as HTMLElement)?.blur();
        const newMistakes = crossword.getMistakes(board);
        setMistakes(newMistakes);
        setSolved(!newMistakes.some(row => row.some(val => val)));

      } else if (e.key === 'Escape') {
        // back to levels menu
        setLevel(0);
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [board]);

  useImperativeHandle(ref, () => ({
    setWord: (text: string, n: number, isDown: boolean) => {
      let word = crossword.getWord(n, isDown);
      // @ts-ignore
      if (word === null || word.text.length !== text.length || text.split('').some((chr, i) => chr !== board[word.row + (word.isDown ? i : 0)][word.col + (!word.isDown ? i : 0)] && board[word.row + (word.isDown ? i : 0)][word.col + (!word.isDown ? i : 0)] !== '')) {
        return false;
      }
      setBoard(crossword.setWord(board, word, text));
      const newMistakes = mistakes.map(row => [...row]);
      for (let i = 0; i < text.length; i++) {
        newMistakes[word.row + (word.isDown ? i : 0)][word.col + (!word.isDown ? i : 0)] = false;
      }
      setMistakes(newMistakes);
      return true;
    },
    deleteWord: (n: number, isDown: boolean) => {
      let word = crossword.getWord(n, isDown);
      if (word === null) {
        return false;
      }
      setBoard(crossword.deleteWord(board, word));
      const newMistakes = mistakes.map(row => [...row]);
      for (let i = 0; i < word.text.length; i++) {
        if (board[word.row + (word.isDown ? i : 0)][word.col + (!word.isDown ? i : 0)] === '') {
          newMistakes[word.row + (word.isDown ? i : 0)][word.col + (!word.isDown ? i : 0)] = false;
        }
      }
      setMistakes(newMistakes);
      return true;
    },
    checkSolve: () => {
      const newMistakes = crossword.getMistakes(board);
      setMistakes(newMistakes);
      setSolved(!newMistakes.some(row => row.some(val => val)));
      return !newMistakes.some(row => row.some(val => val));
    }
  }));

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
    <>
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
    </>
  );
});

// page with levels menu
const Menu: React.FC<MenuProps> = ({ level, setLevel, levelRef }) => {
  const [focusedButton, setFocusedButton] = useState<number>(1);

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>(Array.from({ length: levels.length }, () => null));

  const navigate = useNavigate();

  const assistantRef = useRef<ReturnType<typeof createAssistant>>();
  const assistantStateRef = useRef<AssistantAppState>();

  type Action =
    | {
        type: 'select_level';
        level: number;
      }
    | {
        type: 'enter_word';
        n: number;
        isDown: number;
        answer: string
      }
    | {
        type: 'delete_word';
        n: number;
        isDown: number;
      }
    | {
        type: 'check';
      };

  type Event = {
    type: 'smart_app_data';
    action: Action;
    sdk_meta: any;
  }

  let firstTimeInMenu = true;

  useEffect(() => {
    console.log(level);
    assistantStateRef.current = { level: level };
    if (level === 0 && firstTimeInMenu) {
      playBackToMenu();
    }
    firstTimeInMenu = false;
  }, [level]);

  useEffect(() => {
    assistantRef.current = initializeAssistant(() => assistantStateRef.current);

    assistantRef.current.on('data', (event: any) => {
      console.log(`assistant.on(data)`, event);
      if (event.type === 'character') {
        console.log(`assistant.on(data): character: '${event?.character?.id}'`);
      } else if (event.type === 'insets') {
        console.log(`assistant.on(data): insets`);
      } else if (event.type === 'feature_launcher') {
        console.log(`assistant.on(data): feature_launcher`);
      } else {
        const event_nsd: Event = event;
        if (event_nsd.action) {
          dispatchAssistantAction(event_nsd.action);
        }
      }
    });

    const dispatchAssistantAction = (action: Action) => {
      console.log('dispatchAssistantAction', action);
      if (action) {
        switch (action.type) {
          case 'select_level':
            console.log('выбран уровень', action.level);
            if (action.level <= levels.length) {
              setLevel(action.level);
              if (action.level > 0) {
                navigate('/' + String(action.level));
                playLevelSelect(action.level);
              } else {
                navigate('/');
              }
            } else {
              playNoSuchLevel();
            }
            break;
          case 'enter_word':
            if (levelRef.current?.setWord(action.answer, action.n, action.isDown == 1)) {
              console.log('Слово ввелось');
            } else {
              console.log('Слово НЕ ввелось');
              playFailedToEnterWord(action.answer);
            }
            break;
          case 'delete_word':
            if (levelRef.current?.deleteWord(action.n, action.isDown == 1)) {
              console.log('Слово удалилось');
            } else {
              console.log('Слово НЕ удалилось');
              playFailedToDelete();
            }
            break;
          case 'check':
            if (levelRef.current?.checkSolve()) {
              console.log('Ошибок НЕТ');
              playAllCorrectFinish();
            } else {
              console.log('Ошибки есть');
              playMistakes();
            }
            break;
          default:
            throw new Error;
        }
      }
    }
  }, [])

  const playMistakes = () => {
    _send_action_value('mistakes');
  }

  const playAllCorrectFinish = () => {
    _send_action_value('all_correct_finish');
  }

  const playFailedToDelete = () => {
    _send_action_value('failed_to_delete');
  }

  const playBackToMenu = () => {
    _send_action_value('back_to_menu');
  }

  const playLevelSelect = (lvl: number) => {
    _send_action_value('level_select_success', lvl);
  }

  const playNoSuchLevel = () => {
    _send_action_value('no_such_level');
  }

  const playFailedToEnterWord = (word: string) => {
    _send_action_value('failed_to_enter_word', word);
  }

  const _send_action_value = (action_id: string, value: any = 0) => {
    const data = {
      action: {
        action_id: action_id,
        parameters: {
          value: value,
        },
      },
    };
    if (!assistantRef.current) {
      return;
    }
    const unsubscribe = assistantRef.current.sendData(data, (data) => {
      console.log('sendData onData:', data);
      unsubscribe();
    });
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && level === 0) {
        setFocusedButton(Math.max(focusedButton - 1, 1));
      } else if (e.key === 'ArrowRight' && level === 0) {
        setFocusedButton(Math.min(focusedButton + 1, levels.length));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    if (level === 0) {
      buttonRefs.current[focusedButton - 1]?.focus();
    } else {
      buttonRefs.current[focusedButton - 1]?.blur();
    }
  });

  return (
    <>
      <Title>Кроссворды</Title>
      <Subtitle>Выберите уровень:</Subtitle>
      <LvlButtonContainer>
        {levels.map((lvl, lvlIdx) => (
          <LvlButton onClick={() => { setLevel(lvlIdx + 1); navigate('/' + String(lvlIdx + 1)); playLevelSelect(lvlIdx + 1); }} ref={el => buttonRefs.current[lvlIdx] = el}>
            <LvlButtonIndex>{lvlIdx + 1}</LvlButtonIndex>
            <LvlButtonDesc>«{new Crossword(lvl).words[0].desc}»</LvlButtonDesc>
          </LvlButton>
        ))}
      </LvlButtonContainer>
    </>
  );
};

const App: React.FC = () => {
  const [level, setLevel] = useState<number>(0);

  const levelRef = useRef<LevelRef>(null);

  useEffect(() => {
    const handlePopState = () => {
      setLevel(0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Menu level={level} setLevel={setLevel} levelRef={levelRef} />} />
      {levels.map((_, lvlIdx) => (
        <Route path={'/' + String(lvlIdx + 1)} element={<Level level={lvlIdx} setLevel={setLevel} ref={levelRef} />} />
      ))}
    </Routes>
  );
};

export default App;
